import type { Range, Ranges, Signal1D } from '@zakodium/nmr-types';
import type { NmriumData } from '@zakodium/nmrium-core';
import type { Source } from 'file-collection';
import type { GetInfoOptions, MFInfo } from 'mf-parser';
import { MF } from 'mf-parser';
import { Molecule } from 'openchemlib';
import type {
  SampleEntryContent,
  SampleEntryId,
  SampleEntrySpectraNmr,
} from 'react-iframe-bridge';
import type { RocDocument } from 'rest-on-couch-client';

export function scipeaksToNMRium(
  sample: RocDocument<SampleEntryContent, SampleEntryId>,
): NmriumData {
  const sampleValue = sample.getValue();
  const content = sampleValue.$content;

  const dataSource: Source = { entries: [] };
  const data: NmriumData = {
    source: dataSource,
    spectra: [],
    molecules: [],
  };

  if (!content.spectra?.nmr || content.spectra.nmr.length === 0) {
    return data;
  }

  const nmrSpectra = content.spectra.nmr.filter((value) =>
    Boolean(value.jcamp?.filename),
  );

  if (nmrSpectra.length === 0) {
    return data;
  }

  const { molecule, mfInfo } = getMoleculeAndMFInfo(content);
  if (molecule) {
    data.molecules.push(molecule);
  }

  for (const nmr of nmrSpectra) {
    const spectrumUrl = sample.getAttachment(nmr.jcamp.filename).url;
    const urlObj = new URL(spectrumUrl);
    const baseURL = urlObj.origin;
    const relativePath = urlObj.href.replace(urlObj.origin, '');

    dataSource.entries.push({
      baseURL,
      relativePath,
    });

    data.spectra.push({
      id: nmr.jcamp.filename,
      sourceSelector: { files: [relativePath] },
      ...(nmr.nmrium ?? { ranges: migrateScipeaksRanges(nmr, mfInfo) }),
    });
  }

  return data;
}

function getMoleculeAndMFInfo(content: SampleEntryContent) {
  const general = content.general;
  const moleculeName = general.title || general.name?.[0]?.value;

  let molecule: { molfile: string; label: string | undefined } | undefined;
  let oclMolecule;

  if (general.molfile) {
    oclMolecule = Molecule.fromMolfile(general.molfile);
    molecule = {
      molfile: general.molfile,
      label: moleculeName,
    };
  } else if (general.ocl) {
    oclMolecule = Molecule.fromIDCode(
      content.general.ocl.value,
      content.general.ocl.coordinates,
    );
    molecule = {
      molfile: oclMolecule.toMolfileV3(),
      label: moleculeName,
    };
  }
  if (!molecule || !oclMolecule) {
    const mf = general?.mf;
    return { molecule: null, mfInfo: mf ? new MF(mf).getInfo() : null };
  }

  const mf = oclMolecule.getMolecularFormula().formula;
  return {
    molecule,
    mfInfo: new MF(mf).getInfo() as MFInfo<GetInfoOptions>,
  };
}

function migrateScipeaksRanges(
  nmr: SampleEntrySpectraNmr,
  mfInfo: MFInfo<GetInfoOptions> | null,
): Ranges {
  const newRanges: Ranges = {
    values: [],
    options: {
      sum: mfInfo?.atoms?.H || 100,
      isSumConstant: true,
      sumAuto: true,
      mf: mfInfo?.mf,
    },
  };
  if (nmr.dimension !== 1 || nmr.nucleus[0] !== '1H') return newRanges;
  for (const range of (nmr.range || []) as any) {
    const nmriumRange: Range = {
      id: crypto.randomUUID(),
      from: range.from,
      originalFrom: range.from,
      to: range.to,
      originalTo: range.to,
      diaIDs: range._highlight || [],
      // We skip integration, it should be recalculated.
      signals: [],
      // TODO: Will be recomputed on load?.
      absolute: 0,
      integration: 0,
    };
    newRanges.values.push(nmriumRange);
    for (const signal of range.signal) {
      const nmriumSignal: Signal1D = {
        id: crypto.randomUUID(),
        kind: 'signal',
        multiplicity: signal.multiplicity,
        js: [],
        delta: signal.delta,
        originalDelta: signal.delta,
      };
      nmriumRange.signals.push(nmriumSignal);
      for (const j of signal.j || []) {
        nmriumSignal.js.push({
          coupling: j.coupling,
          multiplicity: j.multiplicity,
        });
      }
    }
  }
  return newRanges;
}

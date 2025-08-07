import type {
  NmriumState,
  Spectrum1D,
  Spectrum2D,
  StateMolecule,
} from '@zakodium/nmrium-core';
import type { WritableDraft } from 'immer';
import { produce } from 'immer';
import { MF } from 'mf-parser';
import { Molecule } from 'openchemlib';
import * as OCLUtils from 'openchemlib-utils';
import type { SampleEntryContent } from 'react-iframe-bridge';

export function nmriumToScipeaks(
  content: SampleEntryContent,
  state: NmriumState,
) {
  return produce(content, (draft) => {
    const [firstMolecule] = state.data.molecules;
    if (firstMolecule) {
      updateMolecule(draft, firstMolecule);
    }

    for (const nmr of draft.spectra.nmr) {
      const spectrum = state.data.spectra.find(
        (spectrum) => spectrum.id === nmr.jcamp.filename,
      );
      if (spectrum) {
        nmr.nmrium =
          'ranges' in spectrum
            ? serialize1DSpectrum(spectrum)
            : serialize2DSpectrum(spectrum);
      }
      if (nmr.range && nmr.range.length > 0) {
        // Clean-up: remove old range format.
        nmr.range = [];
      }
    }
  });
}

function updateMolecule(
  draft: WritableDraft<SampleEntryContent>,
  molecule: StateMolecule,
) {
  draft.general = draft.general || {};
  draft.general.molfile = molecule.molfile;
  const oclMolecule = Molecule.fromMolfile(molecule.molfile);
  const idCode = oclMolecule.getIDCodeAndCoordinates();
  draft.general.ocl = {
    value: idCode.idCode,
    coordinates: idCode.coordinates,
    index: Array.from(oclMolecule.getIndex()),
  };
  // @ts-expect-error OCL utils is not in TS
  const mf = OCLUtils.getMF(oclMolecule).parts.join(' . ');
  const mfInfo = new MF(mf).getInfo();
  draft.general.mf = mf;
  draft.general.em = mfInfo.monoisotopicMass;
  draft.general.mw = mfInfo.mass;
}

function serialize1DSpectrum(spectrum: Spectrum1D) {
  const { customInfo, display, filters, integrals, peaks, ranges } = spectrum;
  return { customInfo, display, filters, integrals, peaks, ranges };
}

function serialize2DSpectrum(spectrum: Spectrum2D) {
  const { customInfo, display, filters, zones } = spectrum;
  return { customInfo, display, filters, zones };
}

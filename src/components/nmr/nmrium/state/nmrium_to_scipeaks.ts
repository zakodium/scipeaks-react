import type {
  NmriumState,
  Spectrum1D,
  Spectrum2D,
  StateMolecule,
} from '@zakodium/nmrium-core';
import { produce } from 'immer';
import type { WritableDraft } from 'immer';
import { Molecule } from 'openchemlib';
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
  draft.general.molfile = molecule.molfile;
  const oclMolecule = Molecule.fromMolfile(molecule.molfile);
  const idCode = oclMolecule.getIDCodeAndCoordinates();
  draft.general.ocl = {
    value: idCode.idCode,
    coordinates: idCode.coordinates,
    index: Array.from(oclMolecule.getIndex()),
  };
  const mf = oclMolecule.getMolecularFormula();
  draft.general.mf = mf.formula;
  draft.general.em = mf.absoluteWeight;
  draft.general.mw = mf.relativeWeight;
}

function serialize1DSpectrum(spectrum: Spectrum1D) {
  const { id, customInfo, display, filters, integrals, peaks, ranges } =
    spectrum;
  return { id, customInfo, display, filters, integrals, peaks, ranges };
}

function serialize2DSpectrum(spectrum: Spectrum2D) {
  const { id, customInfo, display, filters, zones } = spectrum;
  return { id, customInfo, display, filters, zones };
}

import { MF } from 'mf-parser';
import { Molecule } from 'openchemlib';
import { useIframeBridgeSample } from 'react-iframe-bridge';

import ErrorPage from '@/components/error_page.js';

import EnhancedNMRium from './enhanced_nmrium.js';

function NoNmr() {
  return (
    <ErrorPage
      title="Missing NMR data"
      subtitle="This sample has no NMR spectra."
    />
  );
}

export default function NMRium() {
  const sample = useIframeBridgeSample();
  const sampleValue = sample.getValue();
  const content = sampleValue.$content;

  if (!content.spectra?.nmr || content.spectra.nmr.length === 0) {
    return <NoNmr />;
  }

  const sourceEntries = [];
  const spectra = [];

  for (const nmr of content.spectra.nmr) {
    if (!nmr.jcamp?.filename) continue;
    const url = sample.getAttachment(nmr.jcamp.filename).url;

    const name = sampleValue.$id.join(' ');
    const urlObj = new URL(url);
    const baseURL = urlObj.origin;
    const relativePath = urlObj.href.replace(urlObj.origin, '');

    sourceEntries.push({
      baseURL,
      relativePath,
    });
    spectra.push({
      info: { name },
      sourceSelector: { files: [relativePath] },
    });
  }

  if (spectra.length === 0) {
    return <NoNmr />;
  }

  const molecules = [];
  const { molecule, mfInfo } = getMoleculeAndMFInfo(content);
  if (molecule) {
    molecules.push(molecule);
  }

  const state: any = {
    version: 9,
    data: {
      source: { entries: sourceEntries },
      spectra,
      molecules,
    },
  };

  console.log(mfInfo);

  return <EnhancedNMRium data={state} />;
}

function getMoleculeAndMFInfo(content) {
  const general = content.general || {};
  const moleculeName = general.title || general.name?.[0]?.value;
  let molecule;
  let oclMolecule;

  if (general.molfile) {
    molecule = {
      molfile: general.molfile,
      label: moleculeName,
    };
    oclMolecule = Molecule.fromMolfile(general.molfile);
  } else if (general.ocl) {
    oclMolecule = Molecule.fromIDCode(
      content.general.ocl.value,
      content.general.ocl.coordinates,
    );
    molecule = {
      molfile: molecule.toMolfileV3(),
      label: moleculeName,
    };
  }
  if (!molecule) {
    const mf = general.mf;
    return { molecule: null, mfInfo: mf ? new MF(mf).getInfo() : null };
  }

  const mf = oclMolecule.getMolecularFormula().formula;
  return {
    molecule,
    mfInfo: new MF(mf).getInfo(),
  };
}

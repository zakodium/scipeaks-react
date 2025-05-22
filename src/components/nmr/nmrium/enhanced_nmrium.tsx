import dynamic from 'next/dynamic';
import type { NMRiumProps } from 'nmrium';

import LoadingFull from '@/components/loading_full';

const NMRium = dynamic(() => import('nmrium').then((mod) => mod.NMRium), {
  ssr: false,
  loading: () => <LoadingFull />,
});

const customWorkspaces = {
  scipeaks: {
    display: {
      general: {
        hideGeneralSettings: true,
        experimentalFeatures: {
          display: false,
          visible: true,
        },
        hidePanelOnLoad: false,
        hideLogs: false,
        hideHelp: false,
        hideMaximize: false,
        hideWorkspaces: true,
        hidePanelsBar: false,
      },
      panels: {
        spectraPanel: {
          display: true,
          visible: true,
          open: true,
        },
        informationPanel: {
          display: true,
          visible: true,
          open: false,
        },
        integralsPanel: {
          display: false,
          visible: false,
          open: false,
        },
        rangesPanel: {
          display: true,
          visible: true,
          open: false,
        },
        structuresPanel: {
          display: true,
          visible: true,
          open: true,
        },
        processingsPanel: {
          display: true,
          visible: true,
          open: false,
        },
        zonesPanel: {
          display: true,
          visible: true,
          open: false,
        },
        automaticAssignmentPanel: {
          display: false,
          visible: false,
          open: false,
        },
        databasePanel: {
          display: false,
          visible: false,
          open: false,
        },
        multipleSpectraAnalysisPanel: {
          display: false,
          visible: false,
          open: false,
        },
        peaksPanel: {
          display: false,
          visible: false,
          open: false,
        },
        predictionPanel: {
          display: false,
          visible: false,
          open: false,
        },
        summaryPanel: {
          display: false,
          visible: false,
          open: false,
        },
        simulationPanel: {
          display: false,
          visible: false,
          open: false,
        },
      },
      toolBarButtons: {
        baselineCorrection: true,
        exclusionZones: false,
        exportAs: false,
        fft: true,
        import: false,
        integral: false,
        multipleSpectraAnalysis: false,
        phaseCorrection: true,
        rangePicking: true,
        realImaginary: true,
        slicing: true,
        spectraCenterAlignments: true,
        spectraStackAlignments: true,
        apodization: true,
        zeroFilling: true,
        zonePicking: true,
        zoomOut: true,
        zoom: true,
        peakPicking: false,
        autoRangeAndZonePicking: true,
        fftDimension1: true,
        fftDimension2: true,
        apodizationDimension1: false,
        apodizationDimension2: false,
        zeroFillingDimension1: false,
        zeroFillingDimension2: false,
      },
    },
    general: {
      dimmedSpectraOpacity: 0.4,
      verticalSplitterPosition: '560px',
      verticalSplitterCloseThreshold: 600,
      spectraRendering: 'auto',
      loggingLevel: 'info',
      popupLoggingLevel: 'error',
      invert: false,
      invertScroll: false,
    },
    nuclei: [
      {
        nucleus: '1H',
        ppmFormat: '0.00',
        hzFormat: '0.00',
      },
      {
        nucleus: '13C',
        ppmFormat: '0.00',
        hzFormat: '0.00',
      },
      {
        nucleus: '15N',
        ppmFormat: '0.00',
        hzFormat: '0.00',
      },
      {
        nucleus: '19F',
        ppmFormat: '0.00',
        hzFormat: '0.00',
      },
      {
        nucleus: '29Si',
        ppmFormat: '0.00',
        hzFormat: '0.00',
      },
      {
        nucleus: '31P',
        ppmFormat: '0.00',
        hzFormat: '0.00',
      },
    ],
    panels: {},
    databases: {
      defaultDatabase: '',
      data: [
        {
          key: 'toc',
          label: 'Toc',
          url: 'https://data.cheminfo.org/nmr/database/toc.json',
          enabled: true,
        },
      ],
    },
    nmrLoaders: {
      general: {
        keep1D: true,
        keep2D: true,
        onlyReal: false,
        dataSelection: 'preferFT',
      },
      bruker: {
        onlyFirstProcessedData: true,
      },
    },
    infoBlock: {
      visible: false,
      fields: [
        {
          label: 'Name',
          jpath: ['info', 'name'],
          visible: true,
          format: '',
        },
        {
          label: 'Number of scans',
          jpath: ['info', 'numberOfScans'],
          visible: true,
          format: '0',
        },
        {
          label: 'Pulse sequence',
          jpath: ['info', 'pulseSequence'],
          visible: true,
          format: '',
        },
        {
          label: 'Frequency',
          jpath: ['info', 'originFrequency'],
          visible: true,
          format: '0',
        },
      ],
      position: {
        x: 0,
        y: 0,
      },
    },
    onLoadProcessing: {
      autoProcessing: true,
      filters: {
        '1H': [
          {
            name: 'digitalFilter',
            enabled: true,
          },
          {
            name: 'apodization',
            enabled: false,
          },
          {
            name: 'zeroFilling',
            enabled: true,
          },
          {
            name: 'fft',
            enabled: true,
          },
          {
            name: 'phaseCorrection',
            enabled: true,
          },
        ],
        '13C': [
          {
            name: 'digitalFilter',
            enabled: true,
          },
          {
            name: 'apodization',
            enabled: true,
          },
          {
            name: 'zeroFilling',
            enabled: true,
          },
          {
            name: 'fft',
            enabled: true,
          },
          {
            name: 'phaseCorrection',
            enabled: true,
          },
        ],
      },
    },
    spectraColors: {
      highlightColor: '#ffd70080',
      indicatorLineColor: '#2FFF0085',
      oneDimension: [],
      twoDimensions: [
        {
          jpath: ['info', 'experiment'],
          value: 'cosy',
          positiveColor: 'darkblue',
          negativeColor: 'blue',
        },
        {
          jpath: ['info', 'experiment'],
          value: 'noesy',
          positiveColor: 'pink',
          negativeColor: 'yellow',
        },
        {
          jpath: ['info', 'experiment'],
          value: 'roesy',
          positiveColor: 'pink',
          negativeColor: 'yellow',
        },
        {
          jpath: ['info', 'experiment'],
          value: 'tocsy',
          positiveColor: 'green',
          negativeColor: 'yellow',
        },
        {
          jpath: ['info', 'experiment'],
          value: 'hsqc',
          positiveColor: 'black',
          negativeColor: 'yellow',
        },
        {
          jpath: ['info', 'experiment'],
          value: 'hmbc',
          positiveColor: 'darkviolet',
          negativeColor: 'yellow',
        },
      ],
    },
    printPageOptions: {},
    externalAPIs: [],
    export: {
      png: {
        mode: 'basic',
        dpi: 300,
        size: 'A5',
        layout: 'landscape',
        useDefaultSettings: false,
      },
      svg: {
        mode: 'basic',
        dpi: 300,
        size: 'A5',
        layout: 'landscape',
        useDefaultSettings: false,
      },
      clipboard: {
        mode: 'basic',
        dpi: 300,
        size: 'A5',
        layout: 'landscape',
        useDefaultSettings: false,
      },
    },
    peaksLabel: {
      marginTop: 0,
    },
    label: 'SciPeaks',
    visible: true,
  },
} satisfies NMRiumProps['customWorkspaces'];

export default function EnhancedNMRium(
  props: Omit<NMRiumProps, 'getSpinner' | 'customWorkspaces'>,
) {
  return (
    <NMRium
      getSpinner={() => <LoadingFull />}
      customWorkspaces={customWorkspaces}
      workspace="scipeaks"
      {...props}
    />
  );
}

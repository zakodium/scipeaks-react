import { Size, Color, Variant } from '../../types';

const sizes: Record<Size, string> = {
  [Size.xSmall]: 'px-2.5 py-1.5 text-xs leading-4',
  [Size.small]: 'px-3 py-2 text-sm leading-4',
  [Size.medium]: 'px-4 py-2 text-sm leading-5',
  [Size.large]: 'px-4 py-2 text-base leading-6',
  [Size.xLarge]: 'px-6 py-3 text-base leading-6',
};

const colorsPrimary: Record<Color, string> = {
  [Color.primary]:
    'bg-primary-600 hover:bg-primary-500 focus:border-primary-700 focus:shadow-outline-primary active:bg-primary-700',
  [Color.neutral]:
    'bg-neutral-600 hover:bg-neutral-500 focus:border-neutral-700 focus:shadow-outline-neutral active:bg-neutral-700',
  [Color.success]:
    'bg-success-600 hover:bg-success-500 focus:border-success-700 focus:shadow-outline-success active:bg-success-700',
  [Color.warning]:
    'bg-warning-600 hover:bg-warning-500 focus:border-warning-700 focus:shadow-outline-warning active:bg-warning-700',
  [Color.danger]:
    'bg-danger-600 hover:bg-danger-500 focus:border-danger-700 focus:shadow-outline-danger active:bg-danger-700',
  [Color.alternative]:
    'bg-alternative-600 hover:bg-alternative-500 focus:border-alternative-700 focus:shadow-outline-alternative active:bg-alternative-700',
};

const colorsSecondary: Record<Color, string> = {
  [Color.primary]:
    'text-primary-700 bg-primary-100 hover:bg-primary-50 focus:border-primary-300 focus:shadow-outline-primary active:bg-primary-200',
  [Color.neutral]:
    'text-neutral-700 bg-neutral-100 hover:bg-neutral-50 focus:border-neutral-300 focus:shadow-outline-neutral active:bg-neutral-200',
  [Color.success]:
    'text-success-700 bg-success-100 hover:bg-success-50 focus:border-success-300 focus:shadow-outline-success active:bg-success-200',
  [Color.warning]:
    'text-warning-700 bg-warning-100 hover:bg-warning-50 focus:border-warning-300 focus:shadow-outline-warning active:bg-warning-200',
  [Color.danger]:
    'text-danger-700 bg-danger-100 hover:bg-danger-50 focus:border-danger-300 focus:shadow-outline-danger active:bg-danger-200',
  [Color.alternative]:
    'text-alternative-700 bg-alternative-100 hover:bg-alternative-50 focus:border-alternative-300 focus:shadow-outline-alternative active:bg-alternative-200',
};

const colorsWhite: Record<Color, string> = {
  [Color.primary]:
    'text-gray-700 bg-white hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 border-gray-300',
  [Color.neutral]:
    'text-gray-700 bg-white hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 border-gray-300',
  [Color.success]:
    'text-gray-700 bg-white hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 border-gray-300',
  [Color.warning]:
    'text-gray-700 bg-white hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 border-gray-300',
  [Color.danger]:
    'text-gray-700 bg-white hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 border-gray-300',
  [Color.alternative]:
    'text-gray-700 bg-white hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 border-gray-300',
};

function getVariantColor(variant: Variant, color: Color): string {
  switch (variant) {
    case Variant.primary:
      return colorsPrimary[color];
    case Variant.secondary:
      return colorsSecondary[color];
    case Variant.white:
      return colorsWhite[color];
    default:
      throw new Error('Varriant cannot be null');
  }
}

export { sizes, getVariantColor, colorsPrimary, colorsSecondary, colorsWhite };

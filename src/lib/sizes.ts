
type Size = '9XS' | '8XS' | '7XS' | '6XS' | '5XS' | '4XS' | '3XS' | '2XS' | 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | '2XL' | '3XL' | '4XL' | '5XL' | '6XL' | '7XL'

export const CONTAINER_WIDTHS: Record<Size, number> = {
  '9XS': 64,
  '8XS': 96,
  '7XS': 128,
  '6XS': 160,
  '5XS': 192,
  '4XS': 224,
  '3XS': 256,
  '2XS': 288,
  'XS': 320,
  'SM': 384,
  'MD': 448,
  'LG': 512,
  'XL': 576,
  '2XL': 672,
  '3XL': 768,
  '4XL': 896,
  '5XL': 1024,
  '6XL': 1152,
  '7XL': 1280,
}

/**
 * Appropiate paddings to test each size
 */
export const SPACINGS: Record<Size, number> = {
  '9XS': 8,
  '8XS': 12,
  '7XS': 16,
  '6XS': 16,
  '5XS': 24,
  '4XS': 24,
  '3XS': 32,
  '2XS': 48,
  'XS': 56,
  'SM': 56,
  'MD': 80, // 72
  'LG': 88,
  'XL': 96,
  '2XL': 104,
  '3XL': 112,
  '4XL': 120,
  '5XL': 128,
  '6XL': 136,
  '7XL': 144,
}

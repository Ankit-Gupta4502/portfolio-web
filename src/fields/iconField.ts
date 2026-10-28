import type { Field } from 'payload'

export const ICON_OPTIONS = [
  { label: 'Megaphone', value: 'megaphone' },
  { label: 'Share', value: 'share-2' },
  { label: 'Search', value: 'search' },
  { label: 'Globe', value: 'globe' },
  { label: 'Map Pin', value: 'map-pin' },
  { label: 'Target', value: 'target' },
  { label: 'Trending Up', value: 'trending-up' },
  { label: 'Users', value: 'users' },
  { label: 'Lightbulb', value: 'lightbulb' },
  { label: 'Rocket', value: 'rocket' },
  { label: 'Bar Chart', value: 'bar-chart-3' },
  { label: 'Heart Pulse (Healthcare)', value: 'heart-pulse' },
  { label: 'Graduation Cap (Education)', value: 'graduation-cap' },
  { label: 'Building (Real Estate)', value: 'building-2' },
  { label: 'Shopping Cart (E-commerce)', value: 'shopping-cart' },
  { label: 'Briefcase (Professional Services)', value: 'briefcase' },
  { label: 'Store (Local Business)', value: 'store' },
  { label: 'Star', value: 'star' },
  { label: 'Award', value: 'award' },
  { label: 'Zap', value: 'zap' },
  { label: 'Palette', value: 'palette' },
  { label: 'Camera', value: 'camera' },
  { label: 'Pen Tool', value: 'pen-tool' },
  { label: 'Layout', value: 'layout-grid' },
  { label: 'Smartphone', value: 'smartphone' },
  { label: 'Monitor', value: 'monitor' },
  { label: 'Compass', value: 'compass' },
  { label: 'Line Chart', value: 'line-chart' },
  { label: 'Handshake', value: 'handshake' },
  { label: 'Shield Check', value: 'shield-check' },
  { label: 'Message Circle', value: 'message-circle' },
] as const

export function iconField(name = 'icon'): Field {
  return {
    name,
    type: 'select',
    options: ICON_OPTIONS as unknown as { label: string; value: string }[],
    defaultValue: 'star',
    required: true,
  }
}

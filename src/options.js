export const edit_mode = {
  order: 1,
  section: 'Options',
  type: 'boolean',
  default: true,
  display: 'radio',
  label: 'Edit Mode'
}

export const layout = {
  order: 2,
  section: "Items",
  type: "object_list",
  label: "Items",
  newItem: {
    x: 1,
    y: 1,
    width: 2,
    height: 2,
    id: '1234'
  },
  options: {
    x: {
      type: 'number',
      display: 'number',
      display_size: "half",
      label: "X",
      order: 1,
      default: 1
    },
    y: {
      type: 'number',
      display_size: "half",
      label: "Y",
      order: 2,
      default: 1,
    },
    w: {
      type: 'number',
      display_size: "half",
      label: "Width",
      order: 3,
      default: 2,
    },
    h: {
      type: 'number',
      display_size: "half",
      label: "Height",
      order: 4,
      default: 2,
    },
    i: {
      label: "ID",
      type: 'string',
      display: 'text',
      order: 5
    }
  }
}
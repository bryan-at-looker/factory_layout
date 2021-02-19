export const font_size = {
  type: 'number',
  display: 'number',
  display_size: "half",
  label: "Font Size",
  section: "Options",
  order: 12,
  default: 12,
  min: 4,
  step: 2
}

export const edit_mode = {
  order: 1,
  section: 'Options',
  display_size: "half",
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

export const show_column_names = {
  order: 2,
  section: 'Options',
  label: 'Show Column Names',
  display_size: "half",
  type: 'boolean',
  default: true,
  display: 'radio'
}
export const box_style = {
  order: 3,
  section: 'Options',
  label: "Item Style",
  type: 'string',
  display: 'select',
  values: [
    {"Drop Shadow": "cool"},
    {"Box": "box"},
    // {"Cube": "cube"}
  ],
  default: 'box'
}

// export const hidden_color_by_array = {
//   type: 'array'
// }

export const color_by_field = {
  order: 4,
  section: 'Options',
  type: 'string',
  display: 'select',
  label: "Color By Column",
  default: 'none'
}

export const hide_color_data = {
  order: 4,
  section: 'Options',
  type: 'boolean',
  display: 'radio',
  label: "Hide Colored Data",
  default: true
}

export const default_color = {
  type: 'string',
  display: 'color',
  section: "Colors",
  display_size: "third",
  label: "Default Color",
  order: 0,
  default: "#a6a6a6"
}

export const field_value_color = {
  order: 1,
  section: "Colors",
  type: "object_list",
  label: "Items",
  newItem: {
    color: "#a6a6a6",
    value: ""
  },
  options: {
    color: {
      type: 'string',
      display: 'color',
      label: "Color",
      order: 1,
      default: "#a6a6a6"
    },
    value: {
      type: 'string',
      label: "Value",
      order: 2
    }
  }
}
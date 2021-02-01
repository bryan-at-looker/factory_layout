import Hello from './hello'
import React from 'react'
import ReactDOM from 'react-dom'
import { layout, edit_mode } from './options';
import { FirstGrid } from './FirstGrid';
import { ComponentsProvider } from '@looker/components';
import { NotFoundInLayout } from './NotFoundInLayout';
import VisContext from './VisContext'

looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  id: "react_test",
  label: "React Test",
  options: {
    layout,
    edit_mode
  },
  // Set up the initial state of the visualization
  create: function(element, config) {

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        .hello-world-vis {
          height: 100vh;
          width: 100vw;
        }
      </style>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/react-grid-layout/1.2.0/css/styles.min.css" />
    `;

    // Create a container element to let us center the text.
    let container = element.appendChild(document.createElement("div"));
    container.className = "hello-world-vis";

    // Create an element to contain the text.
    this._textElement = container.appendChild(document.createElement("div"));

    // Render to the target element
    this.chart = ReactDOM.render(
      <Hello data="loading..."/>,
      this._textElement
    );

  },
  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {
    const layout = config.layout || []
    const trigger = this.trigger
    // data = test_data;
    const all_fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const all_field_names = all_fields.map(f=>f.name)
    const view_port = {height: element.clientHeight, width: element.clientWidth }
    // Clear any errors from previous updates
    this.clearErrors();


    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }

    // Grab the first cell of the data
    let firstRow = data[0];
    // const firstCell = firstRow[queryResponse.fields.dimensions[0].name].value;

    // Finally update the state with our new data

    const context = {
      trigger,
      data,
      all_fields, all_field_names,
      layout,
      config,
      first_column_name: all_field_names[0],
      edit_mode: config.edit_mode || false
    }
    
    this.chart = ReactDOM.render(
      <VisContext.Provider value={context}>
        <ComponentsProvider>
          <NotFoundInLayout />
          <FirstGrid  
            {...{view_port}}
            
          />
        </ComponentsProvider>
      </VisContext.Provider>
      ,
      this._textElement
    );

    // We are done rendering! Let Looker know.
    done();
  }
});

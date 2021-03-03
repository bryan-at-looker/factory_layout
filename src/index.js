import Hello from './hello'
import React from 'react'
import ReactDOM from 'react-dom'
import * as options from './options';
import { FirstGrid } from './FirstGrid';
import { ComponentsProvider } from '@looker/components';
import { NotFoundInLayout } from './NotFoundInLayout';
import VisContext from './VisContext'
import { isEqual } from 'lodash';

looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  id: "react_test",
  label: "React Test",
  options,
  // Set up the initial state of the visualization
  create: function(element, config) {

    // Insert a <style> tag with some styles we'll use later.

    const style = document.createElement('style')
    style.innerHTML = `
        body {
          background-color: transparent !important;
        }
        .hello-world-vis {
          height: 100vh;
          width: 100vw;
        }
        #vis {
          margin: 0px !important;
        }
        .drillable-item-content > a {
          text-decoration: none;
          color: black;
        }
    `;
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/react-grid-layout/1.2.0/css/styles.min.css'
    
    document.getElementsByTagName('head')[0].appendChild(style);
    document.getElementsByTagName('head')[0].appendChild(link);

    
    let container = element.appendChild(document.createElement("div"));
    container.className = "hello-world-vis";

    
    this._textElement = container.appendChild(document.createElement("div"));

    
    this.chart = ReactDOM.render(
      <Hello data=""/>,
      this._textElement
    );
    this.color_by_field_values = [];
    this.store_color_by_field = '';
  },
  
  updateAsync: function(data, element, config, queryResponse, details, done) {
    // console.log({data, element, config, queryResponse, details, done})
    // console.log({t: this.store_color_by_field, c: config.color_by_field })
    const layout = config.layout || []
    const trigger = this.trigger
    
    const all_fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const all_field_names = all_fields.map(f=>f.name)
    const mapped_fields = all_fields.map(f=>{ return {[f.label]: f.name} });
    const view_port = {height: element.clientHeight, width: element.clientWidth }
    
    this.clearErrors();

    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }

    if (this.store_color_by_field && this.store_color_by_field.length){
      // console.log('restore color!')
      config['color_by_field'] = this.store_color_by_field;
      this.store_color_by_field = undefined;
    }
    
    if (all_fields.length) {
      if (!this.color_by_field_values.length) {
        let new_options = {
          color_by_field: {
            ...options.color_by_field,
            values: mapped_fields,
          }
        } 
        this.color_by_field_values = mapped_fields;
        // console.log("trigger length")
        // console.log({t: this.store_color_by_field, c: config.color_by_field })
        this.store_color_by_field = config.color_by_field || '';
        trigger('registerOptions', {...options, ...new_options});
      } else if (!isEqual(mapped_fields, this.color_by_field_values)) {
        let new_options = {
          color_by_field: {
            ...options.color_by_field,
            values: mapped_fields
          }
        }
        this.color_by_field_values = mapped_fields;
        // console.log("trigger mapped fields")
        trigger('registerOptions', {...options, ...new_options});
      } else {
        if (!config.color_by_field) {
          // console.log({t: this.store_color_by_field, c: config.color_by_field })
          // console.log("trigger set field undefined")
          // trigger('updateConfig', [{color_by_field: all_field_names[0]}])
        } else if (all_field_names.indexOf(config.color_by_field) === -1) {
          // console.log("trigger set field not found")
          trigger('updateConfig', [{color_by_field: all_field_names[0]}])
        }
      }
    }


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

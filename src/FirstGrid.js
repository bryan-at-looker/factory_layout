import { Icon } from '@looker/components';
import React, { useContext } from 'react';
import GridLayout from 'react-grid-layout';
import styled from 'styled-components';
import { FloorItem } from './FloorItem';
import VisContext from './VisContext';
 
export const FirstGrid = ({view_port}) => {
  const handleUpdate = (layout) => {
    trigger('updateConfig', [{layout}])
  }

  const { layout, trigger, edit_mode } = useContext(VisContext);

  return (
    <GridLayout 
      className="layout" 
      layout={layout} 
      cols={12} 
      rowHeight={30} 
      width={view_port.width}
      onLayoutChange={handleUpdate}
      verticalCompact={false}
      resizeHandles={(edit_mode)?['se', 'sw']:[]}
      isDraggable={(edit_mode)}
    >
      {(layout.map(l=>{
        // return <FloorItem key={`item::${l.i}`} i={l.i} value={l.i} />
        return <div key={l.i}><FloorItem i={l.i} value={l.i} /></div>
      }))}
    </GridLayout>
  )
}
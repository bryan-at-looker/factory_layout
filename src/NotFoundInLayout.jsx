import { ButtonTransparent, Paragraph, Text, Tooltip } from '@looker/components';
import React, { useContext } from 'react';
import styled from 'styled-components';
import VisContext from './VisContext';

export const NotFoundInLayout = () => {
  
  const { layout, trigger, data, first_column_name, edit_mode } = useContext(VisContext);

  const keys = layout.map(l=>l.i);
  let no_layout = [];
  data.forEach(row=>{
    if (row[first_column_name]) {
      const val = row[first_column_name].value
      if (keys.indexOf(val) === -1 ) {
        no_layout.push(val)
      }
    }
  })
  

  const addItem = (key) => {
    let new_layout = [...layout, {
      i: key,
      x: 0,
      y: Infinity, // puts it at the bottom
      w: 2,
      h: 2
    }];
    trigger('updateConfig', [{layout: new_layout}])
  }
  if (no_layout.length ) {
    if (edit_mode) {
    return <div>
        {(no_layout.map(l=>{
          return <ButtonTransparent 
            onClick={()=>addItem(l)} 
            iconBefore="CircleAdd"
            size="small"
          >
            {l}
          </ButtonTransparent>
        }))}
      </div>
    } else {
      return <div>
        <Tooltip placement="bottom" content={<StyledParagraph>{no_layout.join('\n')}</StyledParagraph>}><Text>There are {no_layout.length} item{(no_layout.length>1)?'s':''} not on the layout</Text></Tooltip>
      </div>
    }
  } else {
    return <></>
  }
}

const StyledParagraph = styled(Paragraph)`
  white-space: pre;
  text-align: left;
  color: white;
`
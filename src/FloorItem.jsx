import { Box, IconButton, Text } from '@looker/components';
import React, { useContext } from 'react';
import styled from 'styled-components'
import reject from 'lodash/reject'
import find from 'lodash/find'
import VisContext from './VisContext';

export const FloorItem = ({i, value}) => {
  const { layout, trigger, data, first_column_name, edit_mode, all_field_names, all_fields } = useContext(VisContext)
  const handleClose = () => {
    const new_layout = reject(layout, {i})
    trigger('updateConfig', [{layout: new_layout}])
  }
  let row = {}
  const found = find(data, o=>{return o[first_column_name].value===i})
  if (found) {
    row = found
  }

  let rendered = []
  all_field_names.forEach((f,i)=>{
    const field = find(all_fields, {name: f}) || '';
    if (row[f] && field) {
      const label = field.label_short || field.label
      rendered.push({
        label,
        __html: LookerCharts.Utils.htmlForCell(row[f]) 
      } )
    }
  })

  if (!rendered.length) {
    rendered = [{__html: value}]
  }
  
  return (
    <StyledDiv 
      key={i}
      p="xxsmall"
    >
      <StyledParagraph>
        {rendered.map((r,i)=>{
          return <Text as="div" fontSize={(i===0)?"medium":"xsmall"} >
            {(i===0) ? '': `${r.label}: `}
            <span 
              dangerouslySetInnerHTML={{__html: r.__html}} 
            />
          </Text>
        })}
      </StyledParagraph>    
        {(edit_mode)?<StyledIcon 
            icon="Close" 
            size="xxsmall"
            onClick={handleClose}
          />
          :<></>
        }
    </StyledDiv>
  )
}


const StyledDiv = styled(Box)`
  border: black 1px solid;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
`

const StyledIcon = styled(IconButton)`
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
`

const StyledParagraph = styled.div`
  white-space: pre;
  text-align: left;
  text-overflow: ellipsis;
  & > span {
    text-overflow: ellipsis;
  }
`
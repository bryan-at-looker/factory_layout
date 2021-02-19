import { Box, IconButton, Text } from '@looker/components';
import React, { useContext } from 'react';
import styled from 'styled-components'
import reject from 'lodash/reject'
import find from 'lodash/find'
import VisContext from './VisContext';
import { CubeIcon } from './CubeIcon';

export const FloorItem = ({i, value}) => {
  const { layout, trigger, data, first_column_name, edit_mode, all_field_names, all_fields, config } = useContext(VisContext)
  const { show_column_names, box_style, color_by_field, field_value_color, default_color, hide_color_data, font_size } = config
  let color = default_color;
  const handleClose = () => {
    const new_layout = reject(layout, {i})
    trigger('updateConfig', [{layout: new_layout}])
  }
  let row = {}
  const found = find(data, o=>{return o[first_column_name].value===i})
  if (found) {
    row = found;
    const find_color = find(field_value_color, o=>{return o.value === row[color_by_field].value});
    if (find_color) color = find_color.color
  }

  let rendered = []
  all_field_names.forEach((f,i)=>{
    if (!(hide_color_data && f === color_by_field)) {
      const field = find(all_fields, {name: f}) || '';
      if (row[f] && field) {
        const label = field.label_short || field.label;
        if (!(row[f].html && row[f].html === " ")) {
          rendered.push({
            label,
            __html: LookerCharts.Utils.htmlForCell(row[f]) 
          } )
        }
      }
    }
  })

  if (!rendered.length) {
    rendered = [{__html: value}]
  }
  
  return (
    <BoxStyle 
      key={i}
      style={box_style}
      color={color}
    >
      <StyledParagraph>
        {rendered.map((r,i)=>{
          return <Text 
            as="div" 
            fontSize={(i===0)? `${font_size+4}px`:`${font_size}px`} 
            lineHeight="normal"
          >
            {(show_column_names && i !== 0) ? `${r.label}: ` : ''}
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
    </BoxStyle>
  )
}


const StyledDiv = styled(Box)`
  border: ${props=>props.item_color||''} 2px solid;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
`

const CoolDiv = styled(Box)`
  background: ${props=>props.item_color||'#ccc'};
  box-shadow: 0 8px 6px -6px black;
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

const BoxStyle = ({style, children, color, ...props}) => {
  switch (style) {
    case 'cool':
      return <CoolDiv 
        p="xsmall"
        item_color={color}
        {...props}
      >{children}</CoolDiv>
    case 'cube':
      return <Box height="100%" width="100%" position="relative">
        <Box position="absolute" top="50px" left="10px">
          {children}
        </Box>
        <CubeIcon item_color={color} />
      </Box>
    default:
      return <StyledDiv 
        p="xxsmall"
        item_color={color}
        {...props}
      >{children}</StyledDiv>
  }
}
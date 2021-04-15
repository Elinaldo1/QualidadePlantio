import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { ListBox } from './styles';

export default function Combobox(props){

  return(
    <RNPickerSelect
      useNativeAndroidPickerStyle={false}
      style={ListBox}
      placeholder={props.placeholder}
      onValueChange = {props.onValueChange}
      value={props.value}
      items={props.items}
   />
  )
}
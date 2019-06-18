import React, { useState, useEffect, useRef } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const OutlinedSelectInput = ({
  label,
  value,
  onChange,
  data,
  className = ''
}) => {
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => setLabelWidth(inputLabel.current.offsetWidth), []);

  const menuItems = data
    ? data.map((item, index) => (
        <MenuItem key={`${index}-${item}`} value={item}>
          {item}
        </MenuItem>
      ))
    : null;

  return (
    <FormControl variant="outlined" className={className}>
      <InputLabel ref={inputLabel} htmlFor={`select-${label}`}>
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={onChange}
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            name={label}
            id={`select-${label}`}
          />
        }
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default OutlinedSelectInput;

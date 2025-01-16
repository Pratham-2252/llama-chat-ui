// RadioButtonField.js
import React from "react";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  FormHelperText,
  Box,
} from "@mui/material";

const RadioButtonField = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  helperText,
}) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <FormControl component="fieldset" error={error}>
        <RadioGroup name={name} value={value} onChange={onChange}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default RadioButtonField;

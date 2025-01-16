// SelectField.js
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from "@mui/material";

const SelectField = ({
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
      <FormControl fullWidth error={error}>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          variant="outlined"
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default SelectField;

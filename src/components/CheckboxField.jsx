// CheckboxField.js
import React from "react";
import { Checkbox, FormControlLabel, FormHelperText, Box } from "@mui/material";

const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
  error,
  helperText,
}) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            name={name}
            color="primary"
          />
        }
        label={label}
      />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </Box>
  );
};

export default CheckboxField;

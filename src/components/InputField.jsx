// InputField.js
import React from "react";
import { TextField, Box } from "@mui/material";

const InputField = ({ label, name, value, onChange, error, helperText }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        variant="outlined"
        fullWidth
        size="medium"
      />
    </Box>
  );
};

export default InputField;

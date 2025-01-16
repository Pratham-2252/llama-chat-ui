// PasswordField.js
import React from "react";
import { TextField, Box } from "@mui/material";

const PasswordField = ({ label, name, value, onChange, error, helperText }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        label={label}
        type="password"
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

export default PasswordField;

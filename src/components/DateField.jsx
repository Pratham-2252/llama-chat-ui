// DateField.js
import React from "react";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Importing DatePicker from MUI
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Date adapter
import { TextField } from "@mui/material";

const DateField = ({ label, name, value, onChange, error, helperText }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          name={name}
          value={value}
          onChange={(newValue) =>
            onChange({ target: { name, value: newValue } })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              error={error}
              helperText={helperText}
              InputProps={{
                style: { padding: "10px" },
              }}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateField;

import { Box, Button, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import styled from "styled-components";
import CheckboxField from "./CheckboxField";
import DateField from "./DateField";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import RadioButtonField from "./RadioButtonField";
import SelectField from "./SelectField";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

// Styled components for custom design
const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 500px;
`;

const RegistrationContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #ece9e6, #ffffff);
`;

const RegistrationTitle = styled(Typography)`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-family: "Roboto", sans-serif;
`;

const StyledButton = styled(Button)`
  text-transform: none;
  font-size: 0.9rem;
  padding: 10px 0;
`;

const RegistrationForm = () => {
  const navigate = useNavigate();

  // Formik form handling and validation
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      country: "",
      gender: "",
      termsAccepted: false,
      dateOfBirth: null,
    },
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        firstName: values.fullName,
        lastName: values.fullName,
        userName: values.email,
        email: values.email,
        password: values.password,
        role: "Admin",
      };

      await axiosInstance
        .post("/auth/register", payload)
        .then((response) => {
          if (response.status === 201) {
            alert(`User Created, You can login now.`);
            resetForm();
            navigate("/login");
          }
        })
        .catch(() => {
          alert(`Something went wrong.`);
        });
    },
    validate: (values) => {
      const errors = {};
      if (!values.fullName) {
        errors.fullName = "Full Name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      if (!values.country) {
        errors.country = "Country is required";
      }
      if (!values.gender) {
        errors.gender = "Gender is required";
      }
      if (!values.termsAccepted) {
        errors.termsAccepted = "You must accept the terms and conditions";
      }
      if (!values.dateOfBirth) {
        errors.dateOfBirth = "Date of Birth is required";
      }
      return errors;
    },
  });

  // Options for SelectField and RadioButtonField
  const countries = [
    { label: "USA", value: "USA" },
    { label: "India", value: "IN" },
    { label: "UK", value: "UK" },
  ];

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <RegistrationContainer>
      <StyledPaper elevation={6}>
        <Box sx={{ width: "100%" }}>
          <RegistrationTitle variant="h5">Register</RegistrationTitle>
          <form onSubmit={formik.handleSubmit}>
            <InputField
              label="Full Name"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />

            <InputField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <PasswordField
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <DateField
              label="Date of Birth"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              error={
                formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              }
              helperText={
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
              }
            />

            <SelectField
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              options={countries}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />

            <RadioButtonField
              label="Gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              options={genders}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            />

            <CheckboxField
              label="I accept the terms and conditions"
              name="termsAccepted"
              checked={formik.values.termsAccepted}
              onChange={formik.handleChange}
              error={
                formik.touched.termsAccepted &&
                Boolean(formik.errors.termsAccepted)
              }
              helperText={
                formik.touched.termsAccepted && formik.errors.termsAccepted
              }
            />

            <StyledButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: "15px" }}
            >
              Register
            </StyledButton>

            <StyledButton
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ marginTop: "10px" }}
              onClick={() => navigate("/login")}
            >
              Login
            </StyledButton>
          </form>
        </Box>
      </StyledPaper>
    </RegistrationContainer>
  );
};

export default RegistrationForm;

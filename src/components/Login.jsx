import { Box, Button, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setAccessToken } from "../reduxstate/TokenSlice";
import axiosInstance from "../utils/axiosInstance";
import InputField from "./InputField";
import PasswordField from "./PasswordField";

const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 400px;
`;

const LoginContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #ece9e6, #ffffff);
`;

const LoginTitle = styled(Typography)`
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

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const payload = {
        userName: values.email,
        password: values.password,
      };

      await axiosInstance
        .post("/auth/authenticate", payload)
        .then((response) => {
          if (response.status === 200) {
            dispatch(setAccessToken(response.data.accessToken));
            navigate("/home");
          }
        })
        .catch((error) => {
          const response = error.response;

          alert(response.data.message);
        });
    },
    validate: (values) => {
      const errors = {};
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

      return errors;
    },
  });

  return (
    <LoginContainer>
      <StyledPaper elevation={6}>
        <Box sx={{ width: "100%" }}>
          <LoginTitle variant="h5">Login</LoginTitle>
          <form onSubmit={formik.handleSubmit}>
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

            <StyledButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: "15px" }}
            >
              Login
            </StyledButton>

            <StyledButton
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ marginTop: "10px" }}
              onClick={() => navigate("/register")}
            >
              Register
            </StyledButton>
          </form>
        </Box>
      </StyledPaper>
    </LoginContainer>
  );
};

export default Login;

import { Box, Button, Typography } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setAccessToken } from "../reduxstate/TokenSlice";
import axiosInstance from "../utils/axiosInstance";

const LoginContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 30px; /* Increased padding for more space */
  background: linear-gradient(135deg, #6a11cb, #2575fc);
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 80px 60px; /* Increased padding for more space */
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 550px; /* Increased max-width for wider content */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
`;

const LoginTitle = styled(Typography)`
  font-size: 2.2rem; /* Increased font size for title */
  font-weight: 600;
  margin-bottom: 25px; /* Increased margin for better spacing */
  color: #333;
  text-align: center;
  font-family: "Roboto", sans-serif;
`;

const LoginSubtitle = styled(Typography)`
  font-size: 1.3rem; /* Increased font size for subtitle */
  color: #555;
  margin-bottom: 40px; /* Increased margin for spacing */
  text-align: center;
  line-height: 1.5;
`;

const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4285f4;
  color: white;
  width: 100%;
  padding: 16px; /* Increased padding for button */
  font-size: 1.2rem; /* Increased font size for button text */
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-transform: none;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #357ae8;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #d8e4f1;
    cursor: not-allowed;
  }

  span {
    margin-right: 12px;
  }
`;

const StyledButton = styled(Button)`
  text-transform: none;
  font-size: 0.9rem;
  padding: 10px 0;
  flex: 1; /* Makes both buttons equal in width */
`;

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: space-between; /* Ensures spacing between buttons */
  gap: 15px; /* Adjust the gap between buttons */
  width: 100%;
  margin-top: 15px;
`;

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendCodeToBackend = async (credential) => {
    await axiosInstance
      .post("/auth/authenticate/oauth2", { credential })
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
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH2_SECRET_KEY}>
      <LoginContainer>
        <StyledBox>
          <LoginTitle>
            <h4>Welcome Back!</h4>
          </LoginTitle>
          <LoginSubtitle>
            <h5>Please sign in to your account</h5>
          </LoginSubtitle>
          <GoogleLogin
            onSuccess={(response) => {
              const { credential } = response;
              sendCodeToBackend(credential);
            }}
            onError={() => {
              alert("Login Failed. Please try again.");
            }}
            render={(renderProps) => (
              <GoogleButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                {renderProps.isGoogleLogin ? null : <span>Google Login</span>}
                Sign in with Google
              </GoogleButton>
            )}
          />

          <ButtonContainer>
            <StyledButton
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "15px" }}
              onClick={() => navigate("/login")}
            >
              Login
            </StyledButton>

            <StyledButton
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ marginTop: "10px" }}
              onClick={() => navigate("/register")}
            >
              Register
            </StyledButton>
          </ButtonContainer>
        </StyledBox>
      </LoginContainer>
    </GoogleOAuthProvider>
  );
};

export default Home;

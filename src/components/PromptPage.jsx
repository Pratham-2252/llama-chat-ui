import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setAccessToken } from "../reduxstate/TokenSlice";
import axiosInstance from "../utils/axiosInstance";
import { getUserId } from "../services";

// Styled components for custom design
const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 500px;
`;

const PromptContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #ece9e6, #ffffff);
  padding-top: 60px; /* Adjust to give space for the top bar */
`;

const PromptTitle = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-family: "Roboto", sans-serif;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
  .MuiOutlinedInput-root {
    border-radius: 12px;
    background-color: #fff;
  }
`;

const StyledButton = styled(Button)`
  text-transform: none;
  font-size: 1rem;
  padding: 12px 0;
  background-color: #4caf50;
  color: white;
  width: 100%;
  border-radius: 8px;
  &:hover {
    background-color: #45a049;
  }
`;

const ResponseText = styled(Box)`
  font-size: 1rem;
  color: black;
  font-family: "Roboto", sans-serif;
  white-space: pre-wrap; /* Preserves whitespace and formatting */
  word-break: break-word; /* Ensures long words don't break the layout */
`;

const ResponseContainer = styled(Box)`
  width: 100%;
  background-color: #e8f5e9;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  overflow-x: auto; /* Adds horizontal scrolling for long code blocks */
`;

const TopBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 8px 8px 0 0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* Ensure it stays on top of other elements */
`;

const TopBarTitle = styled(Typography)`
  font-size: 1.2rem;
  font-weight: bold;
`;

const ProfileIconWrapper = styled(Box)`
  position: relative;
`;

const ProfileMenu = styled(Menu)`
  & .MuiMenuItem-root {
    padding: 10px 20px;
  }
`;

const ProfileModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled(Box)`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
`;

const ProfileInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ProfileTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProfileDetail = styled(Typography)`
  font-size: 1.1rem;
  margin: 5px 0;
`;

const PromptPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    const userId = getUserId();

    await axiosInstance
      .get(`/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [prompt, setPrompt] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [response, setResponse] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSendPrompt = async () => {
    try {
      const { data } = await axiosInstance.post(
        `/chatbot/ask?prompt=${prompt}`
      );
      const formattedResponse = `Your Prompt:\n${prompt}\n\n${data}`;
      setResponse(formattedResponse);
    } catch (error) {
      setResponse("Something went wrong. Please try again.");
    }
  };

  const handleClickProfileIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = async () => {
    await axiosInstance
      .post("/auth/logout")
      .then((response) => {
        if (response.status === 200) {
          dispatch(setAccessToken(null));
          navigate("/", { replace: true });
        }
      })
      .catch(() => {});
  };

  return (
    <>
      {/* Top Bar */}
      <TopBar>
        <TopBarTitle>AI Chatbot</TopBarTitle>
        <ProfileIconWrapper>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleClickProfileIcon}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <ProfileMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </ProfileMenu>
        </ProfileIconWrapper>
      </TopBar>

      {/* Profile Modal */}
      <ProfileModal open={openModal} onClose={handleCloseModal}>
        <ModalContent>
          <Typography variant="h5" align="center">
            User Profile
          </Typography>
          <ProfileInfo>
            <ProfileTitle>{userData.firstName}</ProfileTitle>
            <ProfileDetail>Email : {userData.email}</ProfileDetail>
            <ProfileDetail>Role : {userData.role}</ProfileDetail>
            <ProfileDetail>Country: India</ProfileDetail>
          </ProfileInfo>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </ModalContent>
      </ProfileModal>

      {/* Main Content */}
      <PromptContainer>
        <StyledPaper elevation={6}>
          <PromptTitle variant="h5">Chat with AI</PromptTitle>
          <StyledTextField
            label="Enter your prompt"
            variant="outlined"
            multiline
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <StyledButton
            variant="contained"
            onClick={handleSendPrompt}
            sx={{ marginTop: "10px" }}
          >
            Send Prompt
          </StyledButton>
          {response && (
            <ResponseContainer>
              <ResponseText>
                {response.split("```").map((chunk, index) => {
                  // Alternate between text and code blocks
                  if (index % 2 === 0) {
                    return <span key={index}>{chunk}</span>;
                  } else {
                    return (
                      <pre key={index}>
                        <code>{chunk}</code>
                      </pre>
                    );
                  }
                })}
              </ResponseText>
            </ResponseContainer>
          )}
        </StyledPaper>
      </PromptContainer>
    </>
  );
};

export default PromptPage;

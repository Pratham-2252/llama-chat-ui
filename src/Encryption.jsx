import React, { useEffect } from "react";
import CryptoJS from "crypto-js";
import axiosInstance from "./utils/axiosInstance";

const SECRET_KEY = CryptoJS.enc.Utf8.parse("12345678901234567890123456789012");

function encryptData(data) {
  try {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  } catch (error) {
    console.error("Error encrypting data:", error);
    throw error;
  }
}

const Encryption = () => {
  useEffect(() => {
    sendEncryptedData();
  }, []);

  const sendEncryptedData = async () => {
    const apiData = { userName: "user", password: "pass123" };

    try {
      const encryptedData = encryptData(apiData);

      const response = await axiosInstance.post("/test", {
        payload: encryptedData,
      });

      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error sending encrypted data:", error);
    }
  };

  return (
    <div>
      <h1>Encryption Component</h1>
      <p>Sending encrypted data to the server...</p>
    </div>
  );
};

export default Encryption;

import { jwtDecode } from "jwt-decode";
import { Store } from "../reduxstate/Store";
import { getAccessToken } from "../reduxstate/TokenSlice";

export const getUserId = () => {
  const token = getAccessToken(Store.getState());

  if (token === null) {
    return;
  }

  try {
    const decodedToken = jwtDecode(token);

    const userId = decodedToken.userId;
    return userId;
  } catch (error) {
    return null;
  }
};

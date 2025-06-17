import axiosInstance from "./axiosInstance";

const API_URL = "/api/auth";

interface User {
  id: string;
  email: string;
  name?: string;
}

const TOKEN_KEY = 'token';

const setToken = async (token: string): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [TOKEN_KEY]: token }, resolve);
  });
};

const getUser = async (): Promise<User | null> => {
  try {
    // First check if token exists
    const token = await new Promise<string | null>((resolve) => {
      chrome.storage.local.get([TOKEN_KEY], (result) => {
        resolve(result[TOKEN_KEY] || null);
      });
    });

    if (!token) {
      return null;
    }

    const response = await axiosInstance.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    return null;
  }
};

const checkUpworkId = async (upworkId: string): Promise<{ value: boolean, message: string }> => {
  try {
    const response = await axiosInstance.post(`${API_URL}/check-upwork-id`, {
      upworkId: upworkId,
    });
    return response.data;
  } catch (error) {
    return {
      value: false,
      message: "Please upgrade your account to get access to all features",
    };
  }
};

const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.local.remove([TOKEN_KEY], resolve);
  });
};

// Listen for messages from the web app
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    if (request.type === 'SET_TOKEN' && request.token) {
      setToken(request.token)
        .then(() => sendResponse({ success: true }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Will respond asynchronously
    }
  }
);

const authService = {
  getUser,
  setToken,
  checkUpworkId,
  logout,
};

export default authService;
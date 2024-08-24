import { LoginRequestType } from "@/app/api/auth/_schemas/login-schema";
import { SignUpRequestType } from "@/app/api/auth/_schemas/sign-up-schema";

export const login = async (data: LoginRequestType) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.baseError
      ? errorData.message
      : "Login failed. Please try again later.";
    throw new Error(errorMessage);
  }

  return response.json();
};

export const signUp = async (data: SignUpRequestType) => {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.baseError
      ? errorData.message
      : "Sign Up failed. Please try again later.";
    throw new Error(errorMessage);
  }

  return response.json();
};

export const signUpModerator = async (data: SignUpRequestType) => {
  const response = await fetch("/api/auth/sign-up/moderator", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.baseError
      ? errorData.message
      : "Moderator Sign Up failed. Please try again later.";
    throw new Error(errorMessage);
  }

  return response.json();
};

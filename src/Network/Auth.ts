import APIClient from "./APIClient";

interface AuthFormValues {
  username: string;
  password: string;
}

async function userRegister(values: AuthFormValues) {
  try {
    await APIClient.post("/register", values);
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || "Registration failed",
    };
  }
}

async function userLogin(values: AuthFormValues) {
  try {
    const res = await APIClient.post("/", values);
    const { token } = res.data;
    if (token) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("authToken", token);
      return { success: true, token };
    }
    return { success: false, message: "Login failed: No token returned" };
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || "Login failed",
    };
  }
}

export { userRegister as UserRegister, userLogin as UserLogin, AuthFormValues };

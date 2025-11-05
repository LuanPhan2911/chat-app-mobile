import api from "@/constants/axios";

export const login = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });
    const token = res.data.token as string;
    return { token };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Unknown error");
  }
};
export const register = async (
  email: string,
  password: string,
  name: string
): Promise<{ token: string }> => {
  try {
    const res = await api.post("/auth/register", {
      email,
      password,
      name,
    });
    const token = res.data.token as string;
    return { token };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Unknown error");
  }
};

export const currentUser = async () => {
  try {
    return (await api.get("/auth/current-user")).data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Unknown error");
  }
};

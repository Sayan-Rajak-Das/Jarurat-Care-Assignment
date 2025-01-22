import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";


export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,

  // Check authentication
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/api/auth/check", {
        withCredentials: true,
      });
      set({ authUser: res.data });
    } catch {
      set({ authUser: null });
      // toast.error("Not authenticated. Please log in.");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Login
  login: async (data, navigate) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", data, {
        withCredentials: true,
      });
      set({ authUser: res.data });
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  },

  // Logout
  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout", {}, { withCredentials: true });
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);  
      toast.error(error?.response?.data?.message || "Logout failed. Please try again.");
    }
  },
}));

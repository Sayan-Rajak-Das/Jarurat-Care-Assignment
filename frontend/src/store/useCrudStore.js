import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const useCrudStore = create((set) => ({
  users: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  // Fetch all users
  fetchAllUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/crud/all", { withCredentials: true });
      set({ users: res.data });
    } catch {
      toast.error("Failed to fetch users.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Create a new user
  createUser: async (data) => {
    set({ isCreating: true });
    try {
      const res = await axiosInstance.post("/crud/create", data, { withCredentials: true });
      set((state) => ({ users: [...state.users, res.data] }));
      toast.success("User created successfully!");
    } catch {
      toast.error("Failed to create user.");
    } finally {
      set({ isCreating: false });
    }
  },

  // Update a user
  updateUser: async (id, data) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put(`/crud/update/${id}`, data, { withCredentials: true });
      set((state) => ({
        users: state.users.map((user) => (user._id === id ? res.data : user)),
      }));
      toast.success("User updated successfully!");
    } catch {
      toast.error("Failed to update user.");
    } finally {
      set({ isUpdating: false });
    }
  },

  // Delete a user
  deleteUser: async (id) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/crud/delete/${id}`, { withCredentials: true });
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
      }));
      toast.success("User deleted successfully!");
    } catch {
      toast.error("Failed to delete user.");
    } finally {
      set({ isDeleting: false });
    }
  },
}));

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// API Endpoints

// Auth Endpoints
export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user");
export const logout = () => api.post("/api/user/logout");

// Table Endpoints
export const addTable = (data) => api.post("/api/table/", data);
export const getTables = () => api.get("/api/table");

export const updateTable = ({ tableId, ...tableData }) =>
  api.put(`/api/table/${tableId}`, tableData);

export const updateTableStatus = async ({ id, status }) => {
  return await api.patch(`/api/table/${id}`, { status });
};

// Menu Endpoints
export const getMenuNames = () => api.get("/api/menu/names"); // Fetch menu names only
export const getMenuWithItems = (categoryName) =>
  api.get(`/api/menu/${categoryName}`); // Fetch menu category with items
export const addMenu = (data) => api.post("/api/menu", data); // Add new menu category

// Add a new item to an existing menu category
export const addMenuItem = (categoryName, itemData) =>
  api.post(`/api/menu/${categoryName}/item`, itemData); // Post new item to category

// Payment Endpoints
export const createOrderRazorpay = (data) =>
  api.post("/api/payment/create-order", data);
export const verifyPaymentRazorpay = (data) =>
  api.post("/api/payment/verify-payment", data);

// Order Endpoints
export const addOrder = (data) => api.post("/api/order/", data);
export const getOrders = () => api.get("/api/order");
export const updateOrderStatus = ({ orderId, orderStatus }) =>
  api.put(`/api/order/${orderId}`, { orderStatus });

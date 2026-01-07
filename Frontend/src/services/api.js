import { API_BASE_URL } from "../config";

/* ================= AUTH ================= */

export const login = async (username, password) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const signup = async (username, password) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      role: "EMPLOYEE",
    }),
  });

  if (!res.ok) throw new Error("Signup failed");
};

/* ================= FUND REQUEST ================= */

export const submitFundRequest = async (data) => {
  const res = await fetch(`${API_BASE_URL}/api/fund-request/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Fund request failed");
  return res.json();
};

export const getEmployeeFundRequests = async (employeeId) => {
  const res = await fetch(
    `${API_BASE_URL}/api/fund-request/employee/${employeeId}`
  );
  return res.json();
};

/* ================= FINANCE ================= */

export const getPendingFundRequests = async () => {
  const res = await fetch(`${API_BASE_URL}/api/fund-request/finance`);
  return res.json();
};

export const processFundRequest = async (id, action, comment) => {
  await fetch(
    `${API_BASE_URL}/api/fund-request/process/${id}?action=${action}&comment=${comment}`,
    { method: "POST" }
  );
};

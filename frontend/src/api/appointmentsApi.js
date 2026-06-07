import { API_URL } from "../config/api";

export async function createAppointment(appointmentData) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers,
    body: JSON.stringify(appointmentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Не вдалося створити запис");
  }

  return data;
}

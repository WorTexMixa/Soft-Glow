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

export async function fetchMyAppointments() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/appointments/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Не вдалося завантажити записи");
  }

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.appointments)) {
    return data.appointments;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return [];
}

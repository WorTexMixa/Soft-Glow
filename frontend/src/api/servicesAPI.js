import { API_URL } from "../config/api";

export async function fetchServices() {
  const response = await fetch(`${API_URL}/services`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Не вдалося завантажити послуги");
  }

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.services)) {
    return data.services;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return [];
}

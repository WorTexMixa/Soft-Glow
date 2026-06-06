import { API_URL } from "../config/api";

export async function fetchMasters() {
  const response = await fetch(`${API_URL}/masters`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Не вдалося завантажити майстрів");
  }

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.masters)) {
    return data.masters;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return [];
}

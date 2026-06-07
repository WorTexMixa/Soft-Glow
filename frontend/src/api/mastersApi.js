import { API_URL } from "../config/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

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

export async function createMaster(masterData) {
  const response = await fetch(`${API_URL}/masters`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(masterData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Не вдалося додати майстра");
  }

  return data;
}

export async function updateMaster(masterId, masterData) {
  const response = await fetch(`${API_URL}/masters/${masterId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(masterData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Не вдалося оновити майстра");
  }

  return data;
}

export async function deleteMaster(masterId) {
  const response = await fetch(`${API_URL}/masters/${masterId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Не вдалося видалити майстра");
  }

  return data;
}

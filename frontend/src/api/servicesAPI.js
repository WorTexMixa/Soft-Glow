import { API_URL } from "../config/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

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

export async function createService(serviceData) {
  const response = await fetch(`${API_URL}/services`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Не вдалося додати послугу");
  }

  return data;
}

export async function updateService(serviceId, serviceData) {
  const response = await fetch(`${API_URL}/services/${serviceId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Не вдалося оновити послугу");
  }

  return data;
}

export async function deleteService(serviceId) {
  const response = await fetch(`${API_URL}/services/${serviceId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Не вдалося видалити послугу");
  }

  return data;
}

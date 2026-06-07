export const statusLabels = {
  pending: "Очікує підтвердження",
  confirmed: "Підтверджено",
  cancelled: "Скасовано",
  completed: "Виконано",
};

export function getStatusLabel(status) {
  return statusLabels[status] || "Очікує підтвердження";
}

export function getStatusClass(status) {
  if (status === "confirmed") {
    return "status-badge status-badge--confirmed";
  }

  if (status === "cancelled") {
    return "status-badge status-badge--cancelled";
  }

  if (status === "completed") {
    return "status-badge status-badge--completed";
  }

  return "status-badge status-badge--pending";
}

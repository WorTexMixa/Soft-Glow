import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../api/servicesApi";
import "../components/Main.css";

function AdminServicesPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      if (!currentUser || currentUser.role !== "admin" || !token) {
        setIsLoading(false);
        return;
      }

      try {
        const servicesFromApi = await fetchServices();
        setServices(servicesFromApi);
      } catch (error) {
        console.error("Admin services loading error:", error);
        setError(error.message || "Не вдалося завантажити послуги");
      } finally {
        setIsLoading(false);
      }
    }

    loadServices();
  }, []);

  if (!currentUser || currentUser.role !== "admin" || !token) {
    return (
      <main>
        <section className="admin-services-page">
          <p className="section-subtitle">Адмін-панель</p>
          <h1 className="page-title">Доступ заборонено</h1>
          <p className="page-description">
            Керування послугами доступне тільки адміністратору.
          </p>

          <Link className="contacts-button" to="/login">
            Увійти
          </Link>
        </section>
      </main>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (editingId) {
        await updateService(editingId, {
          title: formData.title,
          description: formData.description,
        });

        const updatedServices = services.map((service) => {
          if (service.id === editingId) {
            return {
              ...service,
              title: formData.title,
              description: formData.description,
            };
          }

          return service;
        });

        setServices(updatedServices);
        setEditingId(null);
      } else {
        await createService({
          title: formData.title,
          description: formData.description,
        });

        const servicesFromApi = await fetchServices();
        setServices(servicesFromApi);
      }

      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Save service error:", error);
      alert(error.message || "Не вдалося зберегти послугу");
    }
  }

  function handleEdit(service) {
    setEditingId(service.id);

    setFormData({
      title: service.title,
      description: service.description,
    });
  }

  function handleCancelEdit() {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
    });
  }

  async function handleDelete(serviceId) {
    const confirmed = window.confirm("Видалити цю послугу?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteService(serviceId);

      const updatedServices = services.filter(
        (service) => service.id !== serviceId,
      );
      setServices(updatedServices);
    } catch (error) {
      console.error("Delete service error:", error);
      alert(error.message || "Не вдалося видалити послугу");
    }
  }

  return (
    <main>
      <section className="admin-services-page">
        <p className="section-subtitle">Адмін-панель</p>
        <h1 className="page-title">Керування послугами</h1>
        <p className="page-description">
          Тут адміністратор може додавати, редагувати та видаляти послуги
          салону.
        </p>

        <form className="admin-service-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Назва послуги</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Наприклад, Манікюр"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Опис послуги</label>
            <textarea
              id="description"
              name="description"
              placeholder="Короткий опис послуги"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="service-form-actions">
            <button className="auth-button" type="submit">
              {editingId ? "Зберегти зміни" : "Додати послугу"}
            </button>

            {editingId && (
              <button
                className="cancel-button"
                type="button"
                onClick={handleCancelEdit}
              >
                Скасувати
              </button>
            )}
          </div>
        </form>

        {isLoading && (
          <p className="page-description">Завантаження послуг...</p>
        )}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && services.length === 0 && (
          <div className="empty-appointments">
            <h2>Послуг поки немає</h2>
            <p>Додайте першу послугу через форму вище.</p>
          </div>
        )}

        {!isLoading && !error && services.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Назва</th>
                  <th>Опис</th>
                  <th>Дії</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>{service.title}</td>
                    <td>{service.description}</td>
                    <td>
                      <button
                        className="edit-button"
                        type="button"
                        onClick={() => handleEdit(service)}
                      >
                        Редагувати
                      </button>

                      <button
                        className="delete-button"
                        type="button"
                        onClick={() => handleDelete(service.id)}
                      >
                        Видалити
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminServicesPage;

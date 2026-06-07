import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  fetchMasters,
  createMaster,
  updateMaster,
  deleteMaster,
} from "../api/mastersApi";
import "../components/Main.css";

function AdminMastersPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  const [masters, setMasters] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    experience: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMasters() {
      if (!currentUser || currentUser.role !== "admin" || !token) {
        setIsLoading(false);
        return;
      }

      try {
        const mastersFromApi = await fetchMasters();
        setMasters(mastersFromApi);
      } catch (error) {
        console.error("Admin masters loading error:", error);
        setError(error.message || "Не вдалося завантажити майстрів");
      } finally {
        setIsLoading(false);
      }
    }

    loadMasters();
  }, []);

  if (!currentUser || currentUser.role !== "admin" || !token) {
    return (
      <main>
        <section className="admin-masters-page">
          <p className="section-subtitle">Адмін-панель</p>
          <h1 className="page-title">Доступ заборонено</h1>
          <p className="page-description">
            Керування майстрами доступне тільки адміністратору.
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
        await updateMaster(editingId, {
          name: formData.name,
          profession: formData.profession,
          experience: formData.experience,
        });

        const updatedMasters = masters.map((master) => {
          if (master.id === editingId) {
            return {
              ...master,
              name: formData.name,
              profession: formData.profession,
              experience: formData.experience,
            };
          }

          return master;
        });

        setMasters(updatedMasters);
        setEditingId(null);
      } else {
        await createMaster({
          name: formData.name,
          profession: formData.profession,
          experience: formData.experience,
        });

        const mastersFromApi = await fetchMasters();
        setMasters(mastersFromApi);
      }

      setFormData({
        name: "",
        profession: "",
        experience: "",
      });
    } catch (error) {
      console.error("Save master error:", error);
      alert(error.message || "Не вдалося зберегти майстра");
    }
  }

  function handleEdit(master) {
    setEditingId(master.id);

    setFormData({
      name: master.name,
      profession: master.profession,
      experience: master.experience,
    });
  }

  function handleCancelEdit() {
    setEditingId(null);

    setFormData({
      name: "",
      profession: "",
      experience: "",
    });
  }

  async function handleDelete(masterId) {
    const confirmed = window.confirm("Видалити цього майстра?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteMaster(masterId);

      const updatedMasters = masters.filter((master) => master.id !== masterId);

      setMasters(updatedMasters);
    } catch (error) {
      console.error("Delete master error:", error);
      alert(error.message || "Не вдалося видалити майстра");
    }
  }

  return (
    <main>
      <section className="admin-masters-page">
        <p className="section-subtitle">Адмін-панель</p>
        <h1 className="page-title">Керування майстрами</h1>
        <p className="page-description">
          Тут адміністратор може додавати, редагувати та видаляти майстрів
          салону.
        </p>

        <form className="admin-master-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ім’я майстра</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Наприклад, Аліна Сидорук"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="profession">Спеціалізація</label>
            <input
              id="profession"
              type="text"
              name="profession"
              placeholder="Наприклад, Майстер манікюру"
              value={formData.profession}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience">Досвід</label>
            <input
              id="experience"
              type="text"
              name="experience"
              placeholder="Наприклад, Досвід: 5 років"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          <div className="service-form-actions">
            <button className="auth-button" type="submit">
              {editingId ? "Зберегти зміни" : "Додати майстра"}
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
          <p className="page-description">Завантаження майстрів...</p>
        )}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && masters.length === 0 && (
          <div className="empty-appointments">
            <h2>Майстрів поки немає</h2>
            <p>Додайте першого майстра через форму вище.</p>
          </div>
        )}

        {!isLoading && !error && masters.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ім’я</th>
                  <th>Спеціалізація</th>
                  <th>Досвід</th>
                  <th>Дії</th>
                </tr>
              </thead>

              <tbody>
                {masters.map((master) => (
                  <tr key={master.id}>
                    <td>{master.name}</td>
                    <td>{master.profession}</td>
                    <td>{master.experience}</td>
                    <td>
                      <button
                        className="edit-button"
                        type="button"
                        onClick={() => handleEdit(master)}
                      >
                        Редагувати
                      </button>

                      <button
                        className="delete-button"
                        type="button"
                        onClick={() => handleDelete(master.id)}
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

export default AdminMastersPage;

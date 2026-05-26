import { useState } from 'react'
import { Link } from 'react-router'
import { getServices, saveServices } from '../data/services'
import '../components/Main.css'

function AdminServicesPage() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const [services, setServices] = useState(getServices())
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  if (!currentUser || currentUser.role !== 'admin') {
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
    )
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (editingId) {
      const updatedServices = services.map((service) => {
        if (service.id === editingId) {
          return {
            ...service,
            title: formData.title,
            description: formData.description,
          }
        }

        return service
      })

      setServices(updatedServices)
      saveServices(updatedServices)
      setEditingId(null)
    } else {
      const newService = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
      }

      const updatedServices = [...services, newService]

      setServices(updatedServices)
      saveServices(updatedServices)
    }

    setFormData({
      title: '',
      description: '',
    })
  }

  function handleEdit(service) {
    setEditingId(service.id)

    setFormData({
      title: service.title,
      description: service.description,
    })
  }

  function handleCancelEdit() {
    setEditingId(null)

    setFormData({
      title: '',
      description: '',
    })
  }

  function handleDelete(serviceId) {
    const confirmed = window.confirm('Видалити цю послугу?')

    if (!confirmed) {
      return
    }

    const updatedServices = services.filter((service) => service.id !== serviceId)

    setServices(updatedServices)
    saveServices(updatedServices)
  }

  return (
    <main>
      <section className="admin-services-page">
        <p className="section-subtitle">Адмін-панель</p>
        <h1 className="page-title">Керування послугами</h1>
        <p className="page-description">
          Тут адміністратор може додавати, редагувати та видаляти послуги салону.
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
              {editingId ? 'Зберегти зміни' : 'Додати послугу'}
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
      </section>
    </main>
  )
}

export default AdminServicesPage
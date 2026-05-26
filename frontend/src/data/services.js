export const defaultServices = [
  {
    id: 1,
    title: "Манікюр",
    description: "Догляд за нігтями, покриття та сучасний дизайн.",
  },
  {
    id: 2,
    title: "Макіяж",
    description: "Денний, вечірній та святковий макіяж для будь-якої події.",
  },
  {
    id: 3,
    title: "Брови",
    description: "Корекція, фарбування та оформлення брів.",
  },
  {
    id: 4,
    title: "Зачіски",
    description: "Стильні зачіски для щоденного образу та особливих подій.",
  },
  {
    id: 5,
    title: "Догляд за обличчям",
    description: "Очищення, зволоження та професійний догляд за шкірою.",
  },
  {
    id: 6,
    title: "Фарбування волосся",
    description: "Підбір кольору, фарбування та догляд після процедури.",
  },
];

export function getServices() {
  const savedServices = JSON.parse(localStorage.getItem('services'))

  if (savedServices && savedServices.length > 0) {
    return savedServices
  }

  return defaultServices
}

export function saveServices(services) {
  localStorage.setItem('services', JSON.stringify(services))
}
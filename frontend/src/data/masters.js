export const defaultMasters = [
  {
    id: 1,
    name: 'Аліна Сидорук',
    profession: 'Майстер манікюру',
    experience: 'Досвід: 5 років',
  },
  {
    id: 2,
    name: 'Марія Шевченко',
    profession: 'Візажист',
    experience: 'Досвід: 4 роки',
  },
  {
    id: 3,
    name: 'Ольга Бондар',
    profession: 'Brow-майстер',
    experience: 'Досвід: 3 роки',
  },
  {
    id: 4,
    name: 'Катерина Мельник',
    profession: 'Перукар-стиліст',
    experience: 'Досвід: 6 років',
  },
  {
    id: 5,
    name: 'Ірина Коваль',
    profession: 'Косметолог',
    experience: 'Досвід: 7 років',
  },
  {
    id: 6,
    name: 'Софія Романюк',
    profession: 'Майстер фарбування',
    experience: 'Досвід: 5 років',
  },
]

export function getMasters() {
  const savedMasters = JSON.parse(localStorage.getItem('masters'))

  if (savedMasters && savedMasters.length > 0) {
    return savedMasters
  }

  return defaultMasters
}

export function saveMasters(masters) {
  localStorage.setItem('masters', JSON.stringify(masters))
}
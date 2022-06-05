interface ICategoryChild {
  title: string
}
interface ICategorySeed extends ICategoryChild {
  childCategories?: {
    create: ICategoryChild[]
  }
}
export const seedCategoriesList: ICategorySeed[] = [
  {
    title: 'Масла и технические жидкости',
    childCategories: {
      create: [
        { title: 'Моторное масло' },
        { title: 'Гидравлическая жидкость' },
        { title: 'Тормозная жидкость' },
        { title: 'Антифризы' },
        { title: 'Трансмиссионное масло' },
      ],
    },
  },
  {
    title: 'Фильтры',
    childCategories: {
      create: [
        { title: 'Фильтры масляные' },
        { title: 'Фильры воздушные' },
        { title: 'Фильтры топливные' },
      ],
    },
  },
  {
    title: 'Двигатель',
    childCategories: {
      create: [
        { title: 'Блоки цилиндров' },
        { title: 'ГБЦ' },
        { title: 'Прокладки' },
        { title: 'Электроника двигателя' },
      ],
    },
  },
  {
    title: 'Система зажигания',
    childCategories: {
      create: [
        { title: 'Свечи зажигания' },
        { title: 'Катушки зажигания' },
        { title: 'Провода высоковольтные' },
      ],
    },
  },
  {
    title: 'Сцепление',
    childCategories: {
      create: [
        { title: 'Комплекты сцепления' },
        { title: 'Корзины сцепления' },
        { title: 'Диски сцепления' },
      ],
    },
  },
  {
    title: 'Трансмиссия',
    childCategories: {
      create: [
        { title: 'Коробка передач' },
        { title: 'Приводы колеса' },
        { title: 'Дифференциал и редуктор' },
      ],
    },
  },
  {
    title: 'Тормозная система',
    childCategories: {
      create: [
        { title: 'Дисковый тормозной механизм' },
        { title: 'Барабанный тормозной механизм' },
        { title: 'Стояночный тормоз' },
      ],
    },
  },
  {
    title: 'Топливная система',
    childCategories: {
      create: [{ title: 'Форсунки' }, { title: 'ТНВД' }, { title: 'Насосы топливные' }],
    },
  },
  {
    title: 'Ходовая часть',
    childCategories: {
      create: [{ title: 'Амортизаторы' }, { title: 'Ступицы колеса' }, { title: 'Рычаги' }],
    },
  },
  {
    title: 'Шины / Диски',
    childCategories: {
      create: [
        { title: 'Шины' },
        { title: 'Диски' },
        { title: 'Болты колесные' },
        { title: 'Гайки колесные' },
      ],
    },
  },
]

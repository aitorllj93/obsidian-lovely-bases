import type { LocaleTranslations } from "../types";

export const ru: LocaleTranslations = {
  card: {
    options: {
      layoutAndDisplay: {
        title: "Макет и Отображение",
        layout: {
          title: "Макет",
          horizontal: "Горизонтальный",
          vertical: "Вертикальный",
          overlay: "Наложение",
          polaroid: "Полароид",
        },
        contentVisibility: {
          title: "Видимость Контента",
          always: "Всегда Видимый",
          hover: "Показать при Наведении",
        },
        cardSize: {
          title: "Размер Карточки",
        },
        shape: {
          title: "Форма",
          square: "Квадрат",
          circle: "Круг",
          rounded: "Скругленный",
        },
        tilt: {
          title: "Наклон",
          none: "Нет",
          alternating: "Чередующийся",
        },
      },
      image: {
        title: "Изображение",
        imageProperty: {
          title: "Свойство Изображения",
        },
        imageAspectRatio: {
          title: "Соотношение Сторон Изображения",
        },
        imageFit: {
          title: "Подгонка Изображения",
          cover: "Покрыть",
          contain: "Содержать",
        },
        reverseContent: {
          title: "Обратить Изображение и Контент",
        },
      },
      content: {
        title: "Контент",
        showTitle: {
          title: "Показать Заголовок",
        },
        showPropertyTitles: {
          title: "Показать Заголовки Свойств",
        },
        showContent: {
          title: "Показать Содержимое Заметки",
        },
        contentMaxLength: {
          title: "Максимальная Длина Контента",
        },
      },
      appearance: {
        title: "Внешний вид",
        titleFont: {
          title: "Семейство Шрифтов Заголовка",
        },
        contentFont: {
          title: "Семейство Шрифтов Контента",
        },
        badgesFont: {
          title: "Семейство Шрифтов Значков",
        },
        backgroundColorProperty: {
          title: "Свойство Цвета Фона",
        },
        backgroundColorApplyTo: {
          title: "Применить Цвет Фона к",
          image: "Изображение",
          content: "Контент",
          both: "Оба",
        },
        iconProperty: {
          title: "Свойство Иконки",
        },
      },
      badges: {
        title: "Значки",
        badgeProperty: {
          title: "Свойство Значка",
        },
        badgeIcon: {
          title: "Иконка Значка",
        },
        badgeColor: {
          title: "Цвет Значка",
        },
      },
      interactivity: {
        title: "Интерактивность",
        linkProperty: {
          title: "Свойство Ссылки",
        },
        hoverStyle: {
          title: "Стиль при Наведении",
          none: "Нет",
          overlay: "Наложение",
          tooltip: "Подсказка",
        },
        hoverProperty: {
          title: "Свойство при Наведении",
        },
      },
    },
  },
  infiniteGallery: {
    options: {
      grid: {
        title: "Сетка",
        masonry: {
          title: "Макет Кирпичной Кладки",
        },
      },
    },
  },
  linearCalendar: {
    options: {
      data: {
        title: "Данные",
        startDateProperty: {
          title: "Свойство Даты Начала",
        },
        endDateProperty: {
          title: "Свойство Даты Окончания",
        },
        titleProperty: {
          title: "Свойство Заголовка",
        },
      },
      dateRange: {
        title: "Диапазон Дат",
        referenceDate: {
          title: "Базовая Дата",
          placeholder: "ГГГГ-ММ-ДД",
        },
        focus: {
          title: "Фокус",
          full: "Полный Год",
          half: "Полугодие",
          quarter: "Квартал",
        },
      },
      appearance: {
        title: "Внешний вид",
        colorProperty: {
          title: "Свойство Цвета",
        },
        iconProperty: {
          title: "Свойство Иконки",
        },
      },
    },
  },
  heatmapCalendar: {
    legend: {
      less: "Меньше",
      more: "Больше",
      no: "Нет",
      yes: "Да",
      overflow: "Переполнение",
    },
    options: {
      data: {
        title: "Данные",
        dateProperty: {
          title: "Свойство Даты",
        },
        trackProperty: {
          title: "Свойство Отслеживания",
        },
        trackType: {
          title: "Тип Отслеживания",
          autoDetect: "Автоопределение",
          number: "Число",
          boolean: "Логическое (Да/Нет)",
          text: "Текст (по длине)",
          list: "Список (по количеству элементов)",
        },
      },
      dateRange: {
        title: "Диапазон Дат",
        startDate: {
          title: "Дата Начала",
          placeholder: "ГГГГ-ММ-ДД",
        },
        endDate: {
          title: "Дата Окончания",
          placeholder: "ГГГГ-ММ-ДД",
        },
      },
      display: {
        title: "Макет и Отображение",
        layout: {
          title: "Макет",
          horizontal: "Горизонтальный",
          vertical: "Вертикальный",
        },
        viewMode: {
          title: "Режим Просмотра",
          "week-grid": "Сетка по Неделям (стиль GitHub)",
          "month-grid": "Сетка по Месяцам (стиль Календаря)",
        },
        showDayLabels: {
          title: "Показать Метки Дней",
        },
        showMonthLabels: {
          title: "Показать Метки Месяцев",
        },
        showYearLabels: {
          title: "Показать Метки Годов",
        },
        showLegend: {
          title: "Показать Легенду",
        },
      },
      valueRange: {
        title: "Диапазон Значений",
        minValue: {
          title: "Минимальное Значение",
        },
        maxValue: {
          title: "Максимальное Значение",
        },
      },
      appearance: {
        title: "Внешний вид",
        shape: {
          title: "Форма",
          circle: "Круг",
          square: "Квадрат",
          rounded: "Скругленный",
        },
        colorScheme: {
          title: "Цветовая Схема",
        },
        reverseColors: {
          title: "Инвертировать Цвета",
        },
        customColors: {
          title: "Пользовательские Цвета (hex через запятую)",
          placeholder: "#ebedf0, #9be9a8, #40c463, #30a14e, #216e39",
        },
        overflowColor: {
          title: "Цвет Предупреждения о Переполнении",
          placeholder: "#ff0000",
        },
      },
    },
  },
  projectFolders: {
    options: {
      dataProperties: {
        title: "Свойства Данных",
        imageProperty: {
          title: "Свойство Изображения",
        },
        iconProperty: {
          title: "Свойство Иконки",
        },
        colorProperty: {
          title: "Свойство Цвета",
        },
      },
      display: {
        title: "Отображение",
        colorizeFiles: {
          title: "Раскрасить Файлы",
        },
      },
    },
  },
  radarChart: {
    options: {
      data: {
        title: "Данные",
        aggregationFunction: {
          title: "Функция Агрегации",
          average: "Среднее",
          median: "Медиана",
          sum: "Сумма",
          max: "Максимум",
          min: "Минимум",
        },
      },
      valueRange: {
        title: "Диапазон Значений",
        minValue: {
          title: "Минимальное Значение",
        },
        maxValue: {
          title: "Максимальное Значение",
        },
      },
      display: {
        title: "Отображение",
        showAxisLabels: {
          title: "Показать Метки Осей",
        },
        showAxisTicks: {
          title: "Показать Деления Осей",
        },
        showLegend: {
          title: "Показать Легенду",
        },
        legendPosition: {
          title: "Позиция Легенды",
          top: "Сверху",
          bottom: "Снизу",
          left: "Слева",
          right: "Справа",
        },
      },
      appearance: {
        title: "Внешний вид",
        colorScheme: {
          title: "Цветовая Схема",
        },
        customColors: {
          title: "Пользовательские Цвета (hex через запятую)",
          placeholder: "#3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6",
        },
        fillOpacity: {
          title: "Непрозрачность Заливки",
        },
      },
    },
  },
  common: {
    loading: "Загрузка...",
    error: "Ошибка",
    options: {
      grouping: {
        title: "Группировка",
        groupTitleProperty: {
          title: "Свойство Заголовка Группы",
        },
        groupSubtitleProperty: {
          title: "Свойство Подзаголовка Группы",
        },
      },
      colors: {
        palettes: {
          red: "Красный",
          orange: "Оранжевый",
          yellow: "Жёлтый",
          green: "Зелёный",
          cyan: "Голубой",
          blue: "Синий",
          purple: "Фиолетовый",
          magenta: "Пурпурный",
        },
        schemes: {
          primary: "Основной",
          semaphor: "Светофор",
          rainbow: "Радуга",
          contrast: "Контраст",
        },
      },
    },
  },
};

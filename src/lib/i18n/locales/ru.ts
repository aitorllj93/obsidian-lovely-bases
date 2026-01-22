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
	heatmapCalendar: {
		legend: {
			less: "Меньше",
			more: "Больше",
			no: "Нет",
			yes: "Да",
			overflow: "Переполнение",
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
		},
	},
};

import type { LocaleTranslations } from "../types";

export const zh: LocaleTranslations = {
	card: {
		options: {
			layoutAndDisplay: {
				title: "布局和显示",
				layout: {
					title: "布局",
					horizontal: "横向",
					vertical: "纵向",
					overlay: "叠加",
					polaroid: "宝丽来",
				},
				contentVisibility: {
					title: "内容可见性",
					always: "始终可见",
					hover: "悬停时显示",
				},
				cardSize: {
					title: "卡片大小",
				},
				shape: {
					title: "形状",
					square: "方形",
					circle: "圆形",
					rounded: "圆角",
				},
				tilt: {
					title: "倾斜",
					none: "无",
					alternating: "交替",
				},
			},
			image: {
				title: "图像",
				imageProperty: {
					title: "图像属性",
				},
				imageAspectRatio: {
					title: "图像宽高比",
				},
				imageFit: {
					title: "图像适配",
					cover: "覆盖",
					contain: "包含",
				},
				reverseContent: {
					title: "反转图像和内容",
				},
			},
			content: {
				title: "内容",
				showTitle: {
					title: "显示标题",
				},
				showPropertyTitles: {
					title: "显示属性标题",
				},
				showContent: {
					title: "显示笔记内容",
				},
				contentMaxLength: {
					title: "内容最大长度",
				},
			},
		appearance: {
			title: "外观",
			titleFont: {
				title: "标题字体系列",
			},
			contentFont: {
				title: "内容字体系列",
			},
			badgesFont: {
				title: "徽章字体系列",
			},
			backgroundColorProperty: {
				title: "背景颜色属性",
			},
			backgroundColorApplyTo: {
				title: "应用背景颜色到",
				image: "图像",
				content: "内容",
				both: "两者",
			},
			iconProperty: {
				title: "图标属性",
			},
		},
		badges: {
			title: "徽章",
			badgeProperty: {
				title: "徽章属性",
			},
			badgeIcon: {
				title: "徽章图标",
			},
			badgeColor: {
				title: "徽章颜色",
			},
		},
			interactivity: {
				title: "交互性",
				linkProperty: {
					title: "链接属性",
				},
				hoverStyle: {
					title: "悬停样式",
					none: "无",
					overlay: "叠加",
					tooltip: "工具提示",
				},
				hoverProperty: {
					title: "悬停属性",
				},
			},
		},
	},
	infiniteGallery: {
		options: {
			grid: {
				title: "网格",
				masonry: {
					title: "瀑布流布局",
				},
			},
		},
	},
	linearCalendar: {
		options: {
			data: {
				title: "数据",
				startDateProperty: {
					title: "开始日期属性",
				},
				endDateProperty: {
					title: "结束日期属性",
				},
				titleProperty: {
					title: "标题属性",
				},
			},
			dateRange: {
				title: "日期范围",
				referenceDate: {
					title: "参考日期",
					placeholder: "YYYY-MM-DD",
				},
				focus: {
					title: "焦点",
					full: "全年",
					half: "半年",
					quarter: "季度",
				},
			},
			appearance: {
				title: "外观",
				colorProperty: {
					title: "颜色属性",
				},
				iconProperty: {
					title: "图标属性",
				},
			},
		},
	},
	heatmapCalendar: {
		legend: {
			less: "较少",
			more: "较多",
			no: "否",
			yes: "是",
			overflow: "溢出",
		},
		options: {
			data: {
				title: "数据",
				dateProperty: {
					title: "日期属性",
				},
				trackProperty: {
					title: "追踪属性",
				},
				trackType: {
					title: "追踪类型",
					autoDetect: "自动检测",
					number: "数字",
					boolean: "布尔值（是/否）",
					text: "文本（按长度）",
					list: "列表（按项目数）",
				},
			},
			dateRange: {
				title: "日期范围",
				startDate: {
					title: "开始日期",
					placeholder: "YYYY-MM-DD",
				},
				endDate: {
					title: "结束日期",
					placeholder: "YYYY-MM-DD",
				},
			},
			display: {
				title: "布局和显示",
				layout: {
					title: "布局",
					horizontal: "横向",
					vertical: "纵向",
				},
				viewMode: {
					title: "视图模式",
					"week-grid": "周网格（GitHub风格）",
					"month-grid": "月网格（日历风格）",
				},
				showDayLabels: {
					title: "显示星期标签",
				},
				showMonthLabels: {
					title: "显示月份标签",
				},
				showYearLabels: {
					title: "显示年份标签",
				},
				showLegend: {
					title: "显示图例",
				},
			},
			valueRange: {
				title: "值范围",
				minValue: {
					title: "最小值",
				},
				maxValue: {
					title: "最大值",
				},
			},
			appearance: {
				title: "外观",
				colorScheme: {
					title: "配色方案",
				},
				reverseColors: {
					title: "反转颜色",
				},
				customColors: {
					title: "自定义颜色（逗号分隔的十六进制值）",
					placeholder: "#ebedf0, #9be9a8, #40c463, #30a14e, #216e39",
				},
				overflowColor: {
					title: "溢出警告颜色",
					placeholder: "#ff0000",
				},
			},
		},
	},
	projectFolders: {
		options: {
			dataProperties: {
				title: "数据属性",
				imageProperty: {
					title: "图像属性",
				},
				iconProperty: {
					title: "图标属性",
				},
				colorProperty: {
					title: "颜色属性",
				},
			},
			display: {
				title: "显示",
				colorizeFiles: {
					title: "为文件着色",
				},
			},
		},
	},
	radarChart: {
		options: {
			data: {
				title: "数据",
				aggregationFunction: {
					title: "聚合函数",
					average: "平均值",
					median: "中位数",
					sum: "总和",
					max: "最大值",
					min: "最小值",
				},
			},
			valueRange: {
				title: "值范围",
				minValue: {
					title: "最小值",
				},
				maxValue: {
					title: "最大值",
				},
			},
			display: {
				title: "显示",
				showAxisLabels: {
					title: "显示轴标签",
				},
				showAxisTicks: {
					title: "显示轴刻度",
				},
				showLegend: {
					title: "显示图例",
				},
				legendPosition: {
					title: "图例位置",
					top: "顶部",
					bottom: "底部",
					left: "左侧",
					right: "右侧",
				},
			},
			appearance: {
				title: "外观",
				colorScheme: {
					title: "配色方案",
				},
				customColors: {
					title: "自定义颜色（逗号分隔的十六进制值）",
					placeholder: "#3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6",
				},
				fillOpacity: {
					title: "填充不透明度",
				},
			},
		},
	},
	common: {
		loading: "加载中...",
		error: "错误",
		options: {
			grouping: {
				title: "分组",
				groupTitleProperty: {
					title: "组标题属性",
				},
				groupSubtitleProperty: {
					title: "组副标题属性",
				},
			},
			colors: {
				palettes: {
					red: "红色",
					orange: "橙色",
					yellow: "黄色",
					green: "绿色",
					cyan: "青色",
					blue: "蓝色",
					purple: "紫色",
					magenta: "洋红",
				},
				schemes: {
					primary: "主色",
					semaphor: "信号灯",
					rainbow: "彩虹",
					contrast: "对比",
				},
			},
		},
	},
};

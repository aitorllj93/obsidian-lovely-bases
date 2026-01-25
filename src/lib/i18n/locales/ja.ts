import type { LocaleTranslations } from "../types";

export const ja: LocaleTranslations = {
  card: {
    options: {
      layoutAndDisplay: {
        title: "レイアウトと表示",
        layout: {
          title: "レイアウト",
          horizontal: "横",
          vertical: "縦",
          overlay: "オーバーレイ",
          polaroid: "ポラロイド",
        },
        contentVisibility: {
          title: "コンテンツの表示",
          always: "常に表示",
          hover: "ホバー時に表示",
        },
        cardSize: {
          title: "カードサイズ",
        },
        shape: {
          title: "形状",
          square: "正方形",
          circle: "円",
          rounded: "角丸",
        },
        tilt: {
          title: "傾き",
          none: "なし",
          alternating: "交互",
        },
      },
      image: {
        title: "画像",
        imageProperty: {
          title: "画像プロパティ",
        },
        imageAspectRatio: {
          title: "画像アスペクト比",
        },
        imageFit: {
          title: "画像フィット",
          cover: "カバー",
          contain: "含む",
        },
        reverseContent: {
          title: "画像とコンテンツを反転",
        },
      },
      content: {
        title: "コンテンツ",
        showTitle: {
          title: "タイトルを表示",
        },
        showPropertyTitles: {
          title: "プロパティタイトルを表示",
        },
        showContent: {
          title: "ノートコンテンツを表示",
        },
        contentMaxLength: {
          title: "コンテンツ最大長",
        },
      },
      appearance: {
        title: "外観",
        titleFont: {
          title: "タイトルフォントファミリー",
        },
        contentFont: {
          title: "コンテンツフォントファミリー",
        },
        badgesFont: {
          title: "バッジフォントファミリー",
        },
        backgroundColorProperty: {
          title: "背景色プロパティ",
        },
        backgroundColorApplyTo: {
          title: "背景色の適用先",
          image: "画像",
          content: "コンテンツ",
          both: "両方",
        },
        iconProperty: {
          title: "アイコンプロパティ",
        },
      },
      badges: {
        title: "バッジ",
        badgeProperty: {
          title: "バッジプロパティ",
        },
        badgeIcon: {
          title: "バッジアイコン",
        },
        badgeColor: {
          title: "バッジの色",
        },
      },
      interactivity: {
        title: "インタラクティビティ",
        linkProperty: {
          title: "リンクプロパティ",
        },
        hoverStyle: {
          title: "ホバースタイル",
          none: "なし",
          overlay: "オーバーレイ",
          tooltip: "ツールチップ",
        },
        hoverProperty: {
          title: "ホバープロパティ",
        },
      },
    },
  },
  infiniteGallery: {
    options: {
      grid: {
        title: "グリッド",
        masonry: {
          title: "メイソンリーレイアウト",
        },
      },
    },
  },
  linearCalendar: {
    options: {
      data: {
        title: "データ",
        startDateProperty: {
          title: "開始日プロパティ",
        },
        endDateProperty: {
          title: "終了日プロパティ",
        },
        titleProperty: {
          title: "タイトルプロパティ",
        },
      },
      dateRange: {
        title: "日付範囲",
        referenceDate: {
          title: "基準日",
          placeholder: "YYYY-MM-DD",
        },
        focus: {
          title: "フォーカス",
          full: "通年",
          half: "半年",
          quarter: "四半期",
        },
      },
      appearance: {
        title: "外観",
        colorProperty: {
          title: "色プロパティ",
        },
        iconProperty: {
          title: "アイコンプロパティ",
        },
      },
    },
  },
  heatmapCalendar: {
    legend: {
      less: "少ない",
      more: "多い",
      no: "いいえ",
      yes: "はい",
      overflow: "オーバーフロー",
    },
    options: {
      data: {
        title: "データ",
        dateProperty: {
          title: "日付プロパティ",
        },
        trackProperty: {
          title: "追跡プロパティ",
        },
        trackType: {
          title: "追跡タイプ",
          autoDetect: "自動検出",
          number: "数値",
          boolean: "ブール値（はい/いいえ）",
          text: "テキスト（長さ別）",
          list: "リスト（項目数別）",
        },
      },
      dateRange: {
        title: "日付範囲",
        startDate: {
          title: "開始日",
          placeholder: "YYYY-MM-DD",
        },
        endDate: {
          title: "終了日",
          placeholder: "YYYY-MM-DD",
        },
      },
      display: {
        title: "レイアウトと表示",
        layout: {
          title: "レイアウト",
          horizontal: "横",
          vertical: "縦",
        },
        viewMode: {
          title: "表示モード",
          "week-grid": "週グリッド（GitHubスタイル）",
          "month-grid": "月グリッド（カレンダースタイル）",
        },
        showDayLabels: {
          title: "曜日ラベルを表示",
        },
        showMonthLabels: {
          title: "月ラベルを表示",
        },
        showYearLabels: {
          title: "年ラベルを表示",
        },
        showLegend: {
          title: "凡例を表示",
        },
      },
      valueRange: {
        title: "値の範囲",
        minValue: {
          title: "最小値",
        },
        maxValue: {
          title: "最大値",
        },
      },
      appearance: {
        title: "外観",
        shape: {
          title: "形状",
          circle: "円",
          square: "正方形",
          rounded: "角丸",
        },
        colorScheme: {
          title: "カラースキーム",
        },
        reverseColors: {
          title: "色を反転",
        },
        customColors: {
          title: "カスタムカラー（カンマ区切りの16進数）",
          placeholder: "#ebedf0, #9be9a8, #40c463, #30a14e, #216e39",
        },
        overflowColor: {
          title: "オーバーフロー警告色",
          placeholder: "#ff0000",
        },
      },
    },
  },
  projectFolders: {
    options: {
      dataProperties: {
        title: "データプロパティ",
        imageProperty: {
          title: "画像プロパティ",
        },
        iconProperty: {
          title: "アイコンプロパティ",
        },
        colorProperty: {
          title: "色プロパティ",
        },
      },
      display: {
        title: "表示",
        colorizeFiles: {
          title: "ファイルに色を付ける",
        },
      },
    },
  },
  radarChart: {
    options: {
      data: {
        title: "データ",
        aggregationFunction: {
          title: "集計関数",
          average: "平均",
          median: "中央値",
          sum: "合計",
          max: "最大",
          min: "最小",
        },
      },
      valueRange: {
        title: "値の範囲",
        minValue: {
          title: "最小値",
        },
        maxValue: {
          title: "最大値",
        },
      },
      display: {
        title: "表示",
        showAxisLabels: {
          title: "軸ラベルを表示",
        },
        showAxisTicks: {
          title: "軸目盛りを表示",
        },
        showLegend: {
          title: "凡例を表示",
        },
        legendPosition: {
          title: "凡例の位置",
          top: "上",
          bottom: "下",
          left: "左",
          right: "右",
        },
      },
      appearance: {
        title: "外観",
        colorScheme: {
          title: "カラースキーム",
        },
        customColors: {
          title: "カスタムカラー（カンマ区切りの16進数）",
          placeholder: "#3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6",
        },
        fillOpacity: {
          title: "塗りつぶしの不透明度",
        },
      },
    },
  },
  common: {
    loading: "読み込み中...",
    error: "エラー",
    options: {
      grouping: {
        title: "グループ化",
        groupTitleProperty: {
          title: "グループタイトルプロパティ",
        },
        groupSubtitleProperty: {
          title: "グループサブタイトルプロパティ",
        },
      },
      colors: {
        palettes: {
          red: "赤",
          orange: "オレンジ",
          yellow: "黄",
          green: "緑",
          cyan: "シアン",
          blue: "青",
          purple: "紫",
          magenta: "マゼンタ",
        },
        schemes: {
          primary: "プライマリ",
          semaphor: "セマフォ",
          rainbow: "レインボー",
          contrast: "コントラスト",
        },
      },
    },
  },
};

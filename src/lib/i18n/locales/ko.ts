import type { LocaleTranslations } from "../types";

export const ko: LocaleTranslations = {
  card: {
    options: {
      layoutAndDisplay: {
        title: "레이아웃 및 표시",
        layout: {
          title: "레이아웃",
          horizontal: "가로",
          vertical: "세로",
          overlay: "오버레이",
          polaroid: "폴라로이드",
        },
        contentVisibility: {
          title: "콘텐츠 표시",
          always: "항상 표시",
          hover: "호버 시 표시",
        },
        cardSize: {
          title: "카드 크기",
        },
        shape: {
          title: "모양",
          square: "정사각형",
          circle: "원형",
          rounded: "둥근 모서리",
        },
        tilt: {
          title: "기울기",
          none: "없음",
          alternating: "교대",
        },
      },
      image: {
        title: "이미지",
        imageProperty: {
          title: "이미지 속성",
        },
        imageAspectRatio: {
          title: "이미지 종횡비",
        },
        imageFit: {
          title: "이미지 맞춤",
          cover: "덮기",
          contain: "포함",
        },
        reverseContent: {
          title: "이미지와 콘텐츠 반전",
        },
      },
      content: {
        title: "콘텐츠",
        showTitle: {
          title: "제목 표시",
        },
        showPropertyTitles: {
          title: "속성 제목 표시",
        },
        showContent: {
          title: "노트 콘텐츠 표시",
        },
        contentMaxLength: {
          title: "콘텐츠 최대 길이",
        },
      },
      appearance: {
        title: "외관",
        titleFont: {
          title: "제목 글꼴 패밀리",
        },
        contentFont: {
          title: "콘텐츠 글꼴 패밀리",
        },
        badgesFont: {
          title: "배지 글꼴 패밀리",
        },
        backgroundColorProperty: {
          title: "배경색 속성",
        },
        backgroundColorApplyTo: {
          title: "배경색 적용 대상",
          image: "이미지",
          content: "콘텐츠",
          both: "둘 다",
        },
        iconProperty: {
          title: "아이콘 속성",
        },
      },
      badges: {
        title: "배지",
        badgeProperty: {
          title: "배지 속성",
        },
        badgeIcon: {
          title: "배지 아이콘",
        },
        badgeColor: {
          title: "배지 색상",
        },
      },
      interactivity: {
        title: "상호작용",
        linkProperty: {
          title: "링크 속성",
        },
        hoverStyle: {
          title: "호버 스타일",
          none: "없음",
          overlay: "오버레이",
          tooltip: "툴팁",
        },
        hoverProperty: {
          title: "호버 속성",
        },
      },
    },
  },
  infiniteGallery: {
    options: {
      grid: {
        title: "그리드",
        masonry: {
          title: "메이슨리 레이아웃",
        },
      },
    },
  },
  linearCalendar: {
    options: {
      data: {
        title: "데이터",
        startDateProperty: {
          title: "시작 날짜 속성",
        },
        endDateProperty: {
          title: "종료 날짜 속성",
        },
        titleProperty: {
          title: "제목 속성",
        },
      },
      dateRange: {
        title: "날짜 범위",
        referenceDate: {
          title: "기준 날짜",
          placeholder: "YYYY-MM-DD",
        },
        focus: {
          title: "포커스",
          full: "전체 연도",
          half: "반년",
          quarter: "분기",
        },
      },
      appearance: {
        title: "외관",
        colorProperty: {
          title: "색상 속성",
        },
        iconProperty: {
          title: "아이콘 속성",
        },
      },
    },
  },
  heatmapCalendar: {
    legend: {
      less: "적음",
      more: "많음",
      no: "아니오",
      yes: "예",
      overflow: "초과",
    },
    options: {
      data: {
        title: "데이터",
        dateProperty: {
          title: "날짜 속성",
        },
        trackProperty: {
          title: "추적 속성",
        },
        trackType: {
          title: "추적 유형",
          autoDetect: "자동 감지",
          number: "숫자",
          boolean: "부울 (예/아니오)",
          text: "텍스트 (길이별)",
          list: "목록 (항목 수별)",
        },
      },
      dateRange: {
        title: "날짜 범위",
        startDate: {
          title: "시작 날짜",
          placeholder: "YYYY-MM-DD",
        },
        endDate: {
          title: "종료 날짜",
          placeholder: "YYYY-MM-DD",
        },
      },
      display: {
        title: "레이아웃 및 표시",
        layout: {
          title: "레이아웃",
          horizontal: "가로",
          vertical: "세로",
        },
        viewMode: {
          title: "보기 모드",
          "week-grid": "주간 그리드 (GitHub 스타일)",
          "month-grid": "월간 그리드 (캘린더 스타일)",
        },
        showDayLabels: {
          title: "요일 레이블 표시",
        },
        showMonthLabels: {
          title: "월 레이블 표시",
        },
        showYearLabels: {
          title: "연도 레이블 표시",
        },
        showLegend: {
          title: "범례 표시",
        },
      },
      valueRange: {
        title: "값 범위",
        minValue: {
          title: "최소값",
        },
        maxValue: {
          title: "최대값",
        },
      },
      appearance: {
        title: "외관",
        shape: {
          title: "모양",
          circle: "원형",
          square: "정사각형",
          rounded: "둥근 모서리",
        },
        colorScheme: {
          title: "색상 구성표",
        },
        reverseColors: {
          title: "색상 반전",
        },
        customColors: {
          title: "사용자 정의 색상 (쉼표로 구분된 16진수)",
          placeholder: "#ebedf0, #9be9a8, #40c463, #30a14e, #216e39",
        },
        overflowColor: {
          title: "초과 경고 색상",
          placeholder: "#ff0000",
        },
      },
    },
  },
  projectFolders: {
    options: {
      dataProperties: {
        title: "데이터 속성",
        imageProperty: {
          title: "이미지 속성",
        },
        iconProperty: {
          title: "아이콘 속성",
        },
        colorProperty: {
          title: "색상 속성",
        },
      },
      display: {
        title: "표시",
        colorizeFiles: {
          title: "파일 색상 지정",
        },
      },
    },
  },
  radarChart: {
    options: {
      data: {
        title: "데이터",
        aggregationFunction: {
          title: "집계 함수",
          average: "평균",
          median: "중앙값",
          sum: "합계",
          max: "최대",
          min: "최소",
        },
      },
      valueRange: {
        title: "값 범위",
        minValue: {
          title: "최소값",
        },
        maxValue: {
          title: "최대값",
        },
      },
      display: {
        title: "표시",
        showAxisLabels: {
          title: "축 레이블 표시",
        },
        showAxisTicks: {
          title: "축 눈금 표시",
        },
        showLegend: {
          title: "범례 표시",
        },
        legendPosition: {
          title: "범례 위치",
          top: "상단",
          bottom: "하단",
          left: "왼쪽",
          right: "오른쪽",
        },
      },
      appearance: {
        title: "외관",
        colorScheme: {
          title: "색상 구성표",
        },
        customColors: {
          title: "사용자 정의 색상 (쉼표로 구분된 16진수)",
          placeholder: "#3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6",
        },
        fillOpacity: {
          title: "채우기 불투명도",
        },
      },
    },
  },
  common: {
    loading: "로딩 중...",
    error: "오류",
    options: {
      grouping: {
        title: "그룹화",
        groupTitleProperty: {
          title: "그룹 제목 속성",
        },
        groupSubtitleProperty: {
          title: "그룹 부제목 속성",
        },
      },
      colors: {
        palettes: {
          red: "빨강",
          orange: "주황",
          yellow: "노랑",
          green: "초록",
          cyan: "청록",
          blue: "파랑",
          purple: "보라",
          magenta: "자홍",
        },
        schemes: {
          primary: "기본",
          semaphor: "신호등",
          rainbow: "무지개",
          contrast: "대비",
        },
      },
    },
  },
};

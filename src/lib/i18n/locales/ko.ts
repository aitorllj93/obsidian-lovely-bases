export const ko = {
  facets: {
    layout: {
      title: "레이아웃",
      size: {
        title: "항목 크기",
      },
      gap: {
        title: "간격",
      },
      border: {
        title: "테두리",
        none: "없음",
        solid: "실선",
        dashed: "파선",
        dotted: "점선",
      },
      spacing: {
        title: "간격",
      },
    },
    groups: {
      title: "그룹",
      layout: {
        title: "레이아웃",
        sections: "섹션",
        grid: "그리드",
      },
      shape: {
        title: "모양",
        folder: "폴더",
        notebook: "노트북",
      },
      ungroupedItemsDisplay: {
        title: "그룹화되지 않은 항목 표시",
        group: "그룹",
        inline: "인라인",
        hidden: "숨김",
      },
      inferPropertiesFromLinkedNotes: {
        title: "연결된 노트에서 속성 추론",
      }
    },
    cards: {
      title: "카드",
      layout: {
        title: "레이아웃",
        horizontal: "가로",
        vertical: "세로",
        overlay: "오버레이",
        polaroid: "폴라로이드",
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
        clockwise: "시계 방향",
        counterclockwise: "반시계 방향",
        alternating: "교대",
      },
      adaptToSize: {
        title: "크기에 맞추기",
      },
      reverseContent: {
        title: "콘텐츠 반전",
      },
    },
    titles: {
      title: "제목",
      position: {
        title: "위치",
        none: "없음",
        inside: "내부",
        outside: "외부",
      },
      font: {
        title: "글꼴 패밀리",
      },
      groupTitleProperty: {
        title: "그룹 제목 속성",
      },
      groupSubtitleProperty: {
        title: "그룹 부제목 속성",
      },
    },
    contents: {
      title: "콘텐츠",
      visibility: {
        title: '콘텐츠 표시',
        always: '항상 표시',
        hover: '호버 시 표시',
      },
      font: {
        title: "글꼴 패밀리",
      },
      showPropertyTitles: {
        title: "속성 제목 표시",
      },
      showMarkdown: {
        title: "Markdown 표시",
      },
      markdownMaxLength: {
        title: "Markdown 최대 길이",
      },
      markdownMaxHeight: {
        title: "Markdown 최대 높이",
      },
    },
    images: {
      title: "이미지",
      property: {
        title: "속성",
      },
      aspectRatio: {
        title: "종횡비",
      },
      fit: {
        title: "맞춤",
        cover: "덮기",
        contain: "포함",
      },
    },
    colors: {
      title: "색상",
      property: {
        title: "속성",
      },
      applyTo: {
        title: "적용 대상",
        image: "이미지",
        content: "콘텐츠",
        both: "둘 다",
      },
    },
    icons: {
      title: "아이콘",
      property: {
        title: "속성",
      },
      fileExtensionAsFallback: {
        title: "파일 확장자 아이콘을 폴백으로 사용",
      },
    },
    badges: {
      title: '배지',
      property: {
        title: "속성",
      },
      font: {
        title: "글꼴 패밀리",
      },
      iconProperty: {
        title: "아이콘 속성",
      },
      colorProperty: {
        title: "색상 속성",
      },
      counterPosition: {
        title: "그룹 카운터 위치",
        none: "없음",
        inside: "내부",
        outside: "외부",
      }
    },
    actions: {
      title: '작업',
      property: {
        title: "링크 속성",
      },
      groupClickBehavior: {
        title: "그룹 클릭 동작",
        expand: "확장",
        navigate: "탐색",
        none: "없음",
      },
      hoverStyle: {
        title: "호버 스타일",
        overlay: "오버레이",
        tooltip: "툴팁",
        none: "없음",
      },
      hoverProperty: {
        title: "호버 속성",
      }
    }
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
    back: "뒤로",
    totalItems: "{count}개 항목",
    singleItem: "{count}개 항목",
    options: {
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
} as const;

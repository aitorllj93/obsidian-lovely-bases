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
  heatmapCalendar: {
    legend: {
      less: "적음",
      more: "많음",
      no: "아니오",
      yes: "예",
      overflow: "초과",
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
    },
  },
};

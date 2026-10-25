/**
 * 불완전연소 (Incomplete Combustion)
 * 디자이너 및 프로젝트 상세 데이터베이스
 */

const DESIGNERS_DATA = {
  "01": {
    id: "01",
    nameKo: "강석준",
    nameEn: "Kang Seokjun",
    photo: "assets/프로필/강석준.jpg",
    fields: "Mobility Design, Product Design",
    email: "seokjun.kang@gmail.com",
    instagram: "@seokjun_k",
    projects: [
      {
        num: "01.",
        projectId: "01",
        title: "AURA",
        desc: "도심형 자율주행 모빌리티 (컨버전스 디자인)",
        image: "assets/poster-final.png"
      },
      {
        num: "02.",
        projectId: "16",
        title: "CINDER",
        desc: "불씨의 잔열을 품은 아로마 디퓨저 오브제 (어드밴스드 디자인)",
        image: "assets/combustion-graphic.png"
      }
    ]
  },
  "02": {
    id: "02",
    nameKo: "강제헌",
    nameEn: "Kang Jeheon",
    photo: "assets/프로필/강제헌.jpg",
    fields: "Product Design, CMF Design",
    email: "jeheon.kang@gmail.com",
    instagram: "@jeheon_design",
    projects: [
      {
        num: "01.",
        projectId: "02",
        title: "TRACE",
        desc: "열기와 흔적의 모듈형 수납 시스템 (컨버전스 디자인)",
        image: "assets/graphic-original.png"
      },
      {
        num: "02.",
        projectId: "17",
        title: "THERMO-SYNC",
        desc: "개인 맞춤형 체온 감응 웨어러블 디바이스 (어드밴스드 디자인)",
        image: "assets/poster-final.png"
      }
    ]
  },
  "03": {
    id: "03",
    nameKo: "김나연",
    nameEn: "Kim Nayeon",
    photo: "assets/프로필/김나연.jpg",
    fields: "Space Design, Furniture Design",
    email: "nayeon.kim@gmail.com",
    instagram: "@nayeon_space",
    projects: [
      {
        num: "01.",
        projectId: "03",
        title: "IGNIS",
        desc: "차세대 감성 스마트 공기정화 솔루션 (컨버전스 디자인)",
        image: "assets/combustion-graphic.png"
      },
      {
        num: "02.",
        projectId: "22",
        title: "ORBIT",
        desc: "무선 전력 전송 기반의 데스크 모듈 시스템 (어드밴스드 디자인 · 팀플 with 임창현)",
        image: "assets/graphic-original.png"
      }
    ]
  },
  "04": {
    id: "04",
    nameKo: "김하영",
    nameEn: "Kim Hayoung",
    photo: "assets/프로필/김하영.jpg",
    fields: "Healthcare, UX Interaction Design",
    email: "hayoung.kim@gmail.com",
    instagram: "@hayoung_k",
    projects: [
      {
        num: "01.",
        projectId: "04",
        title: "RELIEF",
        desc: "만성 통증 케어를 위한 웨어러블 디바이스 (컨버전스 디자인)",
        image: "assets/poster-final.png"
      },
      {
        num: "02.",
        projectId: "18",
        title: "BREATHE",
        desc: "호흡기 재활 환자를 위한 스마트 흡입 보조기 (어드밴스드 디자인)",
        image: "assets/combustion-graphic.png"
      }
    ]
  },
  "05": {
    id: "05",
    nameKo: "노유정",
    nameEn: "Roh Yujeong",
    photo: "assets/프로필/노유정.jpg",
    fields: "Living & Lifestyle, Object Design",
    email: "yujeong.roh@gmail.com",
    instagram: "@yujeong_roh",
    projects: [
      {
        num: "01.",
        projectId: "05",
        title: "KINETIC",
        desc: "물류 허브용 라스트마일 이송 디바이스 (컨버전스 디자인)",
        image: "assets/graphic-original.png"
      },
      {
        num: "02.",
        projectId: "19",
        title: "CONNECT-ID",
        desc: "인터랙티브 전시 감상 및 데이터 큐레이션 기구 (어드밴스드 디자인)",
        image: "assets/poster-final.png"
      }
    ]
  },
  "06": {
    id: "06",
    nameKo: "문관우",
    nameEn: "Moon Gwanwoo",
    photo: "assets/프로필/문관우.jpg",
    fields: "Mobility, Smart Device Design",
    email: "gwanwoo.moon@gmail.com",
    instagram: "@gwanwoo_m",
    projects: [
      {
        num: "01.",
        projectId: "06",
        title: "EMBER LIGHT",
        desc: "연소 잔여물을 모티프로 한 조명 (컨버전스 디자인)",
        image: "assets/combustion-graphic.png"
      },
      {
        num: "02.",
        projectId: "20",
        title: "VOLT-CARGO",
        desc: "도심 친환경 콜드체인 배송 모빌리티 (어드밴스드 디자인)",
        image: "assets/graphic-original.png"
      }
    ]
  },
  "07": {
    id: "07",
    nameKo: "문주환",
    nameEn: "Moon Juhwan",
    photo: "assets/프로필/문주환.jpg",
    fields: "Space Design, Product Design",
    email: "mjhnn@naver.com",
    instagram: "@_moonzooo_",
    projects: [
      {
        num: "01.",
        projectId: "07",
        title: "SPARK",
        desc: "디자이너 협업 및 메이커스 아카이빙 플랫폼 (컨버전스 디자인)",
        image: "assets/poster-final.png"
      },
      {
        num: "02.",
        projectId: "21",
        title: "HABITAT",
        desc: "1인 가구를 위한 모듈러 수납 시스템 (어드밴스드 디자인)",
        image: "assets/combustion-graphic.png"
      }
    ]
  },
  "08": {
    id: "08",
    nameKo: "박진호",
    nameEn: "Park Jinho",
    photo: "assets/프로필/박진호.jpg",
    fields: "Industrial Design, Tech Hardware",
    email: "jinho.park@gmail.com",
    instagram: "@jinho_park",
    projects: [
      {
        num: "01.",
        projectId: "08",
        title: "CORE",
        desc: "지속가능한 배터리 교환형 홈 어플라이언스 (컨버전스 디자인)",
        image: "assets/graphic-original.png"
      },
      {
        num: "02.",
        projectId: "23",
        title: "AURA MENTAL",
        desc: "감각 피로 완화를 위한 멘탈케어 테라피 디바이스 (어드밴스드 디자인)",
        image: "assets/poster-final.png"
      }
    ]
  },
  "09": {
    id: "09",
    nameKo: "유서연",
    nameEn: "Yoo Seoyeon",
    photo: "assets/프로필/유서연.jpg",
    fields: "UX/UI, Service & Interaction",
    email: "seoyeon.yoo@gmail.com",
    instagram: "@seoyeon_y",
    projects: [
      {
        num: "01.",
        projectId: "09",
        title: "OASIS",
        desc: "소방구조대원을 위한 열기 냉각 현장 지원 기구 (컨버전스 디자인)",
        image: "assets/combustion-graphic.png"
      },
      {
        num: "02.",
        projectId: "24",
        title: "RE-SOIL",
        desc: "도심형 스마트 바이오 퇴비화 서비스 디바이스 (어드밴스드 디자인 · 팀플 with 이승민)",
        image: "assets/graphic-original.png"
      }
    ]
  },
  "10": {
    id: "10",
    nameKo: "윤영서",
    nameEn: "Yoon Youngseo",
    photo: "assets/프로필/윤영서.jpg",
    fields: "Space Design, Environmental Design",
    email: "youngseo.yoon@gmail.com",
    instagram: "@youngseo_y",
    projects: [
      {
        num: "01.",
        projectId: "10",
        title: "TERRA-ROVER",
        desc: "극한 환경 탐사용 모듈러 모빌리티 (컨버전스 디자인)",
        image: "assets/poster-final.png"
      },
      {
        num: "02.",
        projectId: "25",
        title: "GLOW",
        desc: "온도 반응형 생체리듬 홈 라이팅 (어드밴스드 디자인)",
        image: "assets/combustion-graphic.png"
      }
    ]
  },
  "11": {
    id: "11",
    nameKo: "이승민",
    nameEn: "Lee Seungmin",
    photo: "assets/프로필/이승민.jpg",
    fields: "Product Design, Living Object",
    email: "seungmin.lee@gmail.com",
    instagram: "@seungmin_l",
    projects: [
      {
        num: "01.",
        projectId: "11",
        title: "ASH & FORM",
        desc: "탄화 목재와 메탈 접합 가구 시리즈 (컨버전스 디자인)",
        image: "assets/graphic-original.png"
      },
      {
        num: "02.",
        projectId: "24",
        title: "RE-SOIL",
        desc: "도심형 스마트 바이오 퇴비화 서비스 디바이스 (어드밴스드 디자인 · 팀플 with 유서연)",
        image: "assets/poster-final.png"
      }
    ]
  },
  "12": {
    id: "12",
    nameKo: "이종훈",
    nameEn: "Lee Jonghoon",
    photo: "assets/프로필/이종훈.jpg",
    fields: "Mobility, Space Design",
    email: "jonghoon.lee@gmail.com",
    instagram: "@jonghoon_l",
    projects: [
      {
        num: "01.",
        projectId: "12",
        title: "NEBULA",
        desc: "차세대 제스처 인터랙션 스마트 허브 (컨버전스 디자인)",
        image: "assets/combustion-graphic.png"
      },
      {
        num: "02.",
        projectId: "26",
        title: "FLOW",
        desc: "공간 적응형 사운드 프로젝터 디바이스 (어드밴스드 디자인)",
        image: "assets/graphic-original.png"
      }
    ]
  },
  "13": {
    id: "13",
    nameKo: "임서영",
    nameEn: "Lim Seoyoung",
    photo: "assets/프로필/임서영.jpg",
    fields: "CMF, Product & Material Design",
    email: "seoyoung.lim@gmail.com",
    instagram: "@seoyoung_lim",
    projects: [
      {
        num: "01.",
        projectId: "13",
        title: "VITAL-BAND",
        desc: "시니어 응급 알림 및 보행 보조 시스템 (컨버전스 디자인)",
        image: "assets/poster-final.png"
      },
      {
        num: "02.",
        projectId: "27",
        title: "RE-MOVE",
        desc: "뇌졸중 환자의 일상 복귀를 위한 손 재활 글러브 (어드밴스드 디자인)",
        image: "assets/combustion-graphic.png"
      }
    ]
  },
  "14": {
    id: "14",
    nameKo: "임창현",
    nameEn: "Lim Changhyun",
    photo: "assets/프로필/임창현.jpg",
    fields: "Smart Tech, Hardware Design",
    email: "changhyun.lim@gmail.com",
    instagram: "@changhyun_l",
    projects: [
      {
        num: "01.",
        projectId: "14",
        title: "CIRCULO",
        desc: "업사이클링 소재 순환 렌탈 서비스 디자인 (컨버전스 디자인)",
        image: "assets/graphic-original.png"
      },
      {
        num: "02.",
        projectId: "22",
        title: "ORBIT",
        desc: "무선 전력 전송 기반의 데스크 모듈 시스템 (어드밴스드 디자인 · 팀플 with 김나연)",
        image: "assets/poster-final.png"
      }
    ]
  },
  "15": {
    id: "15",
    nameKo: "최산",
    nameEn: "Choi San",
    photo: "assets/프로필/최산.jpg",
    fields: "Furniture, Industrial Design",
    email: "san.choi@gmail.com",
    instagram: "@san_choi",
    projects: [
      {
        num: "01.",
        projectId: "15",
        title: "PULSE",
        desc: "자율주행 퍼스널 커뮤터 콕핏 디자인 (컨버전스 디자인 · 팀플 with 하세영)",
        image: "assets/combustion-graphic.png"
      },
      {
        num: "02.",
        projectId: "28",
        title: "KNOT",
        desc: "재생 알루미늄 조립식 라운지 체어 (어드밴스드 디자인)",
        image: "assets/poster-final.png"
      }
    ]
  },
  "16": {
    id: "16",
    nameKo: "하세영",
    nameEn: "Ha Seyoung",
    photo: "assets/프로필/하세영.jpg",
    fields: "Space Design, Public Interaction",
    email: "seyoung.ha@gmail.com",
    instagram: "@seyoung_ha",
    projects: [
      {
        num: "01.",
        projectId: "15",
        title: "PULSE",
        desc: "자율주행 퍼스널 커뮤터 콕핏 디자인 (컨버전스 디자인 · 팀플 with 최산)",
        image: "assets/combustion-graphic.png"
      },
      {
        num: "02.",
        projectId: "29",
        title: "EMBER ARCHIVE",
        desc: "불완전연소 34회 졸업전시 디지털 아카이브 (어드밴스드 디자인)",
        image: "assets/combustion-graphic.png"
      }
    ]
  }
};

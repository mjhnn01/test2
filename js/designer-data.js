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
        title: "VOYAGE",
        desc: "도심형 자율주행 라스트마일 모빌리티 플랫폼",
        details: "목적지 중심의 자율주행 경험을 재정의하고, 도심 환경과 상호작용하는 유연한 공간 모빌리티 솔루션을 제안합니다."
      },
      {
        num: "02.",
        title: "MODU",
        desc: "공유형 마이크로 모빌리티 및 도킹 스테이션",
        details: "사용자의 이동 동선과 충전 인프라를 일원화한 도시형 모듈러 모빌리티 디자인입니다."
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
        title: "SOLID",
        desc: "지속가능한 알루미늄 다이캐스팅 조명 오브제",
        details: "소재의 원초적 질감과 그림자의 대비를 극대화한 구조적 조명 디자인 연구입니다."
      },
      {
        num: "02.",
        title: "TACTILE",
        desc: "햅틱 인터랙션 스마트 홈 컨트롤러",
        details: "디지털 신호를 아날로그 촉각 피드백으로 치환하여 직관적인 조작감을 제공하는 컨트롤러입니다."
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
        title: "LAYER",
        desc: "유연한 경계를 제안하는 모듈형 파티션 시스템",
        details: "공간의 투광성과 차폐성을 상황에 맞추어 조절할 수 있는 직조형 파티션 오브제입니다."
      },
      {
        num: "02.",
        title: "BALANCE",
        desc: "비대칭 균형을 담은 라운지 체어",
        details: "구조적 긴장감 속에서 신체의 안식을 유도하는 금속 프레임 라운지 가구입니다."
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
        title: "BREATHE",
        desc: "호흡기 재활 환자를 위한 디지털 흡입 보조기",
        details: "호흡 훈련 과정을 시각적 인터랙션으로 피드백하여 환자의 자발적 치료 몰입을 돕는 헬스케어 기기입니다."
      },
      {
        num: "02.",
        title: "CARE-PULSE",
        desc: "감각 피로 완화 웨어러블 테라피 솔루션",
        details: "현대인의 만성 스트레스 완화를 위한 온열 및 미세 진동 복합 테라피 웨어러블 디바이스입니다."
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
        title: "EMBER",
        desc: "불씨의 잔열을 머금은 세라믹 티웨어 세트",
        details: "불완전연소의 모티프인 불씨의 온기를 형상화하여 오랜 시간 온도를 유지하는 다도 기구 세트입니다."
      },
      {
        num: "02.",
        title: "SHADOW",
        desc: "빛과 음영의 조화로운 모듈러 선반",
        details: "자연광의 변화에 따라 다양한 그림자 패턴을 만들어내는 건축적 구조의 벽면 수납 모듈입니다."
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
        title: "AURA COMMUTER",
        desc: "미래 도심형 개인 모빌리티 콕핏 시스템",
        details: "주행 시 운전자와 차량의 일체감을 강화하는 인체공학적 시트 및 인터페이스 디자인입니다."
      },
      {
        num: "02.",
        title: "NEXUS",
        desc: "제스처 인터랙션 AI 스마트 프로젝터",
        details: "공간의 벽면과 바닥을 디스플레이로 활용하여 직관적인 조작이 가능한 인터랙티브 빔 프로젝터입니다."
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
        title: "GWANGJANG",
        desc: "광장의 속성을 담은 국회의사당 본회의장",
        details: "폐쇄적인 의정 공간을 시민의 광장과 유기적으로 연결하여 민주주의의 투명성과 소통의 가치를 공간 언어로 재해석한 프로젝트입니다."
      },
      {
        num: "02.",
        title: "SHEAVE",
        desc: "키네틱 조명 오브제",
        details: "도르래의 기계적 움직임과 균형추의 원리를 시각화하여, 빛의 높낮이와 확산 각도를 동적으로 제어하는 키네틱 라이팅 오브제입니다."
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
        title: "KINETIC CORE",
        desc: "스마트 물류 허브용 자율 이송 로봇",
        details: "고효율 물류 환경에 최적화된 저중심 섀시와 충격 흡수 모듈을 결합한 차세대 AGV 디자인입니다."
      },
      {
        num: "02.",
        title: "FRAME-X",
        desc: "모듈러 산업용 스마트 툴 시스템",
        details: "다양한 작업 환경에 대응하는 퀵 체인지 헤드와 원격 텔레메트리 연동 전동 공구 디자인입니다."
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
        title: "CIRCLE",
        desc: "도심 자원 순환 라이프스타일을 위한 리필 서비스",
        details: "패키지 없는 소비 문화를 촉진하기 위해 디스펜서 하드웨어와 사용자 앱 경험을 통합 설계한 서비스입니다."
      },
      {
        num: "02.",
        title: "TRACE APP",
        desc: "감정 기록 및 멘탈 웰니스 플랫폼",
        details: "일상의 감정 변화를 시각적 그래픽으로 아카이빙하고 치유의 시간을 제공하는 모바일 앱 경험입니다."
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
        title: "FORUM",
        desc: "도심 속 폐산업시설을 활용한 복합문화공간",
        details: "산업 유산의 시간성을 보존하면서 지역 주민과 예술가가 교류할 수 있는 개방형 문화 플랫폼 설계입니다."
      },
      {
        num: "02.",
        title: "PAVILION 34",
        desc: "가변적 전시를 위한 친환경 파빌리온 구조",
        details: "모듈화된 조립 구조로 재사용 및 확장이 용이한 임시 전시장 건축 프로토타입입니다."
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
        title: "RE-SOIL",
        desc: "도심형 스마트 바이오 퇴비화 가전",
        details: "음식물 부산물을 발효 건조하여 냄새 없이 유기질 비료로 환원하는 친환경 홈 어플라이언스입니다."
      },
      {
        num: "02.",
        title: "FORM",
        desc: "이종 소재의 결합 구조를 드러낸 테이블",
        details: "목재의 따뜻함과 금속 압출재의 정밀함을 대비시켜 구조미를 부각시킨 가구 디자인입니다."
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
        title: "HYPER-LOOP",
        desc: "차세대 초고속 이동체 캡슐 인테리어",
        details: "밀폐된 초고속 터널 환경에서도 쾌적한 승차감과 심리적 안정감을 제공하는 승객 캡슐 공간입니다."
      },
      {
        num: "02.",
        title: "TERRA ROVER",
        desc: "극한 환경 탐사용 모듈형 비히클",
        details: "지형 변화에 따라 능동적으로 휠베이스를 가변하는 전지형 탐사 모빌리티 플랫폼입니다."
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
        title: "TEXTURE",
        desc: "탄화 목재의 질감을 살린 오브제 스피커",
        details: "불에 그을린 탄화 목재 특유의 음향 반사 특성을 활용하여 공간에 깊은 사운드를 채우는 음향 오브제입니다."
      },
      {
        num: "02.",
        title: "ESSENCE",
        desc: "자연 기화식 아로마 디퓨저",
        details: "세라믹의 모세관 현상을 활용해 전력 소비 없이 은은한 향을 공간에 확산시키는 아로마 디바이스입니다."
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
        title: "ORBIT",
        desc: "무선 전력 전송 기반 데스크 모듈 시스템",
        details: "케이블 없는 작업 환경을 위해 모듈러 디바이스 간 공진형 무선 전력망을 구축하는 데스크 기어입니다."
      },
      {
        num: "02.",
        title: "LUMEN",
        desc: "적응형 생체리듬 스마트 데스크 램프",
        details: "사용자의 작업 집중도와 시간에 맞춰 색온도와 조도를 자동으로 조절하는 홈 오피스 조명입니다."
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
        title: "KNOT",
        desc: "재생 알루미늄 조립식 라운지 체어",
        details: "단 하나의 벤딩 프로파일과 텐션 로프로 체결되어 분해와 재활용이 용이한 미니멀 체어입니다."
      },
      {
        num: "02.",
        title: "STRUCT",
        desc: "볼트 없이 맞물리는 인터로킹 쉘프",
        details: "자체 결합 홈 구조를 통해 나사 없이 견고하게 조립되는 모듈러 선반 시스템입니다."
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
        title: "ARCHIVE EMBER",
        desc: "졸업전시 인터랙티브 아카이빙 파빌리온",
        details: "학생들의 4년간의 디자인 여정과 불완전연소의 잔열을 빛과 인터랙티브 미디어로 경험하는 전시 공간입니다."
      },
      {
        num: "02.",
        title: "COMMUNE",
        desc: "지역 커뮤니티를 위한 공유 휴게 스트럭처",
        details: "도심 골목길의 자투리 공간을 이웃 간의 대화와 쉼의 장소로 변모시키는 공공 벤치 시스템입니다."
      }
    ]
  }
};

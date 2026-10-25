/**
 * 불완전연소 (Incomplete Combustion)
 * 명지대학교 디자인학부 인더스트리얼디자인전공 제34회 졸업전시
 * Layout & Navigation Controller & Detail Views (Designer & Project)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 네비게이션 및 페이지 뷰 제어
  const navButtons = document.querySelectorAll('[data-nav]');
  const pageViews = document.querySelectorAll('.page-view');
  const floatingNav = document.getElementById('global-floating-nav');
  let currentViewId = 'landing';
  let currentDesignerId = '07'; // 기본값: 문주환
  let currentProjectId = '01';   // 기본값: AURA

  // 디자이너 및 프로젝트 ID 순서 목록
  const designerIdList = Object.keys(typeof DESIGNERS_DATA !== 'undefined' ? DESIGNERS_DATA : {
    "01":1,"02":1,"03":1,"04":1,"05":1,"06":1,"07":1,"08":1,"09":1,"10":1,"11":1,"12":1,"13":1,"14":1,"15":1,"16":1
  });

  const projectIdList = Object.keys(typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : {
    "01":1,"02":1,"03":1,"04":1,"05":1,"06":1,"07":1,"08":1,"09":1,"10":1,
    "11":1,"12":1,"13":1,"14":1,"15":1,"16":1,"17":1,"18":1,"19":1,"20":1,
    "21":1,"22":1,"23":1,"24":1,"25":1,"26":1,"27":1,"28":1,"29":1
  });

  // 수업별 프로젝트 ID 분류 (컨버전스 디자인 15작품: 01~15 / 어드밴스드 디자인 14작품: 16~29)
  const convergenceProjectIdList = projectIdList.filter(id => {
    const n = parseInt(id, 10);
    return !isNaN(n) && n >= 1 && n <= 15;
  });

  const advancedProjectIdList = projectIdList.filter(id => {
    const n = parseInt(id, 10);
    return !isNaN(n) && n >= 16 && n <= 29;
  });

  let currentCourseFilter = 'all'; // 'all', 'convergence', 'advanced'

  function getActiveProjectIdList() {
    if (currentCourseFilter === 'convergence') return convergenceProjectIdList;
    if (currentCourseFilter === 'advanced') return advancedProjectIdList;
    return projectIdList;
  }

  function updateFloatingNavOnScroll() {
    if (!floatingNav) return;
    
    if (currentViewId === 'landing') {
      // 랜딩페이지: 첫 화면(스크롤 80px 미만)에서는 큰 로고 유지, 스크롤을 내리면 메뉴 폰트 크기로 축소
      if (window.scrollY > 80) {
        floatingNav.classList.add('is-scrolled');
      } else {
        floatingNav.classList.remove('is-scrolled');
      }
    } else {
      // 서브페이지: 콤팩트한 네비게이션 유지
      floatingNav.classList.add('is-scrolled');
    }
  }

  function switchView(targetViewId, updateHash = true) {
    currentViewId = targetViewId;

    // 서브페이지 여부에 따른 body 클래스 토글 (우측 세로 바 레이아웃 전환)
    if (targetViewId === 'landing') {
      document.body.classList.remove('is-subpage');
    } else {
      document.body.classList.add('is-subpage');
    }

    // 프로젝트 페이지 여부에 따른 클래스 토글
    if (targetViewId === 'project' || targetViewId === 'project-detail') {
      document.body.classList.add('is-project-active');
    } else {
      document.body.classList.remove('is-project-active');
    }

    // 뷰 전환
    pageViews.forEach(view => {
      if (view.id === `view-${targetViewId}`) {
        view.classList.add('active-view');
      } else {
        view.classList.remove('active-view');
      }
    });

    // 우측 네비게이션 메뉴 및 로고 활성화 상태 갱신
    navButtons.forEach(btn => {
      const navTarget = btn.getAttribute('data-nav');
      const isDesignerActive = (targetViewId === 'designer' || targetViewId === 'designer-detail') && navTarget === 'designer';
      const isProjectActive = (targetViewId === 'project' || targetViewId === 'project-detail') && navTarget === 'project';
      const isDirectMatch = navTarget === targetViewId;

      if (isDirectMatch || isDesignerActive || isProjectActive) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // URL 해시 갱신
    if (updateHash) {
      if (targetViewId === 'designer-detail') {
        const targetHash = `#designer/${currentDesignerId}`;
        if (window.location.hash !== targetHash) {
          history.pushState(null, '', targetHash);
        }
      } else if (targetViewId === 'project-detail') {
        const targetHash = `#project/${currentProjectId}`;
        if (window.location.hash !== targetHash) {
          history.pushState(null, '', targetHash);
        }
      } else {
        const targetHash = `#${targetViewId}`;
        if (window.location.hash !== targetHash) {
          history.pushState(null, '', targetHash);
        }
      }
    }

    // 화면 상단으로 즉시 스크롤 초기화 (아래로 밀리는 현상 방지)
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 플로팅 네비게이션 상태 즉시 갱신
    updateFloatingNavOnScroll();
  }

  // ==========================================================================
  // [A] 프로젝트 상세 페이지 렌더링 및 인터랙션
  // ==========================================================================
  const projectDetailTitle = document.getElementById('project-detail-title');
  const projectDetailDesigner = document.getElementById('project-detail-designer');
  const projectDetailLead = document.getElementById('project-detail-lead');
  const projectDetailSub = document.getElementById('project-detail-sub');

  const btnBackToProjects = document.getElementById('btn-back-to-projects');
  const btnPrevProject = document.getElementById('btn-prev-project');
  const btnNextProject = document.getElementById('btn-next-project');

  function openProjectDetail(projectId, updateHash = true) {
    if (typeof PROJECTS_DATA === 'undefined') return;
    const data = PROJECTS_DATA[projectId] || PROJECTS_DATA['01'];
    if (!data) return;

    currentProjectId = data.id;

    // 작품 명 & 디자이너 명 (이미지의 GWANJANG Moon Juhwan 형태)
    if (projectDetailTitle) projectDetailTitle.innerText = data.title;
    if (projectDetailDesigner) projectDetailDesigner.innerText = data.designerEn || data.designer;

    // 작품 설명 문단 (이미지의 2개 문단 사양)
    if (projectDetailLead) {
      projectDetailLead.innerHTML = data.leadDesc || data.statement || `Even after the flames have died down, heat remains. Beneath a surface blackened by fire,<br>like charcoal holding within it the moment it may ignite once again.`;
    }
    if (projectDetailSub) {
      projectDetailSub.innerHTML = data.subDesc || data.subStatement || `Through countless days of questioning, hesitation, and uncertainty, we continued on.<br>Even in moments when we could not burn as brightly as we had hoped, we made something, erased it, and tried again.<br>Those moments have remained within each of us as distinct textures and traces, while possibilities we have yet to fully unfold have accumulated inside us as heat.`;
    }

    // 뷰 전환
    switchView('project-detail', updateHash);
  }

  // 이전/다음 프로젝트 이동 (현재 선택된 수업 필터 범위 내에서 순환)
  function stepProject(direction) {
    const activeList = getActiveProjectIdList();
    if (!activeList.length) return;
    const curIdx = activeList.indexOf(currentProjectId);
    let targetIdx = curIdx + direction;
    if (curIdx === -1) {
      targetIdx = 0;
    } else {
      if (targetIdx < 0) targetIdx = activeList.length - 1;
      if (targetIdx >= activeList.length) targetIdx = 0;
    }
    const targetId = activeList[targetIdx];
    openProjectDetail(targetId, true);
  }

  if (btnPrevProject) {
    btnPrevProject.addEventListener('click', () => stepProject(-1));
  }
  if (btnNextProject) {
    btnNextProject.addEventListener('click', () => stepProject(1));
  }

  // ALL PROJECTS 목록으로 돌아가기 버튼 (이전 수업 필터 상태 유지)
  if (btnBackToProjects) {
    btnBackToProjects.addEventListener('click', () => {
      switchView('project', true);
    });
  }

  // ==========================================================================
  // [A-1] 수업별 프로젝트 필터링 컨트롤러 (우측 여백 중앙 배치)
  // - ALL (모든 29개 작품)
  // - CONVERGENCE DESIGN (총 15개 작품: 01~15)
  // - ADVANCED DESIGN (총 14개 작품: 16~29)
  // - 프로젝트 페이지 첫 진입 시 ALL이 기본 선택되어 모든 작품 표시
  // ==========================================================================
  const projectCards = document.querySelectorAll('#view-project .project-wireframe-card');
  const filterBtnAll = document.getElementById('btn-filter-all');
  const filterBtnConvergence = document.getElementById('btn-filter-convergence');
  const filterBtnAdvanced = document.getElementById('btn-filter-advanced');
  const sideFilterButtons = [filterBtnAll, filterBtnConvergence, filterBtnAdvanced].filter(Boolean);

  function setCourseFilter(filterType) {
    currentCourseFilter = filterType || 'all';

    // 필터 버튼 활성화 클래스 및 접근성 속성 갱신
    if (filterBtnAll) {
      const isActive = currentCourseFilter === 'all';
      filterBtnAll.classList.toggle('active', isActive);
      filterBtnAll.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }
    if (filterBtnConvergence) {
      const isActive = currentCourseFilter === 'convergence';
      filterBtnConvergence.classList.toggle('active', isActive);
      filterBtnConvergence.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }
    if (filterBtnAdvanced) {
      const isActive = currentCourseFilter === 'advanced';
      filterBtnAdvanced.classList.toggle('active', isActive);
      filterBtnAdvanced.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    // 마우스 호버 화면 중앙 고정 디스플레이 닫기
    const centralDisplay = document.getElementById('project-central-display');
    if (centralDisplay) {
      centralDisplay.classList.remove('is-active');
    }

    // 카드 표시/숨김 및 부드러운 애니메이션
    projectCards.forEach(card => {
      const cardCourse = card.getAttribute('data-course');
      let shouldShow = false;

      if (currentCourseFilter === 'all') {
        shouldShow = true;
      } else if (currentCourseFilter === cardCourse) {
        shouldShow = true;
      }

      if (shouldShow) {
        card.classList.remove('is-filtered-out');
        card.classList.remove('is-animating-in');
        // 애니메이션 강제 재실행을 위한 reflow
        void card.offsetWidth;
        card.classList.add('is-animating-in');
      } else {
        card.classList.add('is-filtered-out');
        card.classList.remove('is-animating-in');
      }
    });
  }

  // 필터 버튼 클릭 이벤트 바인딩 (ALL / CONVERGENCE DESIGN / ADVANCED DESIGN)
  if (filterBtnAll) {
    filterBtnAll.addEventListener('click', (e) => {
      e.preventDefault();
      setCourseFilter('all');
    });
  }

  if (filterBtnConvergence) {
    filterBtnConvergence.addEventListener('click', (e) => {
      e.preventDefault();
      setCourseFilter('convergence');
    });
  }

  if (filterBtnAdvanced) {
    filterBtnAdvanced.addEventListener('click', (e) => {
      e.preventDefault();
      setCourseFilter('advanced');
    });
  }

  // 프로젝트 카드 클릭 시 상세페이지 열기 바인딩
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = card.getAttribute('data-project-id');
      if (projId) {
        const formattedId = projId.length === 1 ? '0' + projId : projId;
        openProjectDetail(formattedId, true);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const projId = card.getAttribute('data-project-id');
        if (projId) {
          const formattedId = projId.length === 1 ? '0' + projId : projId;
          openProjectDetail(formattedId, true);
        }
      }
    });
  });

  // ==========================================================================
  // [B] 디자이너 상세 페이지 렌더링 및 인터랙션
  // ==========================================================================
  const detailImg = document.getElementById('detail-profile-img');
  const detailNameKo = document.getElementById('detail-name-ko');
  const detailNameEn = document.getElementById('detail-name-en');
  const detailFields = document.getElementById('detail-fields');
  const detailEmail = document.getElementById('detail-email');
  const detailInstagram = document.getElementById('detail-instagram');
  const detailProjectsList = document.getElementById('detail-projects-list');

  const btnBackToDesigners = document.getElementById('btn-back-to-designers');
  const btnPrevDesigner = document.getElementById('btn-prev-designer');
  const btnNextDesigner = document.getElementById('btn-next-designer');

  function openDesignerDetail(designerId, updateHash = true) {
    if (typeof DESIGNERS_DATA === 'undefined') return;
    const data = DESIGNERS_DATA[designerId] || DESIGNERS_DATA['07'];
    if (!data) return;

    currentDesignerId = data.id;

    // 프로필 이미지 및 기본 메타 정보 업데이트
    if (detailImg) {
      detailImg.style.opacity = '0';
      detailImg.src = data.photo;
      detailImg.alt = `${data.nameKo} (${data.nameEn}) 프로필 이미지`;
      detailImg.onload = () => {
        detailImg.style.opacity = '1';
      };
    }

    if (detailNameKo) detailNameKo.innerText = data.nameKo;
    if (detailNameEn) detailNameEn.innerText = data.nameEn;
    if (detailFields) detailFields.innerText = data.fields;

    if (detailEmail) {
      detailEmail.innerText = data.email;
      detailEmail.href = `mailto:${data.email}`;
    }

    if (detailInstagram) {
      detailInstagram.innerText = data.instagram;
      const cleanHandle = data.instagram.replace('@', '');
      detailInstagram.href = `https://instagram.com/${cleanHandle}`;
    }

    // 하단 프로젝트 목록 렌더링 (아코디언 토글 시 설명 대신 이미지 노출 & 클릭 시 프로젝트 상세페이지 이동)
    if (detailProjectsList && Array.isArray(data.projects)) {
      detailProjectsList.innerHTML = '';
      data.projects.forEach((proj, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'profile-project-item';
        itemEl.setAttribute('data-proj-idx', idx);

        const targetProjId = proj.projectId || (idx === 0 ? '01' : '16');
        const projData = typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA[targetProjId] : null;
        const projectTitle = proj.title || (projData ? projData.title : 'PROJECT');
        const projectDesc = proj.desc || (projData ? projData.subtitle : '');
        const projectImage = proj.image || (projData ? projData.image : 'assets/poster-final.png');

        itemEl.innerHTML = `
          <div class="project-item-header" tabindex="0" role="button" aria-expanded="false" aria-label="${proj.num} ${projectTitle} 회색 박스 보기 토글">
            <span class="project-item-num">${proj.num}</span>
            <span class="project-item-title">${projectTitle}</span>
            <span class="project-item-desc">${projectDesc}</span>
            <span class="project-item-plus" aria-hidden="true">+</span>
          </div>
          <div class="project-item-body">
            <div class="project-media-link-wrapper" role="button" tabindex="0" data-project-id="${targetProjId}" aria-label="${projectTitle} 작품 상세페이지 보기">
              <div class="project-gray-frame">
                <div class="project-media-overlay">
                  <span class="media-overlay-badge font-brand-highlight">VIEW PROJECT →</span>
                </div>
              </div>
            </div>
          </div>
        `;

        // 1. 작품 이름(헤더) 클릭 시 아코디언 토글 (이미지 열기/닫기)
        const headerEl = itemEl.querySelector('.project-item-header');
        const toggleAccordion = () => {
          const isOpen = itemEl.classList.toggle('is-open');
          headerEl.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };

        headerEl.addEventListener('click', toggleAccordion);
        headerEl.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion();
          }
        });

        // 2. 나타난 이미지 클릭 시 해당 작품 상세페이지로 바로 연결
        const mediaLink = itemEl.querySelector('.project-media-link-wrapper');
        if (mediaLink) {
          const navigateToProject = (e) => {
            e.stopPropagation(); // 헤더 아코디언 토글 중복 트리거 방지
            const pid = mediaLink.getAttribute('data-project-id');
            if (pid) {
              const formattedId = pid.length === 1 ? '0' + pid : pid;
              openProjectDetail(formattedId, true);
            }
          };

          mediaLink.addEventListener('click', navigateToProject);
          mediaLink.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigateToProject(e);
            }
          });
        }

        detailProjectsList.appendChild(itemEl);
      });
    }

    // 뷰 전환
    switchView('designer-detail', updateHash);
  }

  // 이전/다음 디자이너 탐색
  function stepDesigner(direction) {
    const curIdx = designerIdList.indexOf(currentDesignerId);
    let targetIdx = curIdx + direction;
    if (targetIdx < 0) targetIdx = designerIdList.length - 1;
    if (targetIdx >= designerIdList.length) targetIdx = 0;
    const targetId = designerIdList[targetIdx];
    openDesignerDetail(targetId, true);
  }

  if (btnPrevDesigner) {
    btnPrevDesigner.addEventListener('click', () => stepDesigner(-1));
  }
  if (btnNextDesigner) {
    btnNextDesigner.addEventListener('click', () => stepDesigner(1));
  }

  // ALL DESIGNERS 뒤로가기 버튼
  if (btnBackToDesigners) {
    btnBackToDesigners.addEventListener('click', () => {
      switchView('designer', true);
    });
  }

  // 16개 디자이너 카드 클릭 시 해당 디자이너 상세페이지 열기
  const designerCards = document.querySelectorAll('.designer-wireframe-card');
  designerCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const designerId = card.getAttribute('data-designer-id');
      if (designerId) {
        openDesignerDetail(designerId, true);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const designerId = card.getAttribute('data-designer-id');
        if (designerId) {
          openDesignerDetail(designerId, true);
        }
      }
    });
  });

  // 네비게이션 버튼 이벤트 바인딩 (GNB)
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = btn.getAttribute('data-nav');
      if (target) {
        e.preventDefault();
        // 프로젝트 메뉴 클릭 시 처음 들어갔을 때는 모든 프로젝트가 다 보이도록 'all'로 초기화
        if (target === 'project') {
          setCourseFilter('all', true);
        }
        switchView(target, true);
      }
    });
  });

  // 스크롤 이벤트에 따른 우측 네비게이션 및 로고 축소 상태 업데이트
  window.addEventListener('scroll', updateFloatingNavOnScroll, { passive: true });

  // URL 해시 파싱 및 뷰 전환 핸들러
  function handleHashRouting() {
    const rawHash = window.location.hash.replace('#', '') || 'landing';
    
    // #designer/07 형태의 상세페이지 해시
    if (rawHash.startsWith('designer/') || rawHash.startsWith('designer-detail')) {
      const parts = rawHash.split('/');
      const id = parts[1] || '07';
      openDesignerDetail(id, false);
      return;
    }

    // #project/01 형태의 상세페이지 해시
    if (rawHash.startsWith('project/') || rawHash.startsWith('project-detail')) {
      const parts = rawHash.split('/');
      let id = parts[1] || '01';
      if (id.length === 1) id = '0' + id;
      openProjectDetail(id, false);
      return;
    }

    const validViews = ['landing', 'exhibition', 'project', 'designer', 'designer-detail', 'project-detail'];
    if (validViews.includes(rawHash)) {
      if (rawHash === 'designer-detail') {
        openDesignerDetail(currentDesignerId, false);
      } else if (rawHash === 'project-detail') {
        openProjectDetail(currentProjectId, false);
      } else {
        switchView(rawHash, false);
      }
    } else {
      switchView('landing', false);
    }
  }

  // URL 해시 변경 감지 (브라우저 뒤로가기 / 앞으로가기 완벽 지원)
  window.addEventListener('hashchange', handleHashRouting);

  // 초기 로드 시 라우팅 실행
  handleHashRouting();

  // 2. 에디토리얼 블랙 / 화이트 테마 전환 시스템 (기본: 화이트)
  const themeBtnBlack = document.getElementById('theme-btn-black');
  const themeBtnWhite = document.getElementById('theme-btn-white');
  const SAVED_THEME_KEY = 'ic_selected_theme';
  let themeSwitchTimer = null;

  function applyTheme(themeName, isInitial = false) {
    const isDark = themeName === 'dark';
    const currentIsDark = document.body.classList.contains('theme-dark');

    // 이미 동일한 테마가 적용되어 있는 경우 재실행 방지 (초기화 제외)
    if (!isInitial && currentIsDark === isDark) {
      return;
    }

    // 클릭 시 배경과 모든 요소(글자, 버튼, 보더, 필터 등)의 전환 속도를 100% 동일하게 동기화
    if (!isInitial) {
      document.documentElement.classList.add('is-theme-switching');
      document.body.classList.add('is-theme-switching');

      if (themeSwitchTimer) {
        clearTimeout(themeSwitchTimer);
      }
      themeSwitchTimer = setTimeout(() => {
        document.documentElement.classList.remove('is-theme-switching');
        document.body.classList.remove('is-theme-switching');
      }, 430);
    }

    document.body.classList.toggle('theme-dark', isDark);
    document.documentElement.classList.toggle('theme-dark', isDark);

    if (themeBtnBlack && themeBtnWhite) {
      themeBtnBlack.classList.toggle('active', isDark);
      themeBtnBlack.setAttribute('aria-pressed', isDark ? 'true' : 'false');

      themeBtnWhite.classList.toggle('active', !isDark);
      themeBtnWhite.setAttribute('aria-pressed', !isDark ? 'true' : 'false');
    }

    try {
      localStorage.setItem(SAVED_THEME_KEY, isDark ? 'dark' : 'white');
    } catch (e) {
      // 로컬스토리지 접근 제한 시 무시
    }
  }

  // 초기 테마 설정 (화이트버전이 기본)
  let initialTheme = 'white';
  try {
    initialTheme = localStorage.getItem(SAVED_THEME_KEY) || 'white';
  } catch (e) {
    initialTheme = 'white';
  }

  // 초기 렌더링 깜빡임 방지: 로드 시 트랜지션을 잠시 끄고 테마 적용
  document.body.classList.add('theme-no-transition');
  applyTheme(initialTheme, true);
  // 다음 프레임에서 트랜지션 복원하여 클릭 시 부드러운 테마 전환 활성화
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.classList.remove('theme-no-transition');
    }, 60);
  });

  if (themeBtnBlack) {
    themeBtnBlack.addEventListener('click', () => {
      applyTheme('dark');
    });
  }
  if (themeBtnWhite) {
    themeBtnWhite.addEventListener('click', () => {
      applyTheme('white');
    });
  }

  // 3. 1번 이미지 우측 하단 스위치 인터랙션 (EMBER MODE)
  const heroSwitch = document.getElementById('hero-custom-switch');
  const heroGraphicImg = document.getElementById('hero-graphic-img');

  if (heroSwitch) {
    heroSwitch.addEventListener('click', () => {
      const isOn = heroSwitch.classList.toggle('on');
      heroSwitch.setAttribute('aria-checked', isOn ? 'true' : 'false');

      if (heroGraphicImg) {
        if (isOn) {
          heroGraphicImg.style.filter = 'drop-shadow(0 0 1px rgba(232, 2, 2, 0.4))';
          heroGraphicImg.style.opacity = '1';
        } else {
          heroGraphicImg.style.filter = 'grayscale(100%) brightness(0.9)';
          heroGraphicImg.style.opacity = '0.75';
        }
      }
    });
  }

  // 4. 프로젝트 카드 호버 시 화면 중앙 고정 텍스트 디스플레이
  const centralDisplay = document.getElementById('project-central-display');
  const centralTitle = document.getElementById('central-project-title');
  const centralDesigner = document.getElementById('central-project-designer');
  const projectGrid = document.getElementById('project-card-grid');

  if (centralDisplay && centralTitle && centralDesigner) {
    projectCards.forEach(card => {
      const title = card.getAttribute('data-title') || card.querySelector('.overlay-title')?.innerText || '';
      const designerEn = card.getAttribute('data-designer-en') || card.querySelector('.overlay-designer')?.innerText || '';

      card.addEventListener('mouseenter', () => {
        centralTitle.innerText = title;
        centralDesigner.innerText = designerEn;
        centralDisplay.classList.add('is-active');
      });

      card.addEventListener('mouseleave', () => {
        centralDisplay.classList.remove('is-active');
      });
    });

    if (projectGrid) {
      projectGrid.addEventListener('mouseleave', () => {
        centralDisplay.classList.remove('is-active');
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#view-project .project-wireframe-card')) {
        centralDisplay.classList.remove('is-active');
      }
    });
  }

  // ESC 키 누를 때 모든 정보 오버레이 및 열린 아코디언 닫기
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (centralDisplay) centralDisplay.classList.remove('is-active');
      designerCards.forEach(c => c.classList.remove('is-revealed'));
      document.querySelectorAll('.profile-project-item.is-open').forEach(item => {
        item.classList.remove('is-open');
        item.querySelector('.project-item-header')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 6. 커스텀 원형 마우스 커서 컨트롤러
  const customCursor = document.getElementById('custom-cursor');
  if (customCursor) {
    let hasMoved = false;

    window.addEventListener('mousemove', (e) => {
      customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!hasMoved) {
        hasMoved = true;
        customCursor.classList.add('is-visible');
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      customCursor.classList.remove('is-visible');
    });

    document.addEventListener('mouseenter', () => {
      if (hasMoved) {
        customCursor.classList.add('is-visible');
      }
    });

    window.addEventListener('mousedown', () => {
      customCursor.classList.add('is-clicked');
    });

    window.addEventListener('mouseup', () => {
      customCursor.classList.remove('is-clicked');
    });

    // 인터랙티브 요소 호버 감지
    const interactiveElements = 'a, button, [role="button"], input, textarea, select, label, .project-wireframe-card, .designer-wireframe-card, .profile-project-item, .project-item-header, .detail-back-btn, .detail-pager-btn, .nav-item-btn, .hero-custom-switch, .modal-close-btn, .slider-arrow-overlay, .slider-arrow-btn, .slider-dot';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveElements)) {
        customCursor.classList.add('is-hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveElements)) {
        customCursor.classList.remove('is-hovering');
      }
    });
  }

  // 7. 전시사진 가로 슬라이더 (10장 캐러셀 컨트롤러 & 좌/우 클릭 영역 인터랙션)
  const photoTrack = document.getElementById('photos-carousel-track');
  const prevClickZone = document.getElementById('photo-click-prev');
  const nextClickZone = document.getElementById('photo-click-next');
  const currentNumEl = document.getElementById('photo-current-num');
  const dots = document.querySelectorAll('#photos-slider-dots .slider-dot');
  const slides = document.querySelectorAll('.photo-slide-item');

  if (photoTrack && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSliderState(index) {
      currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
      if (currentNumEl) {
        currentNumEl.textContent = String(currentIndex + 1).padStart(2, '0');
      }
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function scrollToIndex(index) {
      let targetIndex = index;
      if (targetIndex < 0) targetIndex = totalSlides - 1;
      if (targetIndex >= totalSlides) targetIndex = 0;

      const targetSlide = slides[targetIndex];
      if (targetSlide) {
        photoTrack.scrollTo({
          left: targetSlide.offsetLeft,
          behavior: 'smooth'
        });
        updateSliderState(targetIndex);
      }
    }

    // 좌측 클릭 시 이전 이미지로 이동
    if (prevClickZone) {
      prevClickZone.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToIndex(currentIndex - 1);
      });
    }

    // 우측 클릭 시 다음 이미지로 이동
    if (nextClickZone) {
      nextClickZone.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToIndex(currentIndex + 1);
      });
    }

    // 닷 클릭 시 해당 이미지로 이동
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToIndex(idx);
      });
    });

    // 스크롤 시 현재 슬라이드 인덱스 동기화
    let scrollTimeout;
    photoTrack.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = photoTrack.scrollLeft;
        const trackWidth = photoTrack.clientWidth;
        if (trackWidth > 0) {
          const estimatedIndex = Math.round(scrollLeft / trackWidth);
          updateSliderState(estimatedIndex);
        }
      }, 50);
    }, { passive: true });
  }

  // ==========================================================================
  // 랜딩페이지 16개 디자이너 실제 붉은 벡터 패스 인터랙션 시스템
  // ==========================================================================
  function initLandingHeroSpots() {
    const spotsOverlay = document.getElementById('hero-spots-overlay');
    const tooltip = document.getElementById('hero-designer-tooltip');
    const tooltipNameKo = document.getElementById('tooltip-name-ko');
    const tooltipNameEn = document.getElementById('tooltip-name-en');

    if (!spotsOverlay || typeof HERO_SPOTS_DATA === 'undefined') return;

    spotsOverlay.innerHTML = '';
    const svgNS = 'http://www.w3.org/2000/svg';

    // 원본 SVG의 좌표계(Y축 반전)와 100% 동일하게 일치시키는 루트 그룹
    const rootTransformG = document.createElementNS(svgNS, 'g');
    rootTransformG.setAttribute('transform', 'matrix(1 0 0 -1 0 2363.110352)');

    HERO_SPOTS_DATA.forEach((spot) => {
      const groupEl = document.createElementNS(svgNS, 'g');
      groupEl.setAttribute('class', 'hero-designer-spot');
      groupEl.setAttribute('data-designer-id', spot.designerId);
      groupEl.setAttribute('data-name-ko', spot.nameKo);
      groupEl.setAttribute('data-name-en', spot.nameEn);
      groupEl.setAttribute('tabindex', '0');
      groupEl.setAttribute('role', 'button');
      groupEl.setAttribute('aria-label', `디자이너 ${spot.nameKo} (${spot.nameEn}) 프로필 보기`);
      groupEl.style.transformOrigin = `${spot.localX}px ${spot.localY}px`;

      // 1. 주변까지 넓게 인식되도록 투명 히트 영역 (반경 65px)
      const hitCircle = document.createElementNS(svgNS, 'circle');
      hitCircle.setAttribute('cx', spot.localX);
      hitCircle.setAttribute('cy', spot.localY);
      hitCircle.setAttribute('r', '65');
      hitCircle.setAttribute('class', 'spot-hit-area');
      hitCircle.setAttribute('fill', 'transparent');
      groupEl.appendChild(hitCircle);

      // 2. 벡터 파일의 정확한 빨간색 패스 자체 주입
      const pathsWrap = document.createElementNS(svgNS, 'g');
      pathsWrap.setAttribute('class', 'spot-paths-wrap');
      pathsWrap.innerHTML = spot.paths.join('');
      groupEl.appendChild(pathsWrap);

      // 마우스 호버 이벤트: 배경/번호 없이 커서 옆에 디자이너 이름만 노출
      groupEl.addEventListener('mouseenter', (e) => {
        if (tooltip && tooltipNameKo) {
          tooltipNameKo.textContent = spot.nameKo;
          if (tooltipNameEn) tooltipNameEn.textContent = spot.nameEn;
          tooltip.classList.add('is-active');
          updateHoverPosition(e.clientX, e.clientY);
        }
      });

      groupEl.addEventListener('mousemove', (e) => {
        updateHoverPosition(e.clientX, e.clientY);
      });

      groupEl.addEventListener('mouseleave', () => {
        if (tooltip) {
          tooltip.classList.remove('is-active');
        }
      });

      // 키보드 탭 포커스 접근성 지원
      groupEl.addEventListener('focus', () => {
        if (tooltip && tooltipNameKo) {
          tooltipNameKo.textContent = spot.nameKo;
          if (tooltipNameEn) tooltipNameEn.textContent = spot.nameEn;
          const rect = groupEl.getBoundingClientRect();
          updateHoverPosition(rect.left + rect.width / 2, rect.top + rect.height / 2);
          tooltip.classList.add('is-active');
        }
      });

      groupEl.addEventListener('blur', () => {
        if (tooltip) {
          tooltip.classList.remove('is-active');
        }
      });

      // 클릭 시 해당 디자이너 상세페이지로 즉각 연결
      const navigateToDesigner = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (tooltip) tooltip.classList.remove('is-active');
        openDesignerDetail(spot.designerId, true);
      };

      groupEl.addEventListener('click', navigateToDesigner);
      groupEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigateToDesigner(e);
        }
      });

      rootTransformG.appendChild(groupEl);
    });

    spotsOverlay.appendChild(rootTransformG);

    // 마우스 커서 옆 디자이너 이름 위치 추종
    function updateHoverPosition(clientX, clientY) {
      if (!tooltip) return;
      // 화면 우측 경계에 인접할 경우 왼쪽으로 표시
      const screenWidth = window.innerWidth;
      const isNearRight = clientX > screenWidth - 180;

      if (isNearRight) {
        tooltip.style.left = `${clientX - 16}px`;
        tooltip.style.transform = 'translate(-100%, 14px)';
      } else {
        tooltip.style.left = `${clientX}px`;
        tooltip.style.transform = 'translate(18px, 14px)';
      }
      tooltip.style.top = `${clientY}px`;
    }
  }

  // 16개 디자이너 불씨 핫스팟 초기화 실행
  initLandingHeroSpots();
});

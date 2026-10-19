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

  // 이전/다음 프로젝트 이동
  function stepProject(direction) {
    const curIdx = projectIdList.indexOf(currentProjectId);
    let targetIdx = curIdx + direction;
    if (targetIdx < 0) targetIdx = projectIdList.length - 1;
    if (targetIdx >= projectIdList.length) targetIdx = 0;
    const targetId = projectIdList[targetIdx];
    openProjectDetail(targetId, true);
  }

  if (btnPrevProject) {
    btnPrevProject.addEventListener('click', () => stepProject(-1));
  }
  if (btnNextProject) {
    btnNextProject.addEventListener('click', () => stepProject(1));
  }

  // ALL PROJECTS 목록으로 돌아가기 버튼
  if (btnBackToProjects) {
    btnBackToProjects.addEventListener('click', () => {
      switchView('project', true);
    });
  }

  // 프로젝트 카드 클릭 시 상세페이지 열기 바인딩
  const projectCards = document.querySelectorAll('#view-project .project-wireframe-card');
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

    // 하단 프로젝트 목록 렌더링
    if (detailProjectsList && Array.isArray(data.projects)) {
      detailProjectsList.innerHTML = '';
      data.projects.forEach((proj, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'profile-project-item';
        itemEl.setAttribute('data-proj-idx', idx);

        itemEl.innerHTML = `
          <div class="project-item-header" tabindex="0" role="button" aria-expanded="false" aria-label="${proj.num} ${proj.title} 상세 보기 토글">
            <span class="project-item-num">${proj.num}</span>
            <span class="project-item-title">${proj.title}</span>
            <span class="project-item-desc">${proj.desc}</span>
            <span class="project-item-plus" aria-hidden="true">+</span>
          </div>
          <div class="project-item-body">
            <div class="project-body-inner">
              <p>${proj.details || proj.desc}</p>
            </div>
          </div>
        `;

        // 아코디언 토글 인터랙션
        const headerEl = itemEl.querySelector('.project-item-header');
        headerEl.addEventListener('click', () => {
          const isOpen = itemEl.classList.toggle('is-open');
          headerEl.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // 키보드 접근성 (Enter/Space 지원)
        headerEl.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isOpen = itemEl.classList.toggle('is-open');
            headerEl.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          }
        });

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

  // 2. 블랙 / 화이트 테마 전환 시스템 (기본: 화이트, 토글 시 배경 #121212 & 화이트 텍스트)
  const themeToggleBtn = document.getElementById('btn-toggle-theme');
  const themeToggleLabel = document.getElementById('theme-toggle-label');
  const SAVED_THEME_KEY = 'ic_selected_theme';

  function applyTheme(themeName) {
    const isDark = themeName === 'dark';
    document.body.classList.toggle('theme-dark', isDark);
    document.documentElement.classList.toggle('theme-dark', isDark);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-checked', isDark ? 'true' : 'false');
    }
    if (themeToggleLabel) {
      themeToggleLabel.textContent = isDark ? 'BLACK' : 'WHITE';
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
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('theme-dark');
      applyTheme(isCurrentlyDark ? 'white' : 'dark');
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
});

(function () {
  /* ── 전체 폰트 목록 (slug | name_ko | name_en | icon | category) ── */
  var FONTS = [
    /* ── 한글 고딕 ── */
    { s:'nanum-gothic',         ko:'나눔고딕',           en:'Nanum Gothic',           i:'🟢', c:'gothic' },
    { s:'noto-sans-kr',         ko:'Noto Sans KR',       en:'Noto Sans KR',           i:'🌏', c:'gothic' },
    { s:'pretendard',           ko:'Pretendard',         en:'Pretendard',             i:'⚡', c:'gothic' },
    { s:'spoqa-han-sans',       ko:'스포카 한 산스',      en:'Spoqa Han Sans',         i:'🎯', c:'gothic' },
    { s:'kopub-dotum',          ko:'KoPub 돋움',          en:'KoPub Dotum',            i:'📚', c:'gothic' },
    { s:'nanum-square',         ko:'나눔스퀘어',          en:'NanumSquare',            i:'✏️', c:'gothic' },
    { s:'gmarket-sans',         ko:'지마켓 산스',         en:'GmarketSans',            i:'🛒', c:'gothic' },
    { s:'suit',                 ko:'SUIT',               en:'SUIT',                   i:'🎯', c:'gothic' },
    { s:'nanum-barun-gothic',   ko:'나눔바른고딕',        en:'Nanum Barun Gothic',     i:'🍀', c:'gothic' },
    { s:'nanum-square-round',   ko:'나눔스퀘어라운드',    en:'NanumSquareRound',       i:'🔵', c:'gothic' },
    { s:'ibm-plex-sans-kr',     ko:'IBM Plex Sans KR',   en:'IBM Plex Sans KR',       i:'🔷', c:'gothic' },
    { s:'jeju-gothic',          ko:'제주고딕',            en:'Jeju Gothic',            i:'🌊', c:'gothic' },
    { s:'wanted-sans',          ko:'Wanted Sans',         en:'Wanted Sans',            i:'💙', c:'gothic' },
    { s:'score-dream',          ko:'에스코어 드림',       en:'S-Core Dream',           i:'💎', c:'gothic' },
    /* ── 한글 명조/세리프 ── */
    { s:'nanum-myeongjo',            ko:'나눔명조',             en:'Nanum Myeongjo',          i:'📰', c:'serif-ko' },
    { s:'noto-serif-kr',             ko:'Noto Serif KR',        en:'Noto Serif KR',           i:'🌏', c:'serif-ko' },
    { s:'kopub-batang',              ko:'KoPub 바탕',            en:'KoPub Batang',            i:'📖', c:'serif-ko' },
    { s:'nanum-myeongjo-extrabold',  ko:'나눔명조 ExtraBold',   en:'Nanum Myeongjo ExtraBold',i:'🏛️',c:'serif-ko' },
    { s:'pretendard-jp',             ko:'Pretendard JP',        en:'Pretendard JP',           i:'💎', c:'serif-ko' },
    { s:'gowun-batang',              ko:'고운바탕',              en:'Gowun Batang',            i:'🌸', c:'serif-ko' },
    { s:'jeju-myeongjo',             ko:'제주명조',              en:'Jeju Myeongjo',           i:'🌺', c:'serif-ko' },
    { s:'maru-buri',                 ko:'마루 부리',             en:'Maru Buri',               i:'🌸', c:'serif-ko' },
    /* ── 영문 산세리프 ── */
    { s:'inter',                ko:'Inter',               en:'Inter',                  i:'🖥️', c:'en-sans' },
    { s:'roboto',               ko:'Roboto',              en:'Roboto',                 i:'🤖', c:'en-sans' },
    { s:'poppins',              ko:'Poppins',             en:'Poppins',                i:'✨', c:'en-sans' },
    { s:'montserrat',           ko:'Montserrat',          en:'Montserrat',             i:'🏙️', c:'en-sans' },
    { s:'dm-sans',              ko:'DM Sans',             en:'DM Sans',                i:'💫', c:'en-sans' },
    { s:'plus-jakarta-sans',    ko:'Plus Jakarta Sans',   en:'Plus Jakarta Sans',      i:'🌟', c:'en-sans' },
    { s:'geist',                ko:'Geist',               en:'Geist',                  i:'▲',  c:'en-sans' },
    { s:'space-grotesk',        ko:'Space Grotesk',       en:'Space Grotesk',          i:'🚀', c:'en-sans' },
    { s:'outfit',               ko:'Outfit',              en:'Outfit',                 i:'✨', c:'en-sans' },
    { s:'manrope',              ko:'Manrope',             en:'Manrope',                i:'🌿', c:'en-sans' },
    { s:'work-sans',            ko:'Work Sans',           en:'Work Sans',              i:'💼', c:'en-sans' },
    { s:'figtree',              ko:'Figtree',             en:'Figtree',                i:'🌱', c:'en-sans' },
    { s:'bricolage-grotesque',  ko:'Bricolage Grotesque', en:'Bricolage Grotesque',    i:'🔩', c:'en-sans' },
    { s:'lexend',               ko:'Lexend',              en:'Lexend',                 i:'📖', c:'en-sans' },
    { s:'instrument-sans',      ko:'Instrument Sans',     en:'Instrument Sans',        i:'🎼', c:'en-sans' },
    { s:'cabinet-grotesk',      ko:'Cabinet Grotesk',     en:'Cabinet Grotesk',        i:'🗄️', c:'en-sans' },
    /* ── 영문 세리프 ── */
    { s:'playfair-display',     ko:'Playfair Display',    en:'Playfair Display',       i:'🎭', c:'en-serif' },
    { s:'lora',                 ko:'Lora',                en:'Lora',                   i:'🌿', c:'en-serif' },
    { s:'merriweather',         ko:'Merriweather',        en:'Merriweather',           i:'📰', c:'en-serif' },
    { s:'eb-garamond',          ko:'EB Garamond',         en:'EB Garamond',            i:'🏛️', c:'en-serif' },
    { s:'libre-baskerville',    ko:'Libre Baskerville',   en:'Libre Baskerville',      i:'📚', c:'en-serif' },
    { s:'crimson-pro',          ko:'Crimson Pro',         en:'Crimson Pro',            i:'🍷', c:'en-serif' },
    { s:'cormorant-garamond',   ko:'Cormorant Garamond',  en:'Cormorant Garamond',     i:'👑', c:'en-serif' },
    { s:'source-serif-4',       ko:'Source Serif 4',      en:'Source Serif 4',         i:'📰', c:'en-serif' },
    { s:'fraunces',             ko:'Fraunces',            en:'Fraunces',               i:'🎩', c:'en-serif' },
    /* ── 디스플레이/특수 ── */
    { s:'archivo-black',        ko:'Archivo Black',       en:'Archivo Black',          i:'💪', c:'display' },
    { s:'oswald',               ko:'Oswald',              en:'Oswald',                 i:'🏗️', c:'display' },
    { s:'raleway',              ko:'Raleway',             en:'Raleway',                i:'🎨', c:'display' },
    { s:'nunito',               ko:'Nunito',              en:'Nunito',                 i:'🌈', c:'display' },
    { s:'quicksand',            ko:'Quicksand',           en:'Quicksand',              i:'💨', c:'display' },
    { s:'comfortaa',            ko:'Comfortaa',           en:'Comfortaa',              i:'🛋️', c:'display' },
    { s:'black-han-sans',       ko:'Black Han Sans',      en:'Black Han Sans',         i:'💥', c:'display' },
    { s:'nanum-brush-script',   ko:'나눔붓글씨체',        en:'Nanum Brush Script',     i:'🖌️', c:'display' },
    { s:'bebas-neue',           ko:'Bebas Neue',          en:'Bebas Neue',             i:'🏋️', c:'display' },
    { s:'anton',                ko:'Anton',               en:'Anton',                  i:'⚡', c:'display' },
    { s:'dancing-script',       ko:'Dancing Script',      en:'Dancing Script',         i:'💃', c:'display' },
    { s:'pacifico',             ko:'Pacifico',            en:'Pacifico',               i:'🌊', c:'display' },
    { s:'nanum-handwriting',    ko:'나눔손글씨 시리즈',   en:'Nanum Handwriting',      i:'✍️', c:'display' },
    { s:'cafe24-series',        ko:'카페24 시리즈',        en:'Cafe24 Series',          i:'☕', c:'display' },
    { s:'syne',                 ko:'Syne',                en:'Syne',                   i:'🎨', c:'display' },
  ];

  /* ── 현재 폰트 slug 감지 ── */
  var slug = window.location.pathname.replace(/.*\/fonts\//, '').replace(/\.html.*$/, '');
  var isEn = window.location.pathname.indexOf('/en/') !== -1;

  var current = null;
  for (var i = 0; i < FONTS.length; i++) {
    if (FONTS[i].s === slug) { current = FONTS[i]; break; }
  }
  if (!current) return;

  /* ── 같은 카테고리 폰트 중 현재 제외, 무작위 4개 ── */
  var pool = FONTS.filter(function (f) { return f.c === current.c && f.s !== slug; });
  pool.sort(function () { return Math.random() - 0.5; });
  var picks = pool.slice(0, 4);
  if (!picks.length) return;

  /* ── 스타일 ── */
  var accent = '#EC4899';
  var style = document.createElement('style');
  style.textContent =
    '.fk-related{margin:28px 0 8px;}' +
    '.fk-related-heading{font-size:1rem;font-weight:700;margin:0 0 14px;color:#1F2937;padding-bottom:8px;border-bottom:2px solid ' + accent + ';}' +
    '.fk-related-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}' +
    '@media(max-width:600px){.fk-related-grid{grid-template-columns:repeat(2,1fr);}}' +
    '.fk-font-card{background:#F9FAFB;border:1px solid #E5E7EB;border-radius:10px;padding:14px 10px;text-decoration:none;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;position:relative;overflow:hidden;transition:border-color .2s,transform .2s;}' +
    '.fk-font-card::before{content:\'\';position:absolute;top:0;left:0;right:0;height:3px;background:' + accent + ';}' +
    '.fk-font-card:hover{border-color:' + accent + ';transform:translateY(-2px);}' +
    '.fk-font-icon{font-size:1.4rem;line-height:1;}' +
    '.fk-font-name{font-size:.82rem;font-weight:700;color:' + accent + ';line-height:1.3;word-break:keep-all;}';
  document.head.appendChild(style);

  /* ── 카드 HTML ── */
  var cards = picks.map(function (f) {
    var name = isEn ? f.en : f.ko;
    return '<a href="' + f.s + '.html" class="fk-font-card">' +
      '<span class="fk-font-icon">' + f.i + '</span>' +
      '<span class="fk-font-name">' + name + '</span>' +
      '</a>';
  }).join('');

  var heading = isEn
    ? '🔤 Related Fonts — You Might Also Like'
    : '🔤 함께 쓰면 좋은 폰트';

  /* ── 섹션 DOM 삽입 ── */
  var wrap = document.createElement('div');
  wrap.className = 'fk-related';
  wrap.innerHTML = '<h2 class="fk-related-heading">' + heading + '</h2>' +
    '<div class="fk-related-grid">' + cards + '</div>';

  var anchor = document.querySelector('.wooa-orig-anchor');
  if (anchor) {
    anchor.parentNode.insertBefore(wrap, anchor);
  } else {
    var footer = document.querySelector('footer');
    if (footer) footer.parentNode.insertBefore(wrap, footer);
    else document.body.appendChild(wrap);
  }
})();

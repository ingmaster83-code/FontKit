"""
WooaFont KO 페이지 메타 디스크립션 CTR 최적화
- 기준: 네이버 서치어드바이저 노출 대비 CTR 개선
- index.html: 상업용 무료폰트(152) · 상업용폰트(88) · 무료 한글 폰트(53) 등 700+ 노출
- fonts/: poppins(72) · inter(46) · montserrat(77) 등 개별 폰트 검색
- 전략:
    index → "상업용 무료 한글·영문 폰트" 키워드 선행 + 폰트 수 수치화
    fonts → "[Font] 폰트 무료 다운로드 —" 형식으로 검색어 일치 강화
              라이선스 끝 문구 → "상업용 무료, 웹폰트 CSS 사용법 포함"
"""
import re, os, glob

BASE = 'C:/개인/wooahouse/FontKit'

# ── 1) index.html ─────────────────────────────────────────────────────
INDEX_DESC_OLD = '무료로 사용할 수 있는 상업용 한글·영문 폰트 모음'
INDEX_DESC_NEW = (
    '상업용 무료 한글·영문 폰트 모음 — Pretendard·Noto Sans·Inter·Poppins 등 55종. '
    '한글 무료폰트·무료 영문 폰트 모두 수록, 저작권 걱정 없이 상업 이용 가능. 우아폰트(WooaFont)'
)

# ── 2) fonts/*.html 공통 패턴 ──────────────────────────────────────────
# Before: "[Font] 무료 상업용 폰트 다운로드. [특징]. 라이선스: OFL. 다운로드 방법과 웹폰트 CSS 사용법 안내."
# After:  "[Font] 폰트 무료 다운로드 — [특징]. OFL 라이선스 (상업용 무료), 웹폰트 CSS 사용법 포함."
#
# 바뀌는 부분:
#   "무료 상업용 폰트 다운로드." → "폰트 무료 다운로드 —"
#   끝 패턴들 → "OFL 라이선스 (상업용 무료), 웹폰트 CSS 사용법 포함."

TAIL_PATTERNS = [
    # (찾을 패턴, 바꿀 텍스트)  — 순서 중요 (긴 것 먼저)
    ('라이선스: OFL (오픈 폰트 라이선스). 다운로드 방법과 웹폰트 CSS 사용법 안내.',
     'OFL 라이선스 (상업용 무료), 웹폰트 CSS 사용법 포함.'),
    ('라이선스: OFL (오픈 폰트 라이선스). 웹폰트 CSS 사용법 안내.',
     'OFL 라이선스 (상업용 무료), 웹폰트 CSS 사용법 포함.'),
    ('라이선스: Apache 2.0 라이선스. 다운로드 방법과 웹폰트 CSS 사용법 안내.',
     'Apache 2.0 라이선스 (상업용 무료), 웹폰트 CSS 사용법 포함.'),
    ('라이선스: KoPub 전자출판 폰트 라이선스 (상업용 무료). 다운로드 방법과 웹폰트 CSS 사용법 안내.',
     'KoPub 라이선스 (상업용 무료), 웹폰트 CSS 사용법 포함.'),
    ('라이선스: 공개 라이선스 (상업용 무료). 다운로드 방법과 웹폰트 CSS 사용법 안내.',
     '공개 라이선스 (상업용 무료), 웹폰트 CSS 사용법 포함.'),
    ('라이선스: 공개 라이선스 (상업용 무료). 웹폰트 CSS 사용법 안내.',
     '공개 라이선스 (상업용 무료), 웹폰트 CSS 사용법 포함.'),
]


def update_desc(content, old_val, new_val):
    """meta name="description" content 값 교체"""
    pattern = r'(<meta name="description" content=")[^"]*(")'
    def replacer(m):
        if old_val in m.group(0):
            return m.group(1) + new_val + m.group(2)
        return m.group(0)
    return re.sub(pattern, replacer, content)


def sync_og_twitter(content, new_val):
    """og:description / twitter:description 동기화"""
    content = re.sub(
        r'(<meta property="og:description" content=")[^"]*(")',
        lambda x: x.group(1) + new_val + x.group(2),
        content
    )
    content = re.sub(
        r'(<meta name="twitter:description" content=")[^"]*(")',
        lambda x: x.group(1) + new_val + x.group(2),
        content
    )
    return content


ok = 0
miss = 0

# ── index.html ──────────────────────────────────────────────────────────
idx_path = os.path.join(BASE, 'index.html')
with open(idx_path, 'r', encoding='utf-8') as f:
    c = f.read()

c2 = update_desc(c, INDEX_DESC_OLD, INDEX_DESC_NEW)
if c2 == c:
    print(f'  MISS: index.html')
    miss += 1
else:
    c2 = sync_og_twitter(c2, INDEX_DESC_NEW)
    with open(idx_path, 'w', encoding='utf-8') as f:
        f.write(c2)
    print(f'  OK: index.html')
    ok += 1

# ── fonts/*.html ────────────────────────────────────────────────────────
font_files = sorted(glob.glob(os.path.join(BASE, 'fonts', '*.html')))
for fpath in font_files:
    fname = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8') as f:
        c = f.read()

    # 현재 description 값 추출
    m = re.search(r'<meta name="description" content="([^"]+)"', c)
    if not m:
        print(f'  SKIP (desc 없음): fonts/{fname}')
        continue

    old_desc = m.group(1)

    # Step1: "무료 상업용 폰트 다운로드." → "폰트 무료 다운로드 —"
    new_desc = old_desc.replace('무료 상업용 폰트 다운로드.', '폰트 무료 다운로드 —', 1)

    # Step2: 라이선스 끝 문구 교체
    for tail_old, tail_new in TAIL_PATTERNS:
        if tail_old in new_desc:
            new_desc = new_desc.replace(tail_old, tail_new, 1)
            break

    if new_desc == old_desc:
        print(f'  MISS: fonts/{fname}')
        miss += 1
        continue

    # 교체 적용
    c2 = c.replace(
        f'<meta name="description" content="{old_desc}"',
        f'<meta name="description" content="{new_desc}"',
        1
    )
    c2 = sync_og_twitter(c2, new_desc)

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(c2)
    print(f'  OK: fonts/{fname}')
    ok += 1

print(f'\n완료: {ok}개 교체, {miss}개 실패')

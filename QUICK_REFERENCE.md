# 🎨 태그 색상 빠른 참조 가이드

## 📍 색상 설정 파일 위치
`/src/utils/tagColors.js`

## ✨ 새 태그 추가하는 법 (3단계)

### 1️⃣ 색상 설정 파일 열기
```bash
vim src/utils/tagColors.js
# 또는
code src/utils/tagColors.js
```

### 2️⃣ 태그와 색상 추가
```javascript
export const tagColors = {
  AI: "#FF6B6B",
  DB: "#4ECDC4",
  // ... 기존 태그들
  
  // 👇 여기에 새 태그 추가
  "새태그": "#색상코드",
}
```

### 3️⃣ 마크다운 파일에서 사용
```markdown
---
title: "포스트 제목"
tags: ["새태그", "AI"]
---
```

## 🎨 현재 태그 색상 코드

```javascript
AI           → #FF6B6B  (빨간색)
DB           → #4ECDC4  (청록색)
Flutter      → #02569B  (파란색)
멋쟁이사자처럼 → #FF7710  (주황색)
회고         → #95E1D3  (민트색)
인턴         → #F38181  (핑크색)
카카오뱅크    → #FFE300  (노란색)
네이버랩스    → #03C75A  (초록색)
기본값       → #6C757D  (회색)
```

## 💡 유용한 색상 코드 예시

### 기술/프레임워크
```javascript
React:        "#61DAFB"  // 하늘색
Vue:          "#42B883"  // 초록색
Angular:      "#DD0031"  // 빨간색
Python:       "#3776AB"  // 파란색
JavaScript:   "#F7DF1E"  // 노란색
TypeScript:   "#3178C6"  // 파란색
Java:         "#007396"  // 파란색
Kotlin:       "#7F52FF"  // 보라색
Swift:        "#FA7343"  // 주황색
```

### 카테고리별
```javascript
// 따뜻한 색상
"프로젝트":  "#FF6B6B"  // 빨간색
"튜토리얼":  "#FF8C42"  // 주황색
"팁":       "#FFD93D"  // 노란색

// 차가운 색상
"개발":     "#4ECDC4"  // 청록색
"데이터":   "#5B8C5A"  // 초록색
"알고리즘": "#3D5A80"  // 남색

// 중립 색상
"일반":     "#6C757D"  // 회색
"기타":     "#95A5A6"  // 연회색
```

## 🔍 테스트하기

1. 서버 실행: `NODE_ENV=development npm run develop`
2. 브라우저에서: `http://localhost:8000`
3. 홈 화면에서 태그 필터 확인
4. 포스트 카드에서 태그 색상 확인

## 📚 더 많은 정보

- 자세한 가이드: `TAG_COLORS_GUIDE.md`
- 구현 상세: `IMPLEMENTATION_SUMMARY.md`

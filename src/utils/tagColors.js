// 태그별 색상 설정
// 새로운 태그를 추가할 때 여기에 색상을 정의하세요
export const tagColors = {
  AI: "#FF6B6B", // 빨간색
  DB: "#4ECDC4", // 청록색
  Flutter: "#02569B", // Flutter 파란색
  멋쟁이사자처럼: "#FF7710", // 주황색
  회고: "#95E1D3", // 민트색
  인턴: "#F38181", // 핑크색
  카카오뱅크: "#FFE300", // 카카오 노란색
  네이버랩스: "#03C75A", // 네이버 초록색
  알고리즘: "#adb5bd",
}

// 정의되지 않은 태그의 기본 색상
export const defaultTagColor = "#6C757D" // 회색

// 태그 색상을 가져오는 함수
export const getTagColor = tag => {
  return tagColors[tag] || defaultTagColor
}

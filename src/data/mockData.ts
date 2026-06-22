import { Building, Favorite, Report, Spot, Tag } from '../types/domain';

export const mockTags: Tag[] = [
  { id: 'outlet', label: '콘센트 있음', category: 'study' },
  { id: 'quiet', label: '조용함', category: 'study' },
  { id: 'restroom', label: '화장실', category: 'convenience' },
  { id: 'print', label: '프린트 가능', category: 'print' },
  { id: 'solo-meal', label: '혼밥 가능', category: 'food' },
  { id: 'rain-shelter', label: '비 피하기', category: 'rest' },
  { id: 'team', label: '팀플', category: 'study' },
];

export const mockBuildings: Building[] = [
  { id: 'library', name: '중앙도서관', shortName: '도서관', description: '조용한 공부 공간과 프린트실이 모여 있는 핵심 건물입니다.', floors: ['B1', '1F', '2F', '3F'], coordinate: { latitude: 37.5665, longitude: 126.978 } },
  { id: 'student-center', name: '학생회관', shortName: '학관', description: '식당, 편의점, 동아리방 등 학생 생활 편의시설이 있습니다.', floors: ['1F', '2F', '3F'], coordinate: { latitude: 37.5669, longitude: 126.9784 } },
  { id: 'engineering', name: '공학관', shortName: '공학관', description: '팀플 공간과 야간 개방 강의실을 찾기 좋은 건물입니다.', floors: ['1F', '2F', '4F', '5F'], coordinate: { latitude: 37.5672, longitude: 126.9777 } },
];

export const mockPlaces: Spot[] = [
  { id: 'quiet-zone', buildingId: 'library', name: '3층 조용한 열람실', category: 'study', floor: '3F', locationDescription: '중앙 계단으로 올라와 오른쪽 끝 유리문 안쪽', summary: '콘센트 좌석이 많고 시험기간에도 비교적 조용합니다.', description: '창가 좌석과 벽면 좌석 대부분에 콘센트가 있어 장시간 노트북 작업에 적합합니다. 대화는 금지 분위기라 집중하기 좋습니다.', tips: ['오전 10시 전 도착하면 창가 자리가 남아 있어요.', '노트북 충전기는 멀티탭 없이도 충분합니다.'], tagIds: ['outlet', 'quiet'], tags: ['콘센트 있음', '조용함'], hours: '08:00 - 23:00', congestion: 'medium', status: 'verified', lastVerifiedAt: '2026-06-10', verificationCount: 18 },
  { id: 'print-room', buildingId: 'library', name: 'B1 무인 프린트존', category: 'print', floor: 'B1', locationDescription: 'B1 매점 맞은편 복도', summary: '흑백/컬러 출력과 스캔이 가능한 무인 공간입니다.', description: '카드 결제 가능한 무인 프린터 3대와 스캐너 1대가 있습니다. 과제 마감 직전에는 대기 줄이 생깁니다.', tips: ['A4 용지가 떨어지면 1층 안내 데스크에 문의하세요.'], tagIds: ['print', 'rain-shelter'], tags: ['프린트 가능', '비 피하기'], hours: '상시', congestion: 'low', status: 'verified', lastVerifiedAt: '2026-06-12', verificationCount: 9 },
  { id: 'student-cafeteria', buildingId: 'student-center', name: '학생식당', category: 'food', floor: '1F', locationDescription: '학생회관 정문 진입 후 왼쪽', summary: '가성비 좋은 점심 메뉴가 빠르게 소진됩니다.', description: '혼자 앉기 좋은 1인석 라인이 있고 회전율이 빨라 공강 사이 식사하기 좋습니다.', tips: ['12시 20분 이후에는 인기 메뉴가 품절될 수 있어요.'], tagIds: ['solo-meal'], tags: ['혼밥 가능'], hours: '11:00 - 19:00', congestion: 'high', status: 'needs_check', lastVerifiedAt: '2026-05-28', verificationCount: 12 },
  { id: 'restroom-2f', buildingId: 'student-center', name: '2층 깨끗한 화장실', category: 'convenience', floor: '2F', locationDescription: '동아리방 복도 끝 엘리베이터 옆', summary: '수업 이동 동선에서 들르기 좋은 비교적 깨끗한 화장실입니다.', description: '1층보다 덜 붐비고 세면대 주변 관리가 잘 되어 있습니다.', tips: ['축제 기간에는 3층 화장실이 더 여유롭습니다.'], tagIds: ['restroom'], tags: ['화장실'], hours: '09:00 - 22:00', congestion: 'medium', status: 'verified', lastVerifiedAt: '2026-06-05', verificationCount: 7 },
  { id: 'team-room', buildingId: 'engineering', name: '4층 팀플 라운지', category: 'study', floor: '4F', locationDescription: '서쪽 엘리베이터 하차 후 왼쪽 라운지', summary: '화이트보드가 있고 4~6인 팀플에 적합합니다.', description: '예약 없이도 사용할 수 있는 테이블이 있으나 발표 주간에는 빨리 차는 편입니다.', tips: ['마커는 개인 지참을 추천합니다.'], tagIds: ['team', 'outlet'], tags: ['팀플', '콘센트 있음'], hours: '09:00 - 22:00', congestion: 'unknown', status: 'unknown', lastVerifiedAt: '2026-04-30', verificationCount: 4 },
];

export const mockFavorites: Favorite[] = [];

export const mockReports: Report[] = [
  { id: 'report-team-room-hours', spotId: 'team-room', buildingId: 'engineering', category: 'study', title: '팀플 라운지 운영시간 확인 필요', description: '시험기간에는 23시까지 열려 있다는 제보가 있습니다.', status: 'reviewing', createdAt: '2026-06-03T09:00:00.000Z' },
];

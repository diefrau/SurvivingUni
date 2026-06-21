import { Building, SurvivalPlace } from '../types/domain';

export const mockBuildings: Building[] = [
  { id: 'library', name: '중앙도서관', shortName: '도서관', description: '조용한 공부 공간과 프린트실이 모여 있는 핵심 건물입니다.', floors: ['B1', '1F', '2F', '3F'], coordinate: { latitude: 37.5665, longitude: 126.978 } },
  { id: 'student-center', name: '학생회관', shortName: '학관', description: '식당, 편의점, 동아리방 등 학생 생활 편의시설이 있습니다.', floors: ['1F', '2F', '3F'], coordinate: { latitude: 37.5669, longitude: 126.9784 } },
  { id: 'engineering', name: '공학관', shortName: '공학관', description: '팀플 공간과 야간 개방 강의실을 찾기 좋은 건물입니다.', floors: ['1F', '2F', '4F', '5F'], coordinate: { latitude: 37.5672, longitude: 126.9777 } },
];

export const mockPlaces: SurvivalPlace[] = [
  { id: 'quiet-zone', buildingId: 'library', name: '3층 조용한 열람실', category: 'study', floor: '3F', description: '콘센트 좌석이 많고 시험기간에도 비교적 조용합니다.', tags: ['콘센트', '조용함', '시험기간 추천'], hours: '08:00 - 23:00', congestion: 'medium', isSaved: true },
  { id: 'print-room', buildingId: 'library', name: 'B1 무인 프린트존', category: 'print', floor: 'B1', description: '흑백/컬러 출력과 스캔이 가능한 무인 공간입니다.', tags: ['프린트', '스캔', '카드결제'], hours: '상시', congestion: 'low' },
  { id: 'student-cafeteria', buildingId: 'student-center', name: '학생식당', category: 'food', floor: '1F', description: '가성비 좋은 점심 메뉴가 빠르게 소진됩니다.', tags: ['점심', '저렴함', '혼밥'], hours: '11:00 - 19:00', congestion: 'high', isSaved: true },
  { id: 'nap-sofa', buildingId: 'student-center', name: '2층 휴게 소파', category: 'rest', floor: '2F', description: '공강 시간에 잠깐 쉬기 좋은 소파 구역입니다.', tags: ['휴식', '공강', '실내'], hours: '09:00 - 21:00', congestion: 'medium' },
  { id: 'team-room', buildingId: 'engineering', name: '4층 팀플 라운지', category: 'study', floor: '4F', description: '화이트보드가 있고 4~6인 팀플에 적합합니다.', tags: ['팀플', '화이트보드', '예약권장'], hours: '09:00 - 22:00', congestion: 'unknown' },
];

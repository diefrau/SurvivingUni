import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { LoginPromptModal } from '../components/LoginPromptModal';
import { useFavorites } from '../hooks/useFavorites';
import { RootStackParamList } from '../navigation/types';
import { campusService } from '../services/campusService';
import { colors } from '../theme/colors';
import { Building, Spot } from '../types/domain';

const isLoggedIn = false;
const statusLabel: Record<Spot['status'], string> = { verified: '확인됨', needs_check: '확인 필요', closed: '운영 종료', unknown: '미확인' };

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetail'>;
export function PlaceDetailScreen({ route, navigation }: Props) {
  const [spot, setSpot] = useState<Spot | undefined>();
  const [building, setBuilding] = useState<Building | undefined>();
  const [loginOpen, setLoginOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  useEffect(() => { campusService.getSpotById(route.params.spotId).then((next) => { setSpot(next); if (next) campusService.getBuildingById(next.buildingId).then(setBuilding); }); }, [route.params.spotId]);
  useEffect(() => { const sub = BackHandler.addEventListener('hardwareBackPress', () => { if (loginOpen) { setLoginOpen(false); return true; } navigation.goBack(); return true; }); return () => sub.remove(); }, [loginOpen, navigation]);
  if (!spot) return <View style={styles.center}><Text>장소를 불러오는 중...</Text></View>;
  const requestLoginOrRun = (action: () => void) => isLoggedIn ? action() : setLoginOpen(true);
  return <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <LoginPromptModal visible={loginOpen} onClose={() => setLoginOpen(false)} />
    <View style={styles.row}><Text style={styles.title}>{spot.name}</Text><Text style={styles.badge}>{statusLabel[spot.status]}</Text></View>
    <Text style={styles.meta}>{building?.name ?? '건물 확인 중'} · {spot.floor} · {spot.hours}</Text>
    <Text style={styles.label}>위치 설명</Text><Text style={styles.body}>{spot.locationDescription}</Text>
    <Text style={styles.tags}>{spot.tags.map((tag) => `#${tag}`).join(' ')}</Text>
    <Text style={styles.summary}>{spot.summary}</Text>
    <View style={styles.panel}><Text style={styles.label}>상세 설명</Text><Text style={styles.body}>{spot.description}</Text></View>
    <View style={styles.panel}><Text style={styles.label}>팁</Text>{spot.tips.map((tip) => <Text key={tip} style={styles.body}>• {tip}</Text>)}</View>
    <View style={styles.panel}><Text style={styles.label}>최근 확인</Text><Text style={styles.value}>{spot.lastVerifiedAt} · 확인 {spot.verificationCount}회</Text></View>
    <Pressable style={styles.button} onPress={() => requestLoginOrRun(() => toggleFavorite(spot.id))}><Text style={styles.buttonText}>{isFavorite(spot.id) ? '즐겨찾기 해제' : '즐겨찾기 저장'}</Text></Pressable>
    <View style={styles.panel}><Text style={styles.label}>이 정보 맞나요?</Text><Text style={styles.body}>장소 정보가 다르거나 운영 시간이 바뀌었다면 제보로 알려주세요.</Text></View>
    <Pressable style={styles.secondaryButton} onPress={() => requestLoginOrRun(() => navigation.navigate('MainTabs', { screen: 'Report' }))}><Text style={styles.secondaryText}>제보하기</Text></Pressable>
    <EmptyState title="로그인 필요 상태" message="비로그인 mock 상태에서는 저장과 제보가 로그인 안내로 연결됩니다." />
  </ScrollView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.background }, content: { padding: 20 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' }, row: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' }, title: { fontSize: 28, fontWeight: '900', color: colors.text, flex: 1 }, badge: { color: colors.primary, backgroundColor: colors.primarySoft, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, overflow: 'hidden', fontWeight: '900' }, meta: { color: colors.primary, fontWeight: '800', marginTop: 10 }, label: { color: colors.muted, fontWeight: '800', marginTop: 16 }, body: { color: colors.text, lineHeight: 22, marginTop: 6 }, tags: { color: colors.primary, fontWeight: '800', marginTop: 14 }, summary: { color: colors.text, fontSize: 17, lineHeight: 24, marginTop: 14, fontWeight: '700' }, panel: { backgroundColor: colors.card, padding: 16, borderRadius: 18, marginTop: 16, borderWidth: 1, borderColor: colors.border }, value: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 6 }, button: { backgroundColor: colors.primary, borderRadius: 16, padding: 16, alignItems: 'center', marginTop: 18 }, buttonText: { color: 'white', fontWeight: '900', fontSize: 16 }, secondaryButton: { borderColor: colors.primary, borderWidth: 1, borderRadius: 16, padding: 16, alignItems: 'center', marginTop: 12 }, secondaryText: { color: colors.primary, fontWeight: '900', fontSize: 16 } });

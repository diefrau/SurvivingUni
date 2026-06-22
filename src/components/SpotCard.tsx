import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { Building, Spot } from '../types/domain';

const statusLabel: Record<Spot['status'], string> = { verified: '확인됨', needs_check: '확인 필요', closed: '운영 종료', unknown: '미확인' };

export function SpotCard({ spot, building, onPress }: { key?: string; spot: Spot; building?: Building; onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.card}><View style={styles.row}><Text style={styles.title}>{spot.name}</Text><Text style={styles.badge}>{statusLabel[spot.status]}</Text></View><Text style={styles.meta}>{building?.name ?? '건물 확인 중'} · {spot.floor}</Text><Text style={styles.tags}>{spot.tags.map((tag) => `#${tag}`).join(' ')}</Text><Text style={styles.summary}>{spot.summary}</Text><Text style={styles.verified}>최근 확인 {spot.lastVerifiedAt} · 확인 {spot.verificationCount}회</Text></Pressable>;
}
const styles = StyleSheet.create({ card: { backgroundColor: colors.card, borderRadius: 18, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border }, row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 }, title: { color: colors.text, fontSize: 17, fontWeight: '900', flex: 1 }, badge: { color: colors.primary, backgroundColor: colors.primarySoft, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, overflow: 'hidden', fontWeight: '800' }, meta: { color: colors.muted, marginTop: 6, fontWeight: '700' }, tags: { color: colors.primary, marginTop: 10, fontWeight: '700' }, summary: { color: colors.text, marginTop: 10, lineHeight: 20 }, verified: { color: colors.muted, marginTop: 10, fontSize: 12 } });

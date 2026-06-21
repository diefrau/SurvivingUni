import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { SurvivalPlace } from '../types/domain';

const categoryLabel: Record<SurvivalPlace['category'], string> = {
  food: '식사', study: '공부', rest: '휴식', print: '출력', convenience: '편의', admin: '행정',
};

export function PlaceCard({ place, onPress }: { place: SurvivalPlace; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.badge}>{categoryLabel[place.category]}</Text>
      </View>
      <Text style={styles.meta}>{place.floor} · {place.hours}</Text>
      <Text style={styles.description}>{place.description}</Text>
      <Text style={styles.tags}>{place.tags.map((tag) => `#${tag}`).join(' ')}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 18, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  title: { color: colors.text, fontSize: 17, fontWeight: '700', flex: 1 },
  badge: { color: colors.primary, backgroundColor: colors.primarySoft, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, overflow: 'hidden', fontWeight: '700' },
  meta: { color: colors.muted, marginTop: 6 },
  description: { color: colors.text, marginTop: 10, lineHeight: 20 },
  tags: { color: colors.primary, marginTop: 10, fontWeight: '600' },
});

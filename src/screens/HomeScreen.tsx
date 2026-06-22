import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { SpotCard } from '../components/SpotCard';
import { campusService } from '../services/campusService';
import { colors } from '../theme/colors';
import { Building, Spot, Tag } from '../types/domain';

const quickTagLabels = ['콘센트 있음', '조용함', '화장실', '프린트 가능', '혼밥 가능', '비 피하기'];

export function HomeScreen({ navigation }: { navigation: any }) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>();

  useEffect(() => {
    campusService.listBuildings().then(setBuildings);
    campusService.listSpots().then(setSpots);
    campusService.listTags().then(setTags);
  }, []);

  const quickTags = useMemo(() => tags.filter((tag) => quickTagLabels.includes(tag.label)), [tags]);
  const filteredSpots = selectedTagId ? spots.filter((spot) => spot.tagIds.includes(selectedTagId)) : [];
  const buildingById = new Map(buildings.map((building) => [building.id, building]));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Surviving Uni</Text>
      <Text style={styles.h1}>캠퍼스 생존 지도를 시작해요</Text>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>오늘의 생존 팁</Text>
        <Text style={styles.heroText}>시험기간에는 도서관 3층보다 B1 프린트존이 덜 붐벼요.</Text>
      </View>

      <Text style={styles.section}>빠른 태그</Text>
      <View style={styles.tagWrap}>
        {quickTags.map((tag) => {
          const selected = selectedTagId === tag.id;
          return (
            <Pressable key={tag.id} style={[styles.tag, selected && styles.tagSelected]} onPress={() => setSelectedTagId(selected ? undefined : tag.id)}>
              <Text style={[styles.tagText, selected && styles.tagTextSelected]}>{tag.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {selectedTagId ? (
        <View style={styles.resultBlock}>
          <Text style={styles.section}>태그 결과</Text>
          {filteredSpots.length === 0 ? (
            <EmptyState title="필터 결과 없음" message="선택한 태그에 맞는 장소가 아직 없습니다." />
          ) : (
            filteredSpots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} building={buildingById.get(spot.buildingId)} onPress={() => navigation.navigate('PlaceDetail', { spotId: spot.id })} />
            ))
          )}
        </View>
      ) : null}

      <Text style={styles.section}>건물별 보기</Text>
      {buildings.map((building) => (
        <Pressable key={building.id} style={styles.buildingCard} onPress={() => navigation.navigate('BuildingPlaces', { buildingId: building.id, buildingName: building.name })}>
          <Text style={styles.cardTitle}>{building.name}</Text>
          <Text style={styles.muted}>{building.description}</Text>
          <Text style={styles.count}>{spots.filter((spot) => spot.buildingId === building.id).length}개 장소</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 56 },
  eyebrow: { color: colors.primary, fontWeight: '800' },
  h1: { fontSize: 28, fontWeight: '800', color: colors.text, marginTop: 8 },
  hero: { backgroundColor: colors.primary, borderRadius: 24, padding: 20, marginVertical: 24 },
  heroTitle: { color: 'white', fontSize: 18, fontWeight: '800' },
  heroText: { color: 'white', marginTop: 8, lineHeight: 21 },
  section: { fontSize: 20, fontWeight: '800', marginBottom: 12, color: colors.text },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 },
  tag: { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  tagSelected: { backgroundColor: colors.primary },
  tagText: { color: colors.text, fontWeight: '800' },
  tagTextSelected: { color: 'white' },
  resultBlock: { marginBottom: 10 },
  buildingCard: { backgroundColor: colors.card, borderRadius: 18, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  cardTitle: { fontSize: 18, fontWeight: '800', color: colors.text },
  muted: { color: colors.muted, marginTop: 8, lineHeight: 20 },
  count: { color: colors.primary, marginTop: 10, fontWeight: '700' },
});

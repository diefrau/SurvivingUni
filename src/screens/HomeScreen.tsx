import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { campusService } from '../services/campusService';
import { colors } from '../theme/colors';
import { Building, SurvivalPlace } from '../types/domain';

export function HomeScreen({ navigation }: { navigation: any }) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [places, setPlaces] = useState<SurvivalPlace[]>([]);
  useEffect(() => { campusService.getBuildings().then(setBuildings); campusService.getPlaces().then(setPlaces); }, []);
  return <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <Text style={styles.eyebrow}>Surviving Uni</Text><Text style={styles.h1}>캠퍼스 생존 지도를 시작해요</Text>
    <View style={styles.hero}><Text style={styles.heroTitle}>오늘의 생존 팁</Text><Text style={styles.heroText}>시험기간에는 도서관 3층보다 B1 프린트존이 덜 붐벼요.</Text></View>
    <Text style={styles.section}>건물별 보기</Text>{buildings.map((building) => <Pressable key={building.id} style={styles.buildingCard} onPress={() => navigation.navigate('BuildingPlaces', { buildingId: building.id, buildingName: building.name })}><Text style={styles.cardTitle}>{building.name}</Text><Text style={styles.muted}>{building.description}</Text><Text style={styles.count}>{places.filter((place) => place.buildingId === building.id).length}개 장소</Text></Pressable>)}
  </ScrollView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.background }, content: { padding: 20, paddingTop: 56 }, eyebrow: { color: colors.primary, fontWeight: '800' }, h1: { fontSize: 28, fontWeight: '800', color: colors.text, marginTop: 8 }, hero: { backgroundColor: colors.primary, borderRadius: 24, padding: 20, marginVertical: 24 }, heroTitle: { color: 'white', fontSize: 18, fontWeight: '800' }, heroText: { color: 'white', marginTop: 8, lineHeight: 21 }, section: { fontSize: 20, fontWeight: '800', marginBottom: 12 }, buildingCard: { backgroundColor: colors.card, borderRadius: 18, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border }, cardTitle: { fontSize: 18, fontWeight: '800', color: colors.text }, muted: { color: colors.muted, marginTop: 8, lineHeight: 20 }, count: { color: colors.primary, marginTop: 10, fontWeight: '700' } });

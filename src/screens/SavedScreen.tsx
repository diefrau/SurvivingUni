import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { SpotCard } from '../components/SpotCard';
import { useFavorites } from '../hooks/useFavorites';
import { campusService } from '../services/campusService';
import { colors } from '../theme/colors';
import { Building, Spot } from '../types/domain';

export function SavedScreen({ navigation }: { navigation: any }) {
  const { favoriteSpotIds, isLoading } = useFavorites();
  const [spots, setSpots] = useState<Spot[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  useEffect(() => { campusService.listBuildings().then(setBuildings); }, []);
  useEffect(() => { if (!isLoading) campusService.listFavoriteSpots(favoriteSpotIds).then(setSpots); }, [favoriteSpotIds.join(','), isLoading]);
  const buildingById = new Map(buildings.map((building) => [building.id, building]));
  return <ScrollView style={styles.container} contentContainerStyle={styles.content}><Text style={styles.title}>저장한 장소</Text>{spots.length === 0 ? <EmptyState title="저장한 장소 없음" message="마음에 드는 장소 상세에서 즐겨찾기를 눌러 저장해보세요." /> : spots.map((spot) => <SpotCard key={spot.id} spot={spot} building={buildingById.get(spot.buildingId)} onPress={() => navigation.navigate('PlaceDetail', { spotId: spot.id })} />)}</ScrollView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.background }, content: { padding: 20, paddingTop: 56 }, title: { fontSize: 28, fontWeight: '900', color: colors.text, marginBottom: 18 } });

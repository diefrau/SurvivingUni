import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { SpotCard } from '../components/SpotCard';
import { RootStackParamList } from '../navigation/types';
import { campusService } from '../services/campusService';
import { colors } from '../theme/colors';
import { Building, Spot } from '../types/domain';

type Props = NativeStackScreenProps<RootStackParamList, 'BuildingPlaces'>;
export function BuildingPlacesScreen({ route, navigation }: Props) {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [building, setBuilding] = useState<Building | undefined>();
  useEffect(() => { campusService.listSpotsByBuilding(route.params.buildingId).then(setSpots); campusService.getBuildingById(route.params.buildingId).then(setBuilding); }, [route.params.buildingId]);
  return <ScrollView style={styles.container} contentContainerStyle={styles.content}><Text style={styles.title}>생존 장소 {spots.length}곳</Text>{spots.length === 0 ? <EmptyState title="필터 결과 없음" message="이 건물에 등록된 장소가 아직 없습니다." /> : spots.map((spot) => <SpotCard key={spot.id} spot={spot} building={building} onPress={() => navigation.navigate('PlaceDetail', { spotId: spot.id })} />)}</ScrollView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.background }, content: { padding: 20 }, title: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 16 } });

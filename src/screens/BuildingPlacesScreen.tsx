import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { PlaceCard } from '../components/PlaceCard';
import { RootStackParamList } from '../navigation/types';
import { campusService } from '../services/campusService';
import { colors } from '../theme/colors';
import { SurvivalPlace } from '../types/domain';

type Props = NativeStackScreenProps<RootStackParamList, 'BuildingPlaces'>;
export function BuildingPlacesScreen({ route, navigation }: Props) {
  const [places, setPlaces] = useState<SurvivalPlace[]>([]);
  useEffect(() => { campusService.getPlacesByBuilding(route.params.buildingId).then(setPlaces); }, [route.params.buildingId]);
  return <ScrollView style={styles.container} contentContainerStyle={styles.content}><Text style={styles.title}>생존 장소 {places.length}곳</Text>{places.map((place) => <PlaceCard key={place.id} place={place} onPress={() => navigation.navigate('PlaceDetail', { placeId: place.id })} />)}</ScrollView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.background }, content: { padding: 20 }, title: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 16 } });

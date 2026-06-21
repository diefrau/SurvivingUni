import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { PlaceCard } from '../components/PlaceCard';
import { campusService } from '../services/campusService';
import { colors } from '../theme/colors';
import { SurvivalPlace } from '../types/domain';

export function SavedScreen({ navigation }: { navigation: any }) { const [places, setPlaces] = useState<SurvivalPlace[]>([]); useEffect(() => { campusService.getSavedPlaces().then(setPlaces); }, []); return <ScrollView style={styles.container} contentContainerStyle={styles.content}><Text style={styles.title}>저장한 장소</Text>{places.map((place) => <PlaceCard key={place.id} place={place} onPress={() => navigation.navigate('PlaceDetail', { placeId: place.id })} />)}</ScrollView>; }
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.background }, content: { padding: 20, paddingTop: 56 }, title: { fontSize: 28, fontWeight: '900', color: colors.text, marginBottom: 18 } });

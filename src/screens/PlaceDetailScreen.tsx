import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { campusService } from '../services/campusService';
import { colors } from '../theme/colors';
import { SurvivalPlace } from '../types/domain';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetail'>;
export function PlaceDetailScreen({ route }: Props) { const [place, setPlace] = useState<SurvivalPlace>(); useEffect(() => { campusService.getPlaces().then((places) => setPlace(places.find((item) => item.id === route.params.placeId))); }, [route.params.placeId]); if (!place) return <View style={styles.center}><Text>장소를 불러오는 중...</Text></View>; return <ScrollView style={styles.container} contentContainerStyle={styles.content}><Text style={styles.title}>{place.name}</Text><Text style={styles.meta}>{place.floor} · {place.hours}</Text><Text style={styles.description}>{place.description}</Text><View style={styles.panel}><Text style={styles.label}>혼잡도</Text><Text style={styles.value}>{place.congestion}</Text></View><View style={styles.panel}><Text style={styles.label}>태그</Text><Text style={styles.tags}>{place.tags.map((tag) => `#${tag}`).join(' ')}</Text></View></ScrollView>; }
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.background }, content: { padding: 20 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' }, title: { fontSize: 28, fontWeight: '900', color: colors.text }, meta: { color: colors.primary, fontWeight: '700', marginTop: 10 }, description: { color: colors.text, fontSize: 16, lineHeight: 24, marginTop: 20 }, panel: { backgroundColor: colors.card, padding: 16, borderRadius: 18, marginTop: 16, borderWidth: 1, borderColor: colors.border }, label: { color: colors.muted, fontWeight: '700' }, value: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 6 }, tags: { color: colors.primary, fontWeight: '700', marginTop: 8 } });

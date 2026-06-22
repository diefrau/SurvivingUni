import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MapScreen } from '../screens/MapScreen';
import { SavedScreen } from '../screens/SavedScreen';
import { ReportScreen } from '../screens/ReportScreen';
import { BuildingPlacesScreen } from '../screens/BuildingPlacesScreen';
import { PlaceDetailScreen } from '../screens/PlaceDetailScreen';
import { MainTabParamList, RootStackParamList } from './types';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
    <Tab.Screen name="Map" component={MapScreen} options={{ title: '지도' }} />
    <Tab.Screen name="Saved" component={SavedScreen} options={{ title: '저장' }} />
    <Tab.Screen name="Report" component={ReportScreen} options={{ title: '제보' }} />
  </Tab.Navigator>;
}

export function AppNavigator() {
  return <Stack.Navigator screenOptions={{ headerTintColor: colors.text }}>
    <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    <Stack.Screen name="BuildingPlaces" component={BuildingPlacesScreen} options={({ route }: { route: { params: { buildingName: string } } }) => ({ title: route.params.buildingName })} />
    <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} options={{ title: '장소 상세' }} />
  </Stack.Navigator>;
}

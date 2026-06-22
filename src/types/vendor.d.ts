declare namespace JSX { interface IntrinsicElements { [elemName: string]: any } }

declare module 'react' {
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useState<T = undefined>(initial?: T | (() => T)): [T, (value: T | ((previous: T) => T)) => void];
}

declare module 'react/jsx-runtime' {
  export const Fragment: unknown;
  export function jsx(type: unknown, props: unknown, key?: unknown): unknown;
  export function jsxs(type: unknown, props: unknown, key?: unknown): unknown;
}

declare module 'react-native' {
  export const Alert: { alert(title: string, message?: string): void };
  export const BackHandler: { addEventListener(eventName: string, handler: () => boolean): { remove(): void } };
  export const Modal: any;
  export const Pressable: any;
  export const ScrollView: any;
  export const StyleSheet: { create<T extends Record<string, unknown>>(styles: T): T };
  export const Text: any;
  export const TextInput: any;
  export const View: any;
}

declare module '@react-native-async-storage/async-storage' {
  const AsyncStorage: { getItem(key: string): Promise<string | null>; setItem(key: string, value: string): Promise<void>; removeItem(key: string): Promise<void> };
  export default AsyncStorage;
}

declare module 'expo-status-bar' { export const StatusBar: any; }
declare module '@react-navigation/native' { export const NavigationContainer: any; }
declare module '@react-navigation/native-stack' {
  export type NativeStackScreenProps<ParamList, RouteName extends keyof ParamList> = { route: { params: ParamList[RouteName] }; navigation: { navigate: (screen: string, params?: unknown) => void; goBack: () => void } };
  export function createNativeStackNavigator<T>(): any;
}
declare module '@react-navigation/bottom-tabs' { export function createBottomTabNavigator<T>(): any; }

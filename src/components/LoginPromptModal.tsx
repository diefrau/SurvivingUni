import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export function LoginPromptModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}><View style={styles.overlay}><View style={styles.card}><Text style={styles.title}>로그인이 필요해요</Text><Text style={styles.message}>현재 MVP는 비로그인 mock 상태입니다. 실제 로그인 연동 전까지 저장과 제보는 로그인 안내만 표시합니다.</Text><Pressable style={styles.button} onPress={onClose}><Text style={styles.buttonText}>확인</Text></Pressable></View></View></Modal>;
}
const styles = StyleSheet.create({ overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'center', padding: 24 }, card: { backgroundColor: 'white', borderRadius: 24, padding: 22 }, title: { color: colors.text, fontSize: 22, fontWeight: '900' }, message: { color: colors.muted, lineHeight: 22, marginTop: 10 }, button: { backgroundColor: colors.primary, borderRadius: 14, alignItems: 'center', padding: 14, marginTop: 18 }, buttonText: { color: 'white', fontWeight: '900' } });

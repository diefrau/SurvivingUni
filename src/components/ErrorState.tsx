import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export function ErrorState({ title, message, retryLabel = '다시 시도', onRetry }: { title: string; message: string; retryLabel?: string; onRetry?: () => void }) {
  return <View style={styles.box}><Text style={styles.title}>{title}</Text><Text style={styles.message}>{message}</Text>{onRetry ? <Pressable style={styles.button} onPress={onRetry}><Text style={styles.buttonText}>{retryLabel}</Text></Pressable> : null}</View>;
}
const styles = StyleSheet.create({ box: { backgroundColor: '#FFF1F2', borderRadius: 20, borderWidth: 1, borderColor: '#FECDD3', padding: 20, marginVertical: 12 }, title: { color: '#BE123C', fontSize: 18, fontWeight: '900' }, message: { color: colors.text, lineHeight: 21, marginTop: 8 }, button: { alignSelf: 'flex-start', backgroundColor: '#BE123C', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, marginTop: 14 }, buttonText: { color: 'white', fontWeight: '900' } });

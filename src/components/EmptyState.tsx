import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export function EmptyState({ title, message, actionLabel, onAction }: { title: string; message: string; actionLabel?: string; onAction?: () => void }) {
  return <View style={styles.box}><Text style={styles.title}>{title}</Text><Text style={styles.message}>{message}</Text>{actionLabel && onAction ? <Pressable style={styles.button} onPress={onAction}><Text style={styles.buttonText}>{actionLabel}</Text></Pressable> : null}</View>;
}
const styles = StyleSheet.create({ box: { backgroundColor: colors.card, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 20, alignItems: 'center', marginVertical: 12 }, title: { color: colors.text, fontSize: 18, fontWeight: '900' }, message: { color: colors.muted, textAlign: 'center', lineHeight: 21, marginTop: 8 }, button: { backgroundColor: colors.primary, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, marginTop: 14 }, buttonText: { color: 'white', fontWeight: '900' } });

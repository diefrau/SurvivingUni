import { useEffect, useState } from 'react';
import { Alert, BackHandler, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoginPromptModal } from '../components/LoginPromptModal';
import { campusService } from '../services/campusService';
import { colors } from '../theme/colors';
import { Building } from '../types/domain';

const isLoggedIn = false;
export function ReportScreen() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [loginOpen, setLoginOpen] = useState(false);
  useEffect(() => { campusService.listBuildings().then(setBuildings); }, []);
  useEffect(() => { const sub = BackHandler.addEventListener('hardwareBackPress', () => { if (loginOpen) { setLoginOpen(false); return true; } return false; }); return () => sub.remove(); }, [loginOpen]);
  const submit = async () => {
    setError(undefined);
    if (!title.trim() || !description.trim()) { setError('장소 이름과 유용한 점을 모두 입력해주세요.'); return; }
    if (!isLoggedIn) { setLoginOpen(true); return; }
    setIsSubmitting(true);
    try {
      const buildingId = buildings[0]?.id ?? 'library';
      const result = await campusService.createReport({ title: title.trim(), buildingId, category: 'study', description: description.trim() });
      Alert.alert('제보 접수', `mock id: ${result.id}`);
      setTitle(''); setDescription('');
    } catch {
      setError('제보 실패: 잠시 후 다시 시도해주세요.');
    } finally { setIsSubmitting(false); }
  };
  return <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <LoginPromptModal visible={loginOpen} onClose={() => setLoginOpen(false)} />
    <Text style={styles.title}>생존 장소 제보</Text><Text style={styles.help}>서버 연결 전까지 입력값은 mock service로 전달됩니다.</Text>
    <EmptyState title="로그인 필요" message="현재 MVP는 비로그인 mock 상태입니다. 제보 제출 시 로그인 안내가 표시됩니다." />
    {error ? <ErrorState title="제보 실패" message={error} /> : null}
    <TextInput value={title} onChangeText={setTitle} placeholder="장소 이름 *" style={styles.input} />
    <TextInput value={description} onChangeText={setDescription} placeholder="어떤 점이 유용한가요? *" multiline style={[styles.input, styles.textarea]} />
    <Pressable style={[styles.button, isSubmitting && styles.disabled]} onPress={submit} disabled={isSubmitting}><Text style={styles.buttonText}>{isSubmitting ? '제출 중...' : '제보 보내기'}</Text></Pressable>
  </ScrollView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.background }, content: { padding: 20, paddingTop: 56 }, title: { fontSize: 28, fontWeight: '900', color: colors.text }, help: { color: colors.muted, marginTop: 10, lineHeight: 21 }, input: { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 16, padding: 14, marginTop: 16, fontSize: 16 }, textarea: { minHeight: 140, textAlignVertical: 'top' }, button: { backgroundColor: colors.primary, borderRadius: 16, padding: 16, alignItems: 'center', marginTop: 18 }, disabled: { opacity: 0.6 }, buttonText: { color: 'white', fontWeight: '900', fontSize: 16 } });

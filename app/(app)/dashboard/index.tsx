import { SafeAreaView, Text, View, Button, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo, {user?.name}</Text>
      <Button title="Sair" onPress={logout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  welcome: { fontSize: 18, marginBottom: 10, color: '#fff' },
  list: { marginTop: 20 },
  item: { fontSize: 16, marginBottom: 8 },
});
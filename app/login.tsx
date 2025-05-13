import { SafeAreaView, View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Redirect, router } from 'expo-router';
import TextCustom from './components/TextCustom';

export default function LoginScreen() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('admin@mail.dev');
  const [password, setPassword] = useState('password');

  if (user) {
    return <Redirect href="/dashboard" />;
  }

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace('/dashboard');
    } catch (e: any) {
      alert('Erro ao logar');
    }
  };

  return (
    <View  style={styles.container}>
      <View>
        <SafeAreaView style={styles.container}>
          <TextCustom style={styles.headline} fontSize={72}>Login</TextCustom>

          <TextCustom style={styles.label}>Email:</TextCustom>
          <TextInput
            placeholder='Enter your email...'
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextCustom style={styles.label}>Password:</TextCustom>
          <TextInput
            placeholder='Password'
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headline: {
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: '700',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'grey',
    color: '#fff',
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  label: {
    color: '#fff',
  },
});
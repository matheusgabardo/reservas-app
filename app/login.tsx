import { SafeAreaView, View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link, Redirect, router } from 'expo-router';
import TextCustom from './components/TextCustom';

export default function LoginScreen() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('user@mail.dev');
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
      <View style={styles.logoWrapper}>
        <Image
            source={require('@/assets/images/bbroom-logo.png')}
            style={styles.logo}
            resizeMode="contain"
        />
      </View>
      <View style={styles.card}>
        <SafeAreaView>
          <TextCustom style={styles.headline} fontSize={38}>Login</TextCustom>
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
          <View style={styles.redirectWrapper}>
            <Text style={styles.redirectText}>Ainda não possuí uma conta? <Link style={styles.redirectLink} href={'/register'}>Ir para registro</Link></Text>
          </View>
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
    backgroundColor: '#171717'
  },
  card: {
    backgroundColor: '#262626',
    padding: 16,
    borderWidth: 1,
    borderColor: "#2f3237",
    borderRadius: 8,
  },
  headline: {
    textAlign: 'center',
    marginBottom: 25,
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
  logoWrapper:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logo: {
    width: 150,
    height: 100
  },
  redirectWrapper: {
    marginTop: 16, 
  },
  redirectText:{
    color: '#fff'
  },
  redirectLink:{
    color: '#ffc11e'
  },
});
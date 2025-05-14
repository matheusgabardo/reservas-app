import { SafeAreaView, View,  TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import {useState} from 'react'
import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'expo-router'
import TextCustom from '@/app/components/TextCustom'
import { Link } from "expo-router";

export default function RegisterScreen() {
  const { user, register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    await register({ name, email, password, confirmPassword });
  };

  if (user) {
    return <Redirect href="/dashboard" />;
  }
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
          <TextCustom style={styles.headline} fontSize={38}>Registro</TextCustom>
          <TextCustom style={styles.label}>Nome completo</TextCustom>
          <TextInput 
            placeholder='Digite seu nome'
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
            />

          <TextCustom style={styles.label}>Seu e-mail</TextCustom>
          <TextInput 
            placeholder='Digite seu e-mail...'
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            />

          <TextCustom style={styles.label}>Crie uma senha</TextCustom>
          <TextInput
            placeholderTextColor="#ffffff"
            style={styles.input}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            />
          
          <TextCustom style={styles.label}>Confirme sua senha</TextCustom>
          <TextInput
            placeholderTextColor="#ffffff"
            style={styles.input}
            placeholder="Digite sua senha"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
            />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Criar conta</Text>
          </TouchableOpacity>
          <View style={styles.redirectWrapper}>
            <Text style={styles.redirectText}>Já possuí uma conta? <Link style={styles.redirectLink} href={'/login'}>Ir para login</Link></Text>
          </View>
        </SafeAreaView>
      </View>
    </View>

  )
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
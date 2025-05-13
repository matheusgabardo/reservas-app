import { SafeAreaView, View,  TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {useState} from 'react'
import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'expo-router'
import TextCustom from '@/app/components/TextCustom'

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
        <View>
          <TextCustom style={styles.headline} fontSize={72}>Registro</TextCustom>

          <TextCustom style={styles.label}>Nome completo</TextCustom>
          <TextInput 
            placeholder='Digite seu nome' 
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
            />

          <TextCustom style={styles.label}>Seu e-mail</TextCustom>
          <TextInput 
            placeholder='Digite seu e-mail...' 
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            />

          <TextCustom style={styles.label}>Crie uma senha</TextCustom>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            />
          
          <TextCustom style={styles.label}>Confirme sua senha</TextCustom>
          <TextInput
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
          </View>
      </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    justifyContent: 'center',
  },
  headline:{
    textAlign:'center',
    marginTop:-100,
    marginBottom:50,
    fontWeight:700,
    color: '#fff'
  },
  input:{
    borderWidth:1,
    borderRadius:10, 
    padding:10,

    marginTop:10,
    marginBottom:10,
    borderColor:"grey",
    color: '#fff'
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop:10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  label:{
    color: '#fff',
  }
})

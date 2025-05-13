import { SafeAreaView, View,  TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {useState} from 'react'
import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'expo-router'
import TextCustom from './components/TextCustom'


const signup = () => {
    const {session, register} = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        register({email, password, confirmPassword})
    }

    if(session) return <Redirect href="/dashboard"/>
  return (

      <View  style={styles.container}>
        <View>
          <TextCustom style={styles.headline} fontSize={72}>Registro</TextCustom>

          <TextCustom style={styles.label}>Digite seu e-mail</TextCustom>
          <TextInput 
            placeholder='Enter your email...' 
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            />

          <TextCustom style={styles.label}>Crie uma senha</TextCustom>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            />
          
          <TextCustom style={styles.label}>Confirme sua senha</TextCustom>
          <TextInput
            style={styles.input}
            placeholder="Password"
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

export default signup
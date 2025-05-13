import { SafeAreaView, View,  TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {useState} from 'react'
import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'expo-router'
import TextCustom from './components/TextCustom'


const signin = () => {
    const {session, login} = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        login({email, password})
    }

    if(session) return <Redirect href="/dashboard"/>
  return (

      <View  style={styles.container}>
        <View>
          <TextCustom style={styles.headline} fontSize={72}>Login</TextCustom>

          <TextCustom style={styles.label}>Email:</TextCustom>
          <TextInput 
            placeholder='Enter your email...' 
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            />

          <TextCustom style={styles.label}>Password:</TextCustom>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Login</Text>
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

export default signin
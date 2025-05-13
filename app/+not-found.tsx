import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ERRO</Text>
      <Text style={styles.code}>404</Text>
      <Text style={styles.message}>PÁGINA NÃO ENCONTRADA</Text>
      <Image
        source={require('@/assets/images/tapes-caution.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Link href={'/(app)/dashboard'} style={styles.button}>Ir para homepage</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEAB42',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#020004',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  code: {
    fontSize: 48,
    color: '#020004',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: '#020004',
    marginBottom: 20,
  },
  image: {
    width: '120%',
    height: 200,
  },
  button: {
    padding: 16,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#020004',
    borderRadius: 8,
    fontSize: 18,
    color: '#020004',
    marginBottom: 20,
  },
});

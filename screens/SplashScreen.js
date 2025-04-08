import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Niveis');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.logocds} source={require('../assets/ilustração-imagem.jpg')}></Image>
      <Text style={styles.appName}>Aplicativo</Text>
      <Text style={styles.subtitle}>Dor pélvica</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6A0DAD' },
  logo: { width: 150, height: 150, marginBottom: 20 },
  appName: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 18, color: '#fff' },
});
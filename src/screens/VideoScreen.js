import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { Camera } from 'expo-camera';

export default function VideoScreen({ route, navigation }) {
  const { levelId, url } = route.params || {}; // Pegue o parâmetro `levelId` e `url` da navegação

  // Verifique se o parâmetro `levelId` ou `url` foi passado corretamente
  useEffect(() => {
    if (!levelId || !url) {
      Alert.alert('Erro', 'ID do nível ou URL do vídeo não encontrados.');
      navigation.goBack(); // Retorna para a tela anterior se não encontrar o `levelId` ou `url`
    }
  }, [levelId, url, navigation]);

  const handleNextStep = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      navigation.navigate('Camera', { levelId });
    } else {
      Alert.alert('Permissão Negada', 'É necessário permitir o uso da câmera para prosseguir.');
    }
  };

  const handleOpenVideo = () => {
    if (url) {
      Linking.openURL(url).catch((err) => {
        console.error("Erro ao tentar abrir o link:", err);
        Alert.alert('Erro', 'Não foi possível abrir o vídeo.');
      });
    } else {
      Alert.alert('Erro', 'URL do vídeo não encontrada.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nível {levelId}</Text>

      <TouchableOpacity onPress={handleOpenVideo} style={styles.videoBox}>
        <Text style={styles.videoText}>Assistir Vídeo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo Passo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  videoBox: { padding: 15, borderRadius: 10, backgroundColor: '#333', marginBottom: 10 },
  videoText: { color: '#fff', fontSize: 18 },
  nextButton: { backgroundColor: '#6A0DAD', padding: 15, borderRadius: 10 },
  nextButtonText: { color: '#fff', fontSize: 18 },
});

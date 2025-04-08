import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NiveisScreen({ navigation, route }) {
  const [unlockedLevels, setUnlockedLevels] = useState([1]);

  const levels = [
    { id: 1, url: 'https://www.youtube.com/watch?v=9boIH-ojqBE'},
    { id: 2, url: 'https://www.youtube.com/watch?v=example2' },
    { id: 3, url: 'https://www.youtube.com/watch?v=example3' },
    { id: 4, url: 'https://www.youtube.com/watch?v=example4' },
    { id: 5, url: 'https://www.youtube.com/watch?v=example5' },
    { id: 6, url: 'https://www.youtube.com/watch?v=example6' },
    { id: 7, url: 'https://www.youtube.com/watch?v=example7' },
    { id: 8, url: 'https://www.youtube.com/watch?v=example8' },
  ];

  useEffect(() => {
    const loadLevels = async () => {
      const storedLevels = await AsyncStorage.getItem('unlockedLevels');
      if (storedLevels) setUnlockedLevels(JSON.parse(storedLevels));
    };
    loadLevels();
  }, []);

  useEffect(() => {
    const saveUnlockedLevels = async () => {
      await AsyncStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
    };
    saveUnlockedLevels();
  }, [unlockedLevels]);

  useEffect(() => {
    if (route.params?.completedLevel) {
      const completedLevel = route.params.completedLevel;
      if (!unlockedLevels.includes(completedLevel + 1)) {
        setUnlockedLevels([...unlockedLevels, completedLevel + 1]);
      }
    }
  }, [route.params?.completedLevel]);

  const handleNavigateToVideo = (level) => {
    if (unlockedLevels.includes(level.id)) {
      navigation.navigate('Video', {
        levelId: level.id,
        url: level.url, // Passa a URL do vídeo para a tela VideoScreen
      });
    } else {
      Alert.alert('Nível Bloqueado', 'Este nível está bloqueado.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Selecione a Semana</Text>
        {levels.map((level) => (
          <TouchableOpacity
            key={level.id}
            style={[styles.button, !unlockedLevels.includes(level.id) && styles.buttonLocked]}
            onPress={() => handleNavigateToVideo(level)} // Navegação corrigida
            disabled={!unlockedLevels.includes(level.id)}
          >
            <Text style={styles.buttonText}>Semana {level.id}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' },
  scrollContainer: { padding: 10, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: {
    width: '95%', // Para manter o tamanho do botão de forma responsiva
    paddingVertical: 20, // Aumenta o padding vertical para garantir altura suficiente
    paddingHorizontal: 50, // Aumenta o padding horizontal para garantir largura suficiente
    borderRadius: 20,
    backgroundColor: '#6A0DAD', // Cor de fundo do botão
    marginBottom: 15, // Espaçamento inferior
    justifyContent: 'center', // Alinhamento no centro do botão
    alignItems: 'center', // Alinha o texto ao centro
  },
  buttonLocked: {
    backgroundColor: '#CCC', // Cor de fundo do botão quando bloqueado
  },
  buttonText: {
    color: '#FFF', // Cor do texto
    fontSize: 18, // Tamanho do texto
    fontWeight: 'bold', // Negrito no texto
  },
});

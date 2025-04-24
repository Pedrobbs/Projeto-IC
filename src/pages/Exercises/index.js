import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralButton from "../../components/GeneralButton";
import CameraView from "../../components/CameraView";

const videosBySubLevel = {
  1: "https://www.youtube.com/watch?v=2cufeBFlkq8",
  2: "https://www.youtube.com/watch?v=ZRexQ28CoXA",
  3: "https://www.youtube.com/watch?v=DbuX_Fe3Yco",
  4: "https://www.youtube.com/shorts/NZUY_Bz62vQ",
  5: "https://www.youtube.com/watch?v=kiEmbhvv7Fo",
  6: "https://www.youtube.com/shorts/9isTSsvmlZo",
  7: "https://www.youtube.com/shorts/gJNCS2vyJrE",
  8: "https://www.youtube.com/watch?v=zRGAn7RWyL8",
};

const Exercises = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { week, level, subLevel } = route.params;
  const [showCamera, setShowCamera] = useState(false);
  const [exerciseFinished, setExerciseFinished] = useState(false);

  const videoUrl = videosBySubLevel[subLevel] || null;

  const startExercise = () => {
    setShowCamera(true);
  };

  const finishExercise = async () => {
    const nextWeek = week + 1;
    const saved = await AsyncStorage.getItem('unlockedWeeks');
    const current = parseInt(saved) || 1;

    if (nextWeek > current && nextWeek <= 8) {
      await AsyncStorage.setItem('unlockedWeeks', String(nextWeek));
    }

    setExerciseFinished(true);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Semana {week} - Nível {level} - Exercício {subLevel}
      </Text>

      {videoUrl ? (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: videoUrl }}
            style={{ flex: 1 }}
            javaScriptEnabled
            allowsFullscreenVideo
          />
        </View>
      ) : (
        <Text style={styles.text}>Nenhum vídeo disponível para este subnível.</Text>
      )}

      {!showCamera && !exerciseFinished && (
        <GeneralButton
          title="Iniciar Exercício"
          color="#fad02c"
          onPress={startExercise}
        />
      )}

      {showCamera && !exerciseFinished && (
        <View style={styles.cameraContainer}>
          <CameraView /> 
          <GeneralButton
            title="Finalizar Exercício"
            color="#1abc9c"
            onPress={finishExercise}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgb(39, 62, 146)",
    padding: 20,
    paddingBottom: 80,
    paddingTop: 120,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  videoContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  cameraContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
});

export default Exercises;

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import GeneralButton from "../../components/GeneralButton";
import CameraView from "../../components/CameraView";

const videosBySubLevel = {
  1: "https://www.youtube.com/watch?v=2cufeBFlkq8", // respiração
  2: "https://www.youtube.com/watch?v=ZRexQ28CoXA", // alongamento
  3: "https://www.youtube.com/watch?v=DbuX_Fe3Yco", // sapinho
  4: "https://www.youtube.com/shorts/NZUY_Bz62vQ", // flat frog
  5: "https://www.youtube.com/watch?v=kiEmbhvv7Fo", // respiração sentada
  6: "https://www.youtube.com/shorts/9isTSsvmlZo", // alongamento piriforme
  7: "https://www.youtube.com/shorts/gJNCS2vyJrE", // dancinha
  8: "https://www.youtube.com/watch?v=zRGAn7RWyL8", // bicicletado
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
    const saved = await AsyncStorage.getItem("unlockedWeeks");
    const current = parseInt(saved) || 1;

    if (nextWeek > current && nextWeek <= 8) {
      await AsyncStorage.setItem("unlockedWeeks", String(nextWeek));
    }

    setExerciseFinished(true);
    navigation.navigate("Home");
  };

  // Mostrar a câmera em tela cheia quando ativa
  if (showCamera && !exerciseFinished) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView />
        <View style={styles.buttonOverlay}>
          <GeneralButton
            title="Finalizar Exercício"
            color="#1abc9c"
            onPress={finishExercise}
          />
        </View>
      </View>
    );
  }

  // Tela padrão com vídeo e botão
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Semana {week} - Nível {level} - Exercício {subLevel}
      </Text>

      {videoUrl && (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: videoUrl }}
            javaScriptEnabled
            allowsFullscreenVideo
            style={{ flex: 1 }}
          />
        </View>
      )}

      {!exerciseFinished && (
        <GeneralButton
          title="Iniciar Exercício"
          color="#fad02c"
          onPress={startExercise}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(39, 62, 146)",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  videoContainer: {
    width: "100%",
    height: 220,
    marginBottom: 20,
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
    position: "relative",
  },
  buttonOverlay: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: "center",
  },
});

export default Exercises;

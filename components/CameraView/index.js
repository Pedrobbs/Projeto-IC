import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Camera from 'expo-camera';

export default function CameraView() {
  const [hasPermission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);

  const cameraRef = useRef(null);

  useEffect(() => {
    requestPermission()
  }, []);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Verificando permissões...</Text>
      </View>
    );
  }

  if (!hasPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Permissão da câmera negada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.fullScreen}>
      <Camera.CameraView
        facing={'front'}
        style={styles.fullScreen}
        onCameraReady={handleCameraReady}
      />
      {!isCameraReady && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#fff" />
          <Text style={styles.loadingText}>Inicializando câmera...</Text>
        </View>
      )}
    </View>
  );
  
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
 
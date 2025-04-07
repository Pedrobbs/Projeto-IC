import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraView() {
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);

  const requestPermissionAndOpenCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      setShowCamera(true);
    }
  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  return (
    <View style={styles.container}>
      {!showCamera ? (
        <TouchableOpacity style={styles.button} onPress={requestPermissionAndOpenCamera}>
          <Text style={styles.buttonText}>Abrir Câmera</Text>
        </TouchableOpacity>
      ) : hasPermission === false ? (
        <Text>Permissão da câmera negada.</Text>
      ) : (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.front}
            onCameraReady={handleCameraReady}
          />
          {!isCameraReady && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.loadingText}>Inicializando câmera...</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    backgroundColor: '#1e90ff',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    width: '90%',
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
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
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

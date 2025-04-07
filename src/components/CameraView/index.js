import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';

console.log('📷 Camera importada:', Camera); // <- Verifica se o módulo está ok

export default function CameraView({ showCamera }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [mountError, setMountError] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!showCamera) return;

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [showCamera]);

  const handleCameraReady = () => {
    console.log('📷 Câmera pronta!');
    setIsCameraReady(true);
  };

  const handleMountError = (error) => {
    console.error('❌ Erro ao montar a câmera:', error);
    setMountError(error);
  };

  // Se a câmera não está sendo mostrada ainda
  if (!showCamera) return null;

  // Verificação de segurança se Camera não estiver carregado
  if (!Camera || !Camera.Constants || !Camera.Constants.Type) {
    return <Text>❌ Módulo da câmera não disponível. Verifique a instalação do expo-camera.</Text>;
  }

  if (hasPermission === null) return <Text>Solicitando permissão...</Text>;
  if (hasPermission === false) return <Text>Permissão negada.</Text>;
  if (mountError) return <Text>Erro ao abrir a câmera: {mountError.message}</Text>;

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        ref={cameraRef}
        onCameraReady={handleCameraReady}
        onMountError={handleMountError}
      />
      {!isCameraReady && <Text style={styles.status}>Inicializando câmera...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    marginTop: 20,
    overflow: 'hidden',
    borderRadius: 8,
  },
  camera: {
    flex: 1,
  },
  status: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});

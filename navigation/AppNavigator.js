import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import NiveisScreen from '../screens/NiveisScreen';
import VideoScreen from '../screens/VideoScreen';
import CameraScreen from '../screens/CameraScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Niveis" component={NiveisScreen} options={{ title: 'Níveis' }} />
        <Stack.Screen name="Video" component={VideoScreen} options={{ title: 'Vídeo' }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Câmera' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
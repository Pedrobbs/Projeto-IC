import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importando as páginas
import SplashScreen from "./src/pages/SplashScreen";
import Home from "./src/pages/Home";
import Levels from "./src/pages/Levels";
import Exercises from "./src/pages/Exercises";
import SubLevels from "./src/pages/SubLevels";

// Criando o Stack Navigator
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
              <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Levels" component={Levels} options={{ headerShown: false }} />
                <Stack.Screen name="SubLevels" component={SubLevels} options={{ headerShown: false }}  />
                <Stack.Screen name="Exercises" component={Exercises} options={{ headerShown: false }} /> 
            </Stack.Navigator> 
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

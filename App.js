import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Páginas existentes
import SplashScreen from "./src/pages/SplashScreen";
import Home from "./src/pages/Home";
import Levels from "./src/pages/Levels";
import Exercises from "./src/pages/Exercises";
import SubLevels from "./src/pages/SubLevels";


const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Levels" component={Levels} />
                <Stack.Screen name="SubLevels" component={SubLevels} />
                <Stack.Screen name="Exercises" component={Exercises} />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

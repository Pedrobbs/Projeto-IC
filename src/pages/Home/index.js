import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeekButton from '../../components/WeekButton';

const Home = ({ navigation }) => {
  const [unlockedWeeks, setUnlockedWeeks] = useState(1);

  useEffect(() => {
    const loadProgress = async () => {
      const saved = await AsyncStorage.getItem('unlockedWeeks');
      if (saved) setUnlockedWeeks(parseInt(saved));
    };
    loadProgress();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require("../../assets/logoPP.png")} style={styles.logo} />
        {Array.from({ length: 8 }, (_, index) => {
          const week = index + 1;
          const isLocked = week > unlockedWeeks;
          return (
            <WeekButton
              key={week}
              title={`Atividade ${week}`}
              onPress={() => !isLocked && navigation.navigate("Levels", { week })}
              color={isLocked ? "#aaa" : "#fad02c"}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgb(39, 62, 146)" },
  logo: {
    paddingTop: 40,
    width: 300,
    height: 300,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    paddingTop: 50,
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default Home;

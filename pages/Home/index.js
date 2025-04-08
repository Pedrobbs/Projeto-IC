import React from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import WeekButton from '../../components/WeekButton';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../../assets/logoPP.png")}
          style={styles.logo}
        />

        {Array.from({ length: 8 }, (_, index) => (
          <WeekButton
            key={index}
            title={`Semana ${index + 1}`}
            onPress={() => navigation.navigate("Levels", { week: index + 1 })}
          />
        ))}
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(39, 62, 146)",
  },
  logo: {
    paddingTop: 40,
    width: "100%",
    resizeMode: "contain",
    alignItems: "center",
    paddingVertical: 40,
    justifyContent: "center",
    width: 300,
    height: 300,
  },
  scrollContainer: {
    paddingTop: 50,
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default Home;

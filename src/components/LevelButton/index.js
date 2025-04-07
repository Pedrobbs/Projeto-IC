import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LevelButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fad02c", // Corrigido
    width: 200, // Corrigido
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 18,
    alignItems: "center", // Corrigido
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default LevelButton;

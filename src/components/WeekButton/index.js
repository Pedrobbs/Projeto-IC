import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const WeekButton = ({ title, onPress, color = "#fad02c" }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default WeekButton;
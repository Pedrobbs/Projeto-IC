import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const WeekButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  button: {
    backgroundColor: '#fad02c',
    paddingVertical: 13, // altura do botão
    width: 200,            // largura fixa para os botões
    alignItems: 'center',
    paddingHorizontal: 35,
    borderRadius: 50,           // cantos arredondados moderados
    borderWidth: 2,             // borda fina para destaque
    borderColor: '#fff',        // borda branca sutil
    shadowColor: '#000',        // sombra discreta
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,         // espaçamento entre os botões
  },
  buttonText: {
    color: '#000',              // texto preto para contraste
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WeekButton;
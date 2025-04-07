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
        backgroundColor: "#fad02c", //cor amarela
        width: 200, //largura fixa para os botões
        paddingVertical: 12, //altura do botão
        borderRadius: 8, //bordas arredondadas
        marginVertical: 10, //espaçamento entre os botoes
        alignItems: "center",
    },

    text:{
        fontSize: 16, //tamanho do texto
        fontWeight: "bold", // texto em negrito
        color: "#000", //texto preto
    },
});

export default WeekButton;
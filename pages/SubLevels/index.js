import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import LevelButton from "../../components/LevelButton";

const subLevelsByLevels = {
    1: [1], 2: [2], 3: [1, 2], 4: [1, 2, 3, 4],
    5: [1, 2, 3, 4], 6: [1, 3, 4, 6], 7: [5, 6], 8: [7],
    9: [1], 10: [2], 11: [1, 2], 12: [1, 2, 3, 4],
    13: [8], 14: [6], 15: [5, 6], 16: [7],
};

const SubLevels = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { week, level } = route.params;

    const subLevel = subLevelsByLevels[level] || [];

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Exercícios do nível {level}</Text>
            {subLevel.map(subLevel => (
                <LevelButton
                    key={subLevel}
                    title={`Exercicio ${subLevel}`}
                    onPress={() => navigation.navigate("Exercises", { week, level, subLevel })}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: 150, alignItems: 'center',
        backgroundColor: "rgb(39, 62, 146)",
    },
    title: {
        fontSize: 22, color: '#fff', marginBottom: 20, paddingBottom: 50,
    },
});

export default SubLevels;

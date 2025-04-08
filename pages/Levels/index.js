import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import LevelButton from "../../components/LevelButton";

const levelsByWeek = {
    1: [1, 2], 2: [3, 4], 3: [5, 6], 4: [7, 8],
    5: [9, 10], 6: [11, 12], 7: [13, 14], 8: [15, 16],
};

const Levels = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { week } = route.params;

    const levels = levelsByWeek[week] || [];

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Níveis da semana {week}</Text>
            {levels.map(level => (
                <LevelButton
                    key={level}
                    title={`Nível ${level}`}
                    onPress={() => navigation.navigate("SubLevels", { week, level })}
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

export default Levels;

import { StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native';
import React from 'react';


interface ResultProps {
    route: {
        params: {
            imageSource: ImageSourcePropType;
            predictedClass: string;
        };
    };
}

const Result: React.FC<ResultProps> = ({ route }) => {
    const { imageSource, predictedClass } = route.params;

    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.predictionText}>Predicted Class: {predictedClass}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: '80%',
        height: '50%',
        resizeMode: 'contain',
        marginBottom: 20,
    },
    predictionText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Result;

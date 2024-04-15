import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { RouteProp } from '@react-navigation/native';

// Define the type for the route parameters
type RootStackParamList = {
    Result: {
        imageSource: string;
        predictedClass: string;
    };
};

// Define the type for the Result screen route
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

interface ResultProps {
    route: {
        params: {
            imageSource: string;
            predictedClass: string;
        };
    };
}


const Result = ({ route }) => {
    const { imageSource, predictedClass } = route.params;
    // Define messages based on predicted class
    let message;
    switch (predictedClass) {
        case 'ORAL-CANCER':
            message = 'You have been predicted to have Oral Cancer.';
            break;
        case 'PRE-CANCER':
            message = 'You have been predicted to have Pre-Cancer.';
            break;
        case 'NORMAL':
            message = 'You have been predicted to be Normal.';
            break;
        default:
            message = 'Prediction not available.';
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: imageSource }} style={styles.image} />
            <Text style={styles.predictionText}>Predicted Class : {predictedClass}</Text>
            <View style={styles.messageContainer}>
                <Text style={styles.message}>{message}</Text>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: '80%',
        height: '50%',
        resizeMode: 'contain',
        marginBottom: 20,
    },
    predictionText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black'
    },
    messageContainer: {
        backgroundColor: '#f0f0f0',  // Light grey background color
        padding: 20,                 // Padding around the content
        borderRadius: 10,           // Rounded corners
        borderWidth: 1,              // Border width
        borderColor: '#ccc',         // Border color
        alignItems: 'center',        // Center content horizontally
        justifyContent: 'center',    // Center content vertically,

    }
});

export default Result;

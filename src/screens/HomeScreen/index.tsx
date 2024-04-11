import { Image, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { cameraPermisionServices } from '../../services/permission';
import { useNavigation } from '@react-navigation/native';
const logo = '../../assets/cusatlogo.png'

const HomeScreen = () => {
  const navigation: any = useNavigation();

  const onClickCamera = async () => {
    const permisionResult = await cameraPermisionServices();
    if (permisionResult) {
      console.log('NAVIGATE NEXT SCREEN');
      navigation.navigate('CameraScreen');
    }
  };

  return (

    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require(logo)}
          style={styles.logo}
        />
      </View>
      <Text style={styles.text}>
        ORAL CANCER DETECTION
      </Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={onClickCamera}>
          <Text style={styles.buttonText}>open camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {cameraPermisionServices} from '../../services/permission';
import {useNavigation} from '@react-navigation/native';

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
      <Text onPress={onClickCamera}>open camera</Text>
    </View>
  );
};

export default HomeScreen;

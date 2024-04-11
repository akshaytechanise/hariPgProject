import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import CameraComponent from '../../components/CameraComponent';
import { styles } from './styles';

const CameraScreen = () => {
  useEffect(() => {
    console.log("camera Screen")
  }, [])
  return (
    <View style={styles.container}>
      <CameraComponent photoUpdateFunction={() => { }} isLoading={false} />
    </View>
  );
};

export default CameraScreen;

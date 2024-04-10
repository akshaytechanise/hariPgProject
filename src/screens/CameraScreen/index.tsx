import {View, Text} from 'react-native';
import React from 'react';
import CameraComponent from '../../components/CameraComponent';
import {styles} from './styles';

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <CameraComponent photoUpdateFunction={() => {}} isLoading={false} />
    </View>
  );
};

export default CameraScreen;

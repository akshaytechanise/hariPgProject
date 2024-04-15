import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import CameraComponent from '../../components/CameraComponent';
import { styles } from './styles';
import useCameraHook from './useCameraHook';

const CameraScreen = () => {
  const { frameProcessor } = useCameraHook();

  return (
    <View style={styles.container}>
      <CameraComponent
        frameProcessor={frameProcessor}
        photoUpdateFunction={() => { }}
        isLoading={false}
      />
    </View>
  );
};

export default CameraScreen;

import {Camera} from 'react-native-vision-camera';
import React from 'react';

export const cameraPermisionServices = async () => {
  try {
    const newCameraPermission: any = await Camera.requestCameraPermission();
    console.log(newCameraPermission);

    if (newCameraPermission === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('error=======', err);
  }
};

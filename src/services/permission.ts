import {Camera} from 'react-native-vision-camera';
import React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

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

export const galleryPermissionServices = async () => {
  try {
    if (Platform.OS === 'android') {
      const galleryPermission =
        Platform.Version >= '33'
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const galleryPermissionStatus = await PermissionsAndroid.request(
        galleryPermission,
      );
      if (galleryPermissionStatus === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } else {
      // const galleryPermissionIOS = await requestMultiple([
      //   PERMISSIONS.IOS.PHOTO_LIBRARY,
      //   PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
      // ]);
      // if (
      //   galleryPermissionIOS["ios.permission.PHOTO_LIBRARY"] === "granted" &&
      //   galleryPermissionIOS["ios.permission.PHOTO_LIBRARY_ADD_ONLY"] ===
      //     "granted"
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
    }
  } catch (err) {
    console.log('error=====', err);
  }
};

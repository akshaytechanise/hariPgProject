import { Camera, useCameraDevices } from 'react-native-vision-camera';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Image,
  Text,
} from 'react-native';

import React, { useRef, useState, useEffect } from 'react';
//import ButtonComponent from "@app/components / CustomButton";
import { COLORS, SIZE, resHeight, resWidth } from './theams';
import { useNavigation } from '@react-navigation/native';

type infoType = {
  photoUpdateFunction: (value: any) => void;
  isLoading: boolean;
  frameProcessor: any;
};
const CameraComponent = (props: infoType) => {
  const { photoUpdateFunction, isLoading, frameProcessor } = props;
  const devices: any = useCameraDevices();
  const navigation = useNavigation();
  const backCamera = devices.find(
    (device: { type: string }) => device.type === 'back',
  ); // Find the back camera device
  const device = backCamera || devices[0]; // Use the first device if no back camera is found
  const camera = useRef<Camera>(null);
  const [imageData, setImageData] = useState('');
  const [takePhoto, setTakePhoto] = useState(false);

  useEffect(() => {
    console.log('camera component');
    console.log('device', device);
  }, [device]);

  useEffect(() => {
    console.log('camera component');
    console.log('device', device);
    console.log('devices.back', devices.back);
  }, []);

  if (device == null) return <ActivityIndicator />;
  // if (devices.length === 0 || backCamera === undefined) return <ActivityIndicator />;

  const takePicture = async () => {
    console.log('on take picture');
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        setImageData(photo.path);
        setTakePhoto(true);
        console.log('Photo details', photo);

        // const saveFolder = RNFS.DocumentDirectoryPath;
        // const fileName = `photo_${Date.now()}.jpg`;
        // const destPath = `${saveFolder}/${fileName}`;
        // await RNFS.moveFile(photo.path, destPath);

        //setImageData(destPath);
      } catch (err) {
        console.error('errorrrrr', err);
      }
    }
  };
  const retakePicture = () => {
    setTakePhoto(false);
    setImageData('');
  };

  const cancelCamera = () => {
    navigation.goBack(); // Navigate back to previous screen
  };

  console.log('LoadingStatus', isLoading);
  return (
    <View style={{ flex: 1 }}>
      {!takePhoto ? (
        <View style={styles.container}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
            frameProcessor={frameProcessor}
            pixelFormat="yuv"
          />
          <Pressable
            onPress={takePicture}
            style={styles.photoButton}></Pressable>
        </View>
      ) : (
        <View style={styles.imageViewContainer}>
          <Image
            source={{ uri: `file://${imageData}` }}
            style={styles.imageStyle}
            resizeMode={'cover'}
          />
          <View style={styles.buttonContainer}>
            <Pressable onPress={retakePicture} style={styles.retakeButton}>
              <Text style={styles.buttonText}>Retake</Text>
            </Pressable>

            <Pressable
              // onPress={handleUpload}
              onPress={() => console.log('Image Path:')}
              style={({ pressed }) => [
                styles.uploadButton,
                {
                  backgroundColor: pressed ? 'rgba(0, 0, 0, 0.2)' : 'blue', // Change color when pressed
                },
              ]}>
              <Text style={styles.buttonText}>Upload</Text>
            </Pressable>

            <Pressable onPress={cancelCamera} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};
export default CameraComponent;

const styles = StyleSheet.create({
  container: { flex: 1, flexGrow: 100 },
  imageViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
  },
  imageStyle: {
    height: resHeight(SIZE.width - 20),
    width: resWidth(SIZE.width - 20),
    borderRadius: resWidth((SIZE.width - 20) / 2),
    borderWidth: resWidth(4),
    borderColor: COLORS.primary,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonStyle: {
    marginTop: resHeight(20),
  },
  retakeButtonStyle: {
    marginTop: resHeight(15),
    backgroundColor: COLORS.white,
    borderWidth: resWidth(1),
    borderColor: COLORS.primary,
  },
  retakeButtonTextStyle: {
    color: COLORS.primary,
  },
  retakeButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 50,
    width: 100,
    height: 50,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 100,
    height: 50,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 150,
    height: 50,
  },

  photoButton: {
    width: resWidth(60),
    height: resHeight(60),
    borderRadius: resWidth(30),
    backgroundColor: 'red',
    position: 'absolute',
    bottom: resHeight(50),
    alignSelf: 'center',
  },
});

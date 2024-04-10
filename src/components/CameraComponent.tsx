import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Image,
  Text,
} from 'react-native';

import React, {useRef, useState} from 'react';
// import ButtonComponent from "@app/components/CustomButton";
import {COLORS, SIZE, resHeight, resWidth} from './theams';

type infoType = {
  photoUpdateFunction: (value: any) => void;
  isLoading: boolean;
};
const CameraComponent = (props: infoType) => {
  const {photoUpdateFunction, isLoading} = props;
  const devices: any = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);
  const [imageData, setImageData] = useState('');
  const [takePhoto, setTakePhoto] = useState(false);

  if (device == null) return <ActivityIndicator />;

  const takePicture = async () => {
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
        // setImageData(destPath);
      } catch (err) {
        console.error('errorrrrr', err);
      }
    }
  };
  console.log('LoadingStatus', isLoading);
  return (
    <View style={{flex: 1}}>
      {!takePhoto ? (
        <View style={styles.container}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <Pressable
            onPress={takePicture}
            style={styles.photoButton}></Pressable>
        </View>
      ) : (
        <View style={styles.imageViewContainer}>
          <Image
            source={{uri: `file://${imageData}`}}
            style={styles.imageStyle}
            resizeMode={'cover'}
          />

          <Pressable>
            <Text>Upload</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
export default CameraComponent;

const styles = StyleSheet.create({
  container: {flex: 1, flexGrow: 100},
  imageViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: resHeight(SIZE.width - 20),
    width: resWidth(SIZE.width - 20),
    borderRadius: resWidth((SIZE.width - 20) / 2),
    borderWidth: resWidth(4),
    borderColor: COLORS.primary,
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

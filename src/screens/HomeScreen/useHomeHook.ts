import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  cameraPermisionServices,
  galleryPermissionServices,
} from '../../services/permission';
import ImagePicker from 'react-native-image-crop-picker';
import { SIZE } from '../../components/theams';
import {
  useTensorflowModel,
  TensorflowModel,
  Tensor,
} from 'react-native-fast-tflite';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { convertToRGB } from 'react-native-image-to-rgb';

function tensorToString(tensor: Tensor): string {
  return `\n  - ${tensor.dataType} ${tensor.name}[${tensor.shape}]`;
}

function modelToString(model: TensorflowModel): string {
  return (
    `TFLite Model (${model.delegate}):\n` +
    `- Inputs: ${model.inputs.map(tensorToString).join('')}\n` +
    `- Outputs: ${model.outputs.map(tensorToString).join('')}`
  );
}

const useHomeHook = () => {
  const navigation: any = useNavigation();
  const model = useTensorflowModel(require('../../assets/efficientdet.tflite')); //model path
  const actualModel = model.state === 'loaded' ? model.model : undefined;

  console.log('actualModel====', actualModel);

  useEffect(() => {
    if (actualModel == null) return;
    console.log(`Model loaded! Shape:\n${modelToString(actualModel)}]`);
  }, [actualModel]);

  const onClickCamera = async () => {
    const permisionResult = await cameraPermisionServices();
    if (permisionResult) {
      console.log('NAVIGATE NEXT SCREEN');
      navigation.navigate('CameraScreen');
    }
  };

  const decodeResult = async (data: any) => {
    const result: any = actualModel?.runSync([data]);

    const outputTensor = result[0]; // Access the tensor
    const numDetections = 8400; // Total number of predictions
    const Alldetections = [];
    for (let i = 0; i < numDetections; i++) {
      const x = outputTensor[i];
      const y = outputTensor[i + 8400 * 1];
      const width = outputTensor[i + 8400 * 2];
      const height = outputTensor[i + 8400 * 3];
      const confidenceForclass1 = outputTensor[i + 8400 * 4];
      // console.log
      Alldetections.push({
        boundingBox: { x, y, width, height },
        score: confidenceForclass1,
      });
    }
    console.log('FINAL RESULT', Alldetections);
  };

  const convertImageToRGB = async (path: string) => {
    const convertedArray = await convertToRGB(path);
    let red = [];
    let blue = [];
    let green = [];
    for (let index = 0; index < convertedArray.length; index += 3) {
      red.push(convertedArray[index] / 255);
      green.push(convertedArray[index + 1] / 255);
      blue.push(convertedArray[index + 2] / 255);
    }
    const finalArray = [...red, ...green, ...blue];
    //convert to Uint8 array buffer (but some models require float32 format)
    const arrayBuffer = new Uint8Array(finalArray);

    // console.log('CONVERT RGB RESULT===', arrayBuffer);

    return arrayBuffer;
  };

  const resizeImage = async (uri: string, width: number, height: number) => {
    try {
      const response = await ImageResizer.createResizedImage(
        uri,
        width,
        height,
        'JPEG',
        100,
        0,
        undefined,
        true,
        { mode: 'stretch' },
      );
      console.log(response.height, 'x', response.width, ' img');
      return response.uri;
    } catch (err) {
      console.error('ERROR IN RESIZE', err);
      return null;
    }
  };

  const onClickGallery = async () => {
    const permisionResult = await galleryPermissionServices();
    if (permisionResult) {
      console.log('OPEN GALLERY');
      await ImagePicker.openPicker({
        width: 320,
        height: 320,
        cropping: true,
        mediaType: 'photo',
      })
        .then(async image => {
          // setIsEditVisible(false);
          // imageUpdateFunction(image);
          console.log('IMAGE DATA====', image);

          const resized: any = await resizeImage(image?.path, 320, 320);
          console.log('IMAGE RESIZE====', resized);
          const rgbResult = await convertImageToRGB(resized);
          decodeResult(rgbResult);
        })
        .catch(err => {
          console.log('Gallery error', err);
        });
      // navigation.navigate('CameraScreen');
    }
  };

  return { onClickCamera, onClickGallery };
};

export default useHomeHook;

import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import Result from '../ResultScreen/result';


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

  const [predictedClass, setPredictedClass] = useState('');
  const [imageSource, setImageSource] = useState<string | null>(null);

  const model = useTensorflowModel(require('../../assets/resnet.tflite')); //model path
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

    const outputTensor = result[0];
    // Define your class labels array
    const classLabels: string[] = ["NORMAL", "PRE-CANCER", "ORAL-CANCER"]; // Replace with your actual class labels

    // Find the maximum value and its index
    let maxIndex = 0;
    let maxValue = outputTensor[0];
    for (let i = 1; i < outputTensor.length; i++) {
      if (outputTensor[i] > maxValue) {
        maxIndex = i;
        maxValue = outputTensor[i];
      }
    }

    // Get the corresponding class label
    const maxClass = classLabels[maxIndex];

    console.log("Confidence:", maxValue);
    //console.log("Index of maximum value:", maxIndex);
    console.log("prediction:", maxClass);
    // console.log('FINAL RESULT', Alldetections);
    console.log('out', outputTensor)


    setPredictedClass(maxClass);


    navigation.navigate('Result', { predictedClass, imageSource });

  };

  const convertImageToRGB = async (path: string) => {
    const convertedArray = await convertToRGB(path);
    let red = [];
    let blue = [];
    let green = [];
    for (let index = 0; index < convertedArray.length; index += 3) {
      red.push(convertedArray[index]);
      green.push(convertedArray[index + 1]);
      blue.push(convertedArray[index + 2]);
    }
    const finalArray = [...red, ...green, ...blue];
    //convert to Uint8 array buffer (but some models require float32 format)
    const arrayBuffer = new Float32Array(finalArray);

    // console.log('CONVERT RGB RESULT===', arrayBuffer);
    // Convert Uint8Array to Float32Array


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
        width: 224,
        height: 224,
        cropping: true,
        mediaType: 'photo',
      })
        .then(async image => {
          // setIsEditVisible(false);
          // imageUpdateFunction(image);
          console.log('IMAGE DATA====', image);
          //***************//
          setImageSource(image.path);
          //***************//

          const resized: any = await resizeImage(image?.path, 224, 224);
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

  return { onClickCamera, onClickGallery, predictedClass, imageSource };
};

export default useHomeHook;

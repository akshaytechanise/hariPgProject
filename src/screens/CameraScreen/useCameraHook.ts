import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import {
  Tensor,
  TensorflowModel,
  useTensorflowModel,
} from 'react-native-fast-tflite';
import { useFrameProcessor } from 'react-native-vision-camera';
import { useResizePlugin } from 'vision-camera-resize-plugin';

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

const useCameraHook = () => {
  const { resize } = useResizePlugin();
  const model = useTensorflowModel(require('../../assets/resnet.tflite')); //model path
  const actualModel = model.state === 'loaded' ? model.model : undefined;

  console.log('actualModel====', actualModel);

  useEffect(() => {
    if (actualModel == null) return;
    console.log(`Model loaded! Shape:\n${modelToString(actualModel)}]`);
  }, [actualModel]);

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      if (actualModel == null) {
        // model is still loading...
        return;
      }

      console.log(`Running inference on ${frame}`);
      const config: any = {
        scale: {
          width: 224,
          height: 224,
        },
        pixelFormat: 'rgb',
        dataType: 'float32',
      };
      const resized = resize(frame, config);
      const result = actualModel.runSync([resized]);
      // const num_detections = result[3]?.[0] ?? 0;
      // console.log('Result: ' + num_detections);
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
    },
    [actualModel],
  );

  return { frameProcessor };
};

export default useCameraHook;

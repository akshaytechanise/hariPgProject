import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {
  Tensor,
  TensorflowModel,
  useTensorflowModel,
} from 'react-native-fast-tflite';
import {useFrameProcessor} from 'react-native-vision-camera';
import {useResizePlugin} from 'vision-camera-resize-plugin';

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
  const {resize} = useResizePlugin();
  const model = useTensorflowModel(require('../../assets/efficientdet.tflite')); //model path
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
          width: 320,
          height: 320,
        },
        pixelFormat: 'rgb',
        dataType: 'uint8',
      };
      const resized = resize(frame, config);
      const result = actualModel.runSync([resized]);
      const num_detections = result[3]?.[0] ?? 0;
      console.log('Result: ' + num_detections);
    },
    [actualModel],
  );

  return {frameProcessor};
};

export default useCameraHook;

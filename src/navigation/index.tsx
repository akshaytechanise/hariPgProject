import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackType} from './navigationType';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';

const Navigation = () => {
  const Stack = createNativeStackNavigator<RootStackType>();

  return (
    <React.Fragment>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: false, gestureEnabled: true}}>
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'CameraScreen'} component={CameraScreen} />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default Navigation;
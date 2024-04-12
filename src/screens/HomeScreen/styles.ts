import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    // alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 27,
    marginVertical: 29,
    color: 'black',
  },
  button: {
    width: 150,
    height: 60,
    backgroundColor: '#3366ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

import { Image, View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import React from 'react';
import { styles } from './styles';

const logo = '../../assets/cusatlogo.png';
import useHomeHook from './useHomeHook';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { onClickCamera, onClickGallery } = useHomeHook();

  return (
    <View style={styles.container}>


      <View style={styles.logoContainer}>
        <Image source={require(logo)} style={styles.logo} />
      </View>
      <Text style={styles.text}>ORAL CANCER DETECTION</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={onClickCamera}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onClickGallery}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

export default HomeScreen;

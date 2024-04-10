import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export const COLORS = {
  primary: '#3E8285',
  black: '#000',
  black2: '#202030',
  black3: 'rgba(32, 32, 48, 0.60)',
  white: '#fff',
  gray: '#a2a6a3',
  gray2: '#908F8F',
  blue: '#424bf5',
  light_gray: '#E0E0E0',
  smoke_gray: '#F5F5F5',
  peach: '#f66',
  grayShade: 'rgba(32, 32, 48, 0.25)',
  grayShade2: '#D9D9D9',
  grayShade3: '#F1F3F4',
  grayShade4: '#D9D9D9',
  grayShade5: 'rgba(32, 32, 48, 0.07)',
  grayShade6: 'rgba(32, 32, 48, 0.60)',
  white2: '#CCC',
};

export const SIZE = {
  width: width,
  height: height,
};

export const FONTS = {
  extraBold: {
    fontFamily: 'Montserrat-ExtraBold',
  },
  bold: {
    fontFamily: 'Montserrat-Bold',
  },
  semiBold: {
    fontFamily: 'Montserrat-SemiBold',
  },
  medium: {
    fontFamily: 'Montserrat-Medium',
  },
  regular: {
    fontFamily: 'Montserrat-Regular',
  },
  light: {
    fontFamily: 'Montserrat-Light',
  },
  extraLight: {
    fontFamily: 'Montserrat-ExtraLight',
  },
};

export const resHeight = (heightData: any) => {
  const calHeight = (100 * heightData) / height;
  return responsiveHeight(calHeight);
};

export const resWidth = (widthData: any) => {
  const calWidth = (100 * widthData) / width;
  return responsiveWidth(calWidth);
};

export const resFont = (fontData: any) => {
  const calFont = (100 * fontData) / height;
  return responsiveFontSize(calFont);
};

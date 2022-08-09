import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
export default function Loader() {
  return (
    <View style={[ StyleSheet.absoluteFillObject, styles.conatoner ]}>
        <LottieView            
            source={require('../../assets/lottie/98195-loader.json')}
             autoPlay
         />
    </View>
  )
  };
  const styles = StyleSheet.create({
    conatoner: {
        justifyContent: 'center',
        alignItems: 'center'
    }
  })
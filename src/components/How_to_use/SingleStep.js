import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SingleStep = ({title, image}) => {
  const {width, height} = Dimensions.get('window');

  return (
    <View style={{alignItems: 'center', gap: 10, margin: 15}}>
      <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
        Step:{title}
      </Text>
      <Image
        source={image}
        width={width}
        height={height}
        resizeMode="cover"
        style={{borderRadius: 15}}
      />
    </View>
  );
};

export default SingleStep;

const styles = StyleSheet.create({});

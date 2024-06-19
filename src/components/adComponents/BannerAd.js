import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BannerView} from 'react-native-fbads';

const BannerAd = ({placement_id}) => {
  return (
    <BannerView
      placementId={placement_id}
      type="standard"
      onPress={() => console.log('click')}
      onLoad={() => console.log('loaded')}
      onError={err => console.log('error', err)}
    />
  );
};

export default BannerAd;

const styles = StyleSheet.create({});

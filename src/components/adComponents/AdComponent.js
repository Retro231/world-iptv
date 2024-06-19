import React from 'react';
import {Dimensions, View, Text} from 'react-native';
import {
  AdIconView,
  MediaView,
  AdChoicesView,
  TriggerableView,
  withNativeAd,
} from 'react-native-fbads';
const {width} = Dimensions.get('window');

const AdComponent = props => {
  return (
    <View
      style={{
        flexDirection: 'column',
        borderWidth: 1,
        // backgroundColor: '#fff',
        padding: 10,
      }}>
      <MediaView style={{height: width / 2}} />
      <View style={{flexDirection: 'row'}}>
        {/* <AdIconView style={{width: 80, height: 80}} /> */}
        <View style={{flexDirection: 'column', paddingHorizontal: 10, flex: 1}}>
          <TriggerableView style={{fontSize: 18, color: 'black'}}>
            {props.nativeAd.headline}
          </TriggerableView>
          <Text style={{color: 'black'}}>
            {props.nativeAd.sponsoredTranslation}
          </Text>
          <TriggerableView style={{fontSize: 10, color: 'black'}}>
            {props.nativeAd.linkDescription}
          </TriggerableView>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TriggerableView
          style={{
            fontSize: 15,
            color: '#fff',
            paddingVertical: 10,
            paddingHorizontal: 30,
            elevation: 3,
            borderTopWidth: 0,
            margin: 10,
            borderRadius: 6,
            backgroundColor: '#3987ed',
          }}>
          {props.nativeAd.callToActionText}
        </TriggerableView>
      </View>
    </View>
  );
};

export default withNativeAd(AdComponent);

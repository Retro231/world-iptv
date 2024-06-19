import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import Header from '../Header/Header';
import {useNavigation} from '@react-navigation/native';

const CardWebView = ({route}) => {
  const webViewRef = useRef(null);
  const {mainUri} = route.params;
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);
  const renderError = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{color: 'red', fontSize: 18}}>Failed to load the page!</Text>
      <Text style={{color: 'red', fontSize: 18, textAlign: 'center'}}>
        Check your internet connection! Or try again later.
      </Text>
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <Header goBackTo={'oneStep'} />
      <WebView
        ref={webViewRef}
        source={{uri: mainUri}}
        // onLoad={handleSourceUrlLoad}
        style={{flex: 1}}
        scrollEnabled={true} // Allow scrolling
        // onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        maximumZoomScale={1} // Set maximum zoom level
        minimumZoomScale={1} // Set minimum zoom level
        startInLoadingState={true}
        // onLoadEnd={handleLoadEnd}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          setError(true);
        }}
        onHttpError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          setError(true);
        }}
        renderError={renderError}
      />
    </View>
  );
};

export default CardWebView;

const styles = StyleSheet.create({});

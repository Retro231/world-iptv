import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {ChannelsContext} from '../../Context/ChannelsContext';
import SingleStreamModal from '../Single_Stream/SingleStreamModal';
import {SearchContext} from '../../Context/SearchContext';
import {globalColors, globalVariables} from '../../global';

const Header = ({title, goBackTo, refreshData}) => {
  const [singleStreamModalVisible, setSingleStreamModalVisible] =
    useState(false);
  // const [searchText, setSearchText] = useState('');
  const {data, setData} = useContext(ChannelsContext);
  const {searchValue, setSearchValue} = useContext(SearchContext);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const textInputRef = useRef(null);
  const [currentScreen, setCurrentScreen] = useState('Home');

  // Track the current route
  const state = useNavigationState(state => state);

  useEffect(() => {
    if (state) {
      const route = state.routes[state.index].name;
      setCurrentScreen(route);
    }
  }, [state]);

  // To focus searchTextInput
  useEffect(() => {
    if (textInputRef.current && isSearchClicked === true) {
      textInputRef.current.focus();
    }
  }, [isSearchClicked]);

  const navigation = useNavigation();
  const handleGoBack = () => {
    if (goBackTo === 'oneStep') {
      navigation.goBack(null);
    } else if (goBackTo === 'twoStep') {
      navigation.pap(2);
    } else if (goBackTo === 'home') {
      navigation.popToTop();
    }
  };
  // single stream
  const handleSingleStream = () => {
    setSingleStreamModalVisible(() => !singleStreamModalVisible);
  };

  // menu btn
  const handleMenu = () => {
    navigation.openDrawer();
  };

  const handleSearchTextChange = text => {
    setSearchValue(text);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerLeft}>
          {!goBackTo && (
            <TouchableOpacity onPress={handleMenu}>
              <Icon name="menu" size={24} color={globalColors.primaryText} />
            </TouchableOpacity>
          )}

          {goBackTo && (
            <TouchableOpacity onPress={handleGoBack}>
              <Icon
                name="arrow-back"
                size={24}
                color={globalColors.primaryText}
              />
            </TouchableOpacity>
          )}

          <Text style={styles.logo}>{title}</Text>
        </View>
        <View style={styles.actionBtn}>
          {data !== null && (
            <>
              {/* <TextInput
              onChangeText={handleSearchTextChange}
              value={searchValue}
            /> */}
              <TouchableOpacity
                onPress={() => setIsSearchClicked(!isSearchClicked)}
                disabled={
                  currentScreen === 'How To Use' ||
                  currentScreen === 'Privacy Policy'
                }>
                <Icon
                  name="search"
                  size={24}
                  color={
                    currentScreen === 'How To Use' ||
                    currentScreen === 'Privacy Policy'
                      ? '#d9d9d9'
                      : globalColors.primaryText
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSingleStream}>
                <Icon
                  name="play-circle"
                  size={24}
                  color={globalColors.primaryText}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={refreshData}
                disabled={
                  currentScreen === 'How To Use' ||
                  currentScreen === 'Privacy Policy'
                }>
                <Icon
                  name="refresh"
                  size={24}
                  color={
                    currentScreen === 'How To Use' ||
                    currentScreen === 'Privacy Policy'
                      ? '#d9d9d9'
                      : globalColors.primaryText
                  }
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* single stream */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={singleStreamModalVisible}
          onRequestClose={() => {
            setSingleStreamModalVisible(!singleStreamModalVisible);
          }}>
          <SingleStreamModal onClose={handleSingleStream} />
        </Modal>
      </View>

      {isSearchClicked && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: globalColors.primaryBackground,
            alignItems: 'center',
            position: 'relative',
          }}>
          <TextInput
            style={{
              borderWidth: 1,
              padding: 0,
              width: Dimensions.get('window').width - 50,
              borderColor: globalColors.primaryText,
              borderRadius: 10,
              paddingHorizontal: 10,
              color: globalColors.primaryText,
            }}
            ref={textInputRef}
            onChangeText={handleSearchTextChange}
            value={searchValue}
          />

          <TouchableOpacity
            onPress={() => {
              setIsSearchClicked(!isSearchClicked);
              setSearchValue('');
            }}>
            <Icon name="close" size={24} color={globalColors.primaryText} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: globalColors.primaryBackground,
    alignItems: 'center',
    position: 'relative',
    width: Dimensions.get('screen').width,
  },
  headerLeft: {
    flexDirection: 'row',
    gap: 20,
    width: '70%',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalColors.primaryText,
    textTransform: 'uppercase',
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width: '30%',
  },
  menu: {
    position: 'absolute',
    top: 10,
    right: 0,
    zIndex: 999,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 44,
    backgroundColor: globalColors.primaryBackground,
    position: 'relative',
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    width: Dimensions.get('window').width - 100,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    margin: 5,
    color: globalColors.secondaryText,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: globalColors.primaryBackground,
    padding: 3,
    margin: 10,
    width: 250,
    borderRadius: 5,
    fontSize: 16,
  },
});

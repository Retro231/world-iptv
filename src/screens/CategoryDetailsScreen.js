import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';
import ChannelCard from '../components/ChannelCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SearchContext} from '../Context/SearchContext';
import {getMergedChannels} from '../helper/getMergedChannels';
import {getChannels} from '../helper/getChannels';
import {globalColors, globalVariables} from '../global';
import Header from '../components/Header/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ChannelsContext} from '../Context/ChannelsContext';
import {InterstitialAdManager} from 'react-native-fbads';
import updateChannels from '../helper/updateChannels';
const headItem = [
  {
    id: 1,
    name: 'Channel',
    iconName: 'playlist-play',
    iconSize: 22,
  },
  {
    id: 2,
    name: 'Favourite',
    iconName: 'favorite',
    iconSize: 20,
  },
];

const CategoryDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [active, setActive] = useState(1);
  const [favChannels, setFavChannels] = useState([]);
  const {searchValue, setSearchValue} = useContext(SearchContext);
  const {data, setData} = useContext(ChannelsContext);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  // update
  const [mainList, setMainList] = useState([]);
  const {countryCode, countryName, flag} = route.params;

  const parseChannels = async () => {
    setLoading(true);

    const jsonValue = await AsyncStorage.getItem('favourite');
    let storedFavChannels = jsonValue !== null ? JSON.parse(jsonValue) : [];

    const channels = await getChannels(countryCode);
    const mergedChannels = await getMergedChannels(channels, storedFavChannels);
    setData(mergedChannels);
    setMainList(mergedChannels);
    setFavChannels(storedFavChannels);
    setLoading(false);
  };

  useEffect(() => {
    // getStoredChannels();
    parseChannels();
  }, []);

  useEffect(() => {
    setMainList(data);
  }, [data]);

  // activate when user click on fav icon.
  const handleFavourite = async item => {
    //set favourite property to the item,,
    const {channels, favouriteChannels} = await updateChannels(data, item);
    setMainList(channels);
    setFavChannels(favouriteChannels);

    let exists = favChannels.filter(element => element.tvgId === item.tvgId);
    if (exists.length === 0) {
      Snackbar.show({
        text: 'Saved to favorite.',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      Snackbar.show({
        text: 'Removed to favorite.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const saveFavourite = async data => {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('favourite', jsonValue);
  };

  useEffect(() => {
    saveFavourite(favChannels);
  }, [favChannels]);

  const handlePress = id => {
    setActive(id);
  };

  // search

  const filterSearch = async (array, value) => {
    const filteredData = array.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase()),
    );
    return filteredData;
  };

  const handleSearch = async () => {
    if (searchValue.length > 0) {
      const searchResult = await filterSearch(mainList, searchValue);
      setMainList(searchResult);
    } else {
      setMainList(data);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  // pull func
  const pullMe = async () => {
    setRefresh(true);
    // /do something...
    parseChannels();

    setRefresh(false);
  };
  const handleRefresh = () => {
    parseChannels();
  };
  const backAction = () => {
    setMainList([]);
    navigation.goBack();
    // show ad
    InterstitialAdManager.showAd(globalVariables.InterstitialAdId)
      .then(didClick => {})
      .catch(error => {
        console.log('err', error);
      });
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <Header
        title={`${flag} ${countryName}`}
        goBackTo={'oneStep'}
        refreshData={handleRefresh}
      />
      <View style={styles.categorayHead}>
        {headItem.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item.id)}
            style={[
              styles.headItem,
              {
                backgroundColor:
                  active === item.id
                    ? globalColors.secondaryBackground
                    : globalColors.primaryBackground,
              },
            ]}>
            <Icon
              name={item.iconName}
              size={item.iconSize}
              color={active === item.id ? '#fff' : globalColors.primaryText}
            />
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: active === item.id ? '#fff' : globalColors.primaryText,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {!loading && (
        <View style={styles.contentWrapper}>
          <FlatList
            data={active === 1 ? mainList : favChannels}
            numColumns={2}
            horizontal={false}
            renderItem={({item}) => (
              <ChannelCard data={item} handleFavourite={handleFavourite} />
            )}
            keyExtractor={item => item.tvgId}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
            }
          />
        </View>
      )}
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator
            size="large"
            color={globalColors.primaryBackground}
          />
        </View>
      )}
    </View>
  );
};

export default CategoryDetailsScreen;

const styles = StyleSheet.create({
  categorayHead: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    // borderTopWidth: 2,
    // borderTopColor: globalColors.secondaryBackground,
    borderBottomWidth: 3,
    borderBottomColor: globalColors.secondaryBackground,
  },
  headItem: {
    backgroundColor: 'gray',
    width: Dimensions.get('window').width / headItem.length,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
  },
});

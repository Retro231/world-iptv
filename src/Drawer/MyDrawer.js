import {createDrawerNavigator} from '@react-navigation/drawer';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Home from '../screens/Home';
import HowToUse from '../screens/HowToUse';
import MyCustomDrawer from './MyCustomDrawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {globalColors} from '../global';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {marginLeft: -25},
        drawerActiveTintColor: globalColors.primaryBackground,
      }}
      drawerContent={props => <MyCustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({color}) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="How To Use"
        component={HowToUse}
        options={{
          drawerIcon: ({color}) => <Icon name="help" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="security" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MyDrawer;

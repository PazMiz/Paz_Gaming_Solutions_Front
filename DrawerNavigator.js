import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FriendList from './FriendList'; // Import your FriendList component
import XboxScreen from './XboxScreen'; // Import your XboxScreen component
import MainScreen from './MainScreen'; // Import your MainScreen component
import Login from './Login'; // Import your Login component
import Register from './Register'; // Import your Register component
import AboutMyApp from './AboutMyApp'; // Import your AboutMyApp component
import PC_Games from './PC_Games'; // Import your PC_Games component

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        initialRouteName="MainScreen"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="FriendList" component={FriendList} />
        <Drawer.Screen name="XboxScreen" component={XboxScreen} />
        <Drawer.Screen name="MainScreen" component={MainScreen} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="AboutMyApp" component={AboutMyApp} />
        <Drawer.Screen name="PC_Games" component={PC_Games} />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    );
  };
  
export default DrawerNavigator;

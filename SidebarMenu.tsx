// SidebarMenu.tsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

const SidebarMenu = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(screenName);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigateToScreen('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Dashboard')}>
        <Text>Dashboard</Text>
      </TouchableOpacity>
      {/* Add more menu items as needed */}
    </View>
  );
};

export default SidebarMenu;

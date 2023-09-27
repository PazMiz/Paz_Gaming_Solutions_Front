import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './MainScreen';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import AboutScreen from './About';
import TopicsScreen from './PCScreen';
import FriendList from './FriendList'; // Import the FriendList component
import XboxScreen from './XboxScreen'; // Assuming XboxScreen.js or XboxScreen.tsx is in the same directory as your other components
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="HomePage" component={HomeScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Register" component={RegisterScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="PC" component={TopicsScreen} />
        <Tab.Screen name="XBOX" component={XboxScreen} />
        <Tab.Screen name="FriendList" component={FriendList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { View, Image, Text, StatusBar, TouchableOpacity } from 'react-native';
import styles from './styles'; // Import styles from the styles.ts file
import NavigationButton from './NavigationButton'; // Import the NavigationButton component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaceholderImage = require('./assets/images/one-piece-luffy-iphone-rueztob7egpu3b33.jpg');

const MainScreen: React.FC = () => {
  const navigation = useNavigation();
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);

  useEffect(() => {
    fetchUserDisplayName();
  }, []);

  const fetchUserDisplayName = async () => {
    try {
      const displayName = await AsyncStorage.getItem('userDisplayName');
      setUserDisplayName(displayName);
    } catch (error) {
      console.error('Error fetching user display name:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={PlaceholderImage} style={styles.backgroundImage} />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {/* <NavigationButton text="Login" routeName="Login" />
        <NavigationButton text="Register" routeName="Register" />
        <NavigationButton text="AboutMyApp" routeName="About" />
        <NavigationButton text="PC_Games" routeName="Topics" />
        <NavigationButton text="FriendList" routeName="FriendList" />
        <NavigationButton text="XboxScreen" routeName="XboxScreen" /> */}
      </View>

      {/* User Greeting */}
      {userDisplayName ? (
        <Text style={styles.userGreeting}>Hello, {userDisplayName}!</Text>
      ) : (
        <Text style={styles.userGreeting}>Please log in to see your name.</Text>
      )}

      {/* Welcome Text */}
      <Text style={styles.headerText}>
        {'\n'}
        <Text style={styles.welcomeText}>Welcome to</Text>
        {'\n'}
        <Text style={styles.appName}>Paz App:</Text>
        {'\n'}
        <Text style={styles.appName}>Gaming Social Solutions</Text>
      </Text>

      <StatusBar hidden />

      {/* Logout Button (Conditional Rendering) */}
      {userDisplayName && (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            // Handle logout logic
            // For example, clear user data from AsyncStorage
            // Then navigate to the Login screen
            await AsyncStorage.removeItem('userDisplayName');
            (navigation.navigate as (param: string) => void)('Login');
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MainScreen;

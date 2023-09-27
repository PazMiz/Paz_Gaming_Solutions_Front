import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your Django development server URL

interface Friend {
  id: number;
  // username: string;
  friends: string[]; // Assuming friends are represented as an array of usernames
}

interface User {
  username: string;
  // Add other user-related properties if needed
}

const FriendList: React.FC = () => {
  const [friendIds, setFriendIds] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const [userDisplayName, setUserDisplayName] = useState(''); // State to store the user's display name

  useEffect(() => {
    checkLoginStatus();
    fetchFriends();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedInValue = await AsyncStorage.getItem('isLoggedIn');

      if (isLoggedInValue === 'true') {
        // User is logged in, set isLoggedIn state to true and get the display name
        setIsLoggedIn(true);
        const displayName = await AsyncStorage.getItem('userDisplayName');
        setUserDisplayName(displayName || '');
      } else {
        // User is not logged in, set isLoggedIn state to false
        setIsLoggedIn(false);
        // Handle the case where the user is not logged in, e.g., redirect to login screen
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const fetchFriends = async () => {
    try {
      const response = await axios.get<Friend[]>(`${API_BASE_URL}/api/friends/`);
      console.log('Friends Data:', response.data);

      // Fetch user information for each friend based on their username
      const friendNames = await Promise.all(
        response.data.map(async (friend) => {
          // const userResponse = await axios.get<User>(`${API_BASE_URL}/api/users/${friend.username}/`);
          return {
            id: friend.id,
            // username: userResponse.data.username,
            friends: friend.friends,
          };
        })
      );

      setFriends(friendNames); // Update the state after fetching is complete
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const addFriends = async () => {
    try {
      const response = await axios.post<void>(
        `${API_BASE_URL}/api/friends/add/`,
        {
          user: null, // Pass null as the user since the user is not authenticated
          friends: friendIds.split(',').map((id) => Number(id)),
        }
      );
      setFriendIds('');
      fetchFriends(); // Refresh the friends list after adding friends
    } catch (error) {
      console.error('Error adding friends:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Friends</Text>
      {isLoggedIn && (
        <Text style={styles.loggedInUser}>Logged in as: {userDisplayName}</Text>
      )}
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.friendContainer}>
            {/* <Text style={styles.friendUsername}>{item.username}</Text> */}
            <Text style={styles.friendInfo}>Friends: {item.friends.join(', ')}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter friend IDs (comma-separated)"
        value={friendIds}
        onChangeText={(text) => setFriendIds(text)}
      />
      <Button title="Add Friends" onPress={addFriends} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loggedInUser: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  friendInfo: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default FriendList;

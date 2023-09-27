import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import TopicItem from './PC/TopicItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PCScreen: React.FC = () => {
  const [topics, setTopics] = useState([]);
  const [topicData, setTopicData] = useState({
    topic: '',
    author: '', // This will be prepopulated with the logged-in user's username
    text: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const [userDisplayName, setUserDisplayName] = useState(''); // State to store the user's display name

  const navigation = useNavigation();

  useEffect(() => {
    checkLoginStatus(navigation); // Check if the user is logged in before rendering the component
    fetchTopics();
  }, []);

  const checkLoginStatus = async (navigation) => {
    const isLoggedInValue = await AsyncStorage.getItem('isLoggedIn');

    if (isLoggedInValue === 'true') {
      // User is logged in, set isLoggedIn state to true and get the display name
      setIsLoggedIn(true);
      const displayName = await AsyncStorage.getItem('userDisplayName');
      setUserDisplayName(displayName);
      // Prepopulate the author field
      setTopicData(prevData => ({ ...prevData, author: displayName }));
    } else {
      // User is not logged in, set isLoggedIn state to false
      setIsLoggedIn(false);
      // Redirect to the login screen or take any other action
      navigation.navigate('Login'); // Assuming your login screen is named 'Login'
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setTopicData(prevData => ({ ...prevData, [key]: value }));
  };

  const fetchTopics = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/topics/');
      setTopics(response.data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/topics/', topicData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // Topic created successfully, you can handle the response here
        console.log('Topic created:', response.data);
        // Clear the form
        setTopicData({
          topic: '',
          author: userDisplayName, // Set it to the logged-in user's username
          text: '',
        });
        // Refresh the topic list
        fetchTopics();
      } else {
        console.error('Error creating topic:', response.data);
      }
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };


  const handleDelete = async (topicId) => {
    // Display an alert to confirm the delete action
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel', // This will close the alert
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // User confirmed the delete action, so proceed with deletion
              await axios.delete(`http://127.0.0.1:8000/topics/${topicId}/`);
              setTopics(topics.filter((topic) => topic.id !== topicId));
            } catch (error) {
              console.error('Error deleting topic:', error);
            }
          },
          style: 'destructive', // This will highlight the button as red
        },
      ],
      { cancelable: true } // Allow the user to cancel by tapping outside the alert
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./media/photos/pcgames.png')}
        style={styles.pcImage}
      />
      <Text style={styles.title}>PC Topics</Text>
      <TextInput
        style={styles.input}
        placeholder="PC Title"
        value={topicData.topic}
        onChangeText={(value) => handleInputChange('topic', value)}
      />
      {/* Show the username (author) */}
      <Text style={styles.username}>{topicData.author}</Text>
      <TextInput
        style={styles.input}
        placeholder="Text"
        value={topicData.text}
        onChangeText={(value) => handleInputChange('text', value)}
      />
      {/* Conditional rendering for Create Post button */}
      {isLoggedIn === true ? (
        <Button title="Create Post" onPress={handleSubmit} />
      ) : (
        <Text>Please log in to create posts.</Text>
      )}
      {isLoggedIn === true ? (
        <FlatList
          data={topics}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TopicItem topic={item.topic} author={item.author} text={item.text} />
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}
              >
                <Button title="Delete" onPress={() => handleDelete(item.id)} />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.loginMessage}>Please log in to view PC Post. © PazMiz</Text>


      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  username: {
    marginBottom: 10,
    padding: 10,
    color: 'white',
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  deleteButton: {
    marginLeft: 10,
  },
  pcImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
  },


  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginMessage: {
    color: 'red', // Set text color to red
    fontSize: 40,

  },


});

export default PCScreen;

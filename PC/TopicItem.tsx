import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TopicItemProps {
  topic: string;
  author: string;
  text: string; // Add this prop for topic text
}

const TopicItem: React.FC<TopicItemProps> = ({ topic, author, text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.topic}>{topic}</Text>
      <Text style={styles.author}>Posted by: {author}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  topic: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    marginTop: 4,
    color: '#666',
  },
  text: {
    marginTop: 8,
  },
});

export default TopicItem;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SidebarProps {
  closeMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeMenu }) => {
  const handleMenuItemClick = () => {
    // Handle what happens when a menu item is clicked
    // For example, you can navigate to a different screen or perform an action
    closeMenu(); // Close the sidebar after an item is clicked
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sidebar</Text>
      <TouchableOpacity onPress={handleMenuItemClick} style={styles.menuItem}>
        <Text>Menu Item 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMenuItemClick} style={styles.menuItem}>
        <Text>Menu Item 2</Text>
      </TouchableOpacity>
      {/* Add more menu items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 10,
  },
});

export default Sidebar;

// NavigationButton.tsx
import React from 'react';
import { TouchableOpacity, Button, StyleSheet, StyleProp, ViewStyle } from 'react-native'; // Import StyleSheet and StyleProp
import { useNavigation } from '@react-navigation/native';

interface NavigationButtonProps {
  text: string;
  routeName: string;
  customStyle?: StyleProp<ViewStyle>; // Add customStyle prop
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ text, routeName, customStyle }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate(routeName as never);
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={[styles.navigationButtons, customStyle]} // Apply custom styles
    >
      <Button title={text} onPress={handleNavigation} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navigationButtons: {
    alignItems: 'center',
    marginVertical: 20,
  },
  // Add other styles as needed
});

export default NavigationButton;

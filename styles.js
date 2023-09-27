import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  navigationButtons: {
    alignItems: 'center',
    marginVertical: 20,
  },
  // Add more styles as needed
  topicButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  navigationButtons: {
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  aboutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  aboutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userGreeting: { // Add this style for the user greeting
    fontSize: 28,
    color: 'red',
    marginTop: 20,
  },
  topicsContainer: {
    marginTop: 20,
  },

  sidebarButton: {
    position: 'absolute',
    top: 20, // Adjust the top position as needed
    left: 20, // Adjust the left position as needed
    zIndex: 999, // Ensure it's above other elements
  },

  sidebarButtonText: {
    color: 'white', // Set the text color
    fontSize: 16, // Set the font size
    // Add other text styles as needed
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },

  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  customButton: {
  },


  buttonWrapper: {
  },

  separator: {
  },
  

});


export default styles;

import { View, Text, Pressable, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function SettingsScreen({ navigation, onLogout }) {
  const logout = async () => {
    await SecureStore.deleteItemAsync('sessionUser');
    onLogout();
  };

  const goToRunList = () => {
    navigation.getParent()?.navigate('RunList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Pressable style={styles.button} onPress={goToRunList}>
        <Text style={styles.buttonText}>Back to Game Select</Text>
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#A7F3D0',
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 16,
    color: '#111827',
  },

  button: {
    backgroundColor: '#166534',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '900',
  },

  logoutButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },

  logoutText: {
    color: '#B91C1C',
    fontWeight: '900',
  },
});
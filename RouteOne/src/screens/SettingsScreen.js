import { View, Text, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function SettingsScreen({ onLogout }) {
  const logout = async () => {
    await SecureStore.deleteItemAsync('username');
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
});
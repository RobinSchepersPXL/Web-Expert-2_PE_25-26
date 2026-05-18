import { View, Text, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function SettingsScreen({ navigation, onLogout }) {
  const logout = async () => {
    await SecureStore.deleteItemAsync('username');
    onLogout();
  };

  const goToRunList = () => {
    navigation.getParent()?.navigate('RunList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.button}>
        <Button
          title="Back to Game Select"
          onPress={goToRunList}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Logout"
          onPress={logout}
        />
      </View>
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
  button: {
    marginBottom: 12,
  },
});
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }

    await SecureStore.setItemAsync('username', username.trim());
    setError('');
    onLogin(username.trim());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Route One</Text>
      <Text style={styles.subtitle}>Login to continue your Nuzlocke run</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Login" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  error: {
    color: '#b00020',
    marginBottom: 12,
    fontWeight: '600',
  },
});
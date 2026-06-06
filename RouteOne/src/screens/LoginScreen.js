import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ onLogin }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    checkRegisteredUser();
  }, []);

  const checkRegisteredUser = async () => {
    const storedUsername = await SecureStore.getItemAsync('username');
    const storedPassword = await SecureStore.getItemAsync('password');

    if (storedUsername && storedPassword) {
      setIsRegistered(true);
    }
  };

  const register = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter a username and password.');
      return;
    }

    await SecureStore.setItemAsync('username', username.trim());
    await SecureStore.setItemAsync('password', password.trim());
    await SecureStore.setItemAsync('sessionUser', username.trim());

    setError('');
    onLogin(username.trim());
  };

  const login = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter your username and password.');
      return;
    }

    const storedUsername = await SecureStore.getItemAsync('username');
    const storedPassword = await SecureStore.getItemAsync('password');

    if (
      username.trim() !== storedUsername ||
      password.trim() !== storedPassword
    ) {
      setError('Wrong username or password.');
      return;
    }

    await SecureStore.setItemAsync('sessionUser', username.trim());

    setError('');
    onLogin(username.trim());
  };

  const resetAccount = async () => {
    await SecureStore.deleteItemAsync('username');
    await SecureStore.deleteItemAsync('password');
    await SecureStore.deleteItemAsync('sessionUser');

    await AsyncStorage.removeItem('starter');
    await AsyncStorage.removeItem('encounters');
    await AsyncStorage.removeItem('defeatedBosses');

    setIsRegistered(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Route One</Text>

      <Text style={styles.subtitle}>
        {isRegistered
          ? 'Login to continue your Nuzlocke run'
          : 'Create your trainer account'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Trainer name"
        placeholderTextColor="#9CA3AF"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={styles.button}
        onPress={isRegistered ? login : register}
      >
        <Text style={styles.buttonText}>
          {isRegistered ? 'Login' : 'Register'}
        </Text>
      </Pressable>

      {isRegistered && (
        <Pressable style={styles.resetButton} onPress={resetAccount}>
          <Text style={styles.resetText}>Reset account</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#A7F3D0',
  },

  title: {
    fontSize: 38,
    fontWeight: '900',
    marginBottom: 8,
    color: '#111827',
  },

  subtitle: {
    color: '#374151',
    marginBottom: 24,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    fontSize: 16,
  },

  error: {
    color: '#B91C1C',
    marginBottom: 12,
    fontWeight: '700',
  },

  button: {
    backgroundColor: '#166534',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },

  resetButton: {
    marginTop: 16,
    alignItems: 'center',
  },

  resetText: {
    color: '#166534',
    fontWeight: '800',
  },
});
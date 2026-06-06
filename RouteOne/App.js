import 'react-native-gesture-handler';

import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

import LoginScreen from './src/screens/LoginScreen';
import RunListScreen from './src/screens/RunListScreen';
import RouteDetailScreen from './src/screens/RouteDetailScreen';
import CapDetailScreen from './src/screens/CapDetailScreen';

import AppDrawer from './src/navigation/AppDrawer';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const sessionUser = await SecureStore.getItemAsync('sessionUser');

      if (sessionUser) {
        setUser(sessionUser);
      }
    } catch (e) {
      console.log('Error checking login', e);
    } finally {
      setCheckingLogin(false);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('sessionUser');
    setUser(null);
  };

  if (checkingLogin) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 12 }}>Checking login...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!user ? (
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {() => <LoginScreen onLogin={setUser} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="RunList" component={RunListScreen} />

              <Stack.Screen name="AppDrawer" options={{ headerShown: false }}>
                {() => <AppDrawer onLogout={logout} />}
              </Stack.Screen>

              <Stack.Screen
                name="RouteDetail"
                component={RouteDetailScreen}
                options={{ title: 'Route Detail' }}
              />

              <Stack.Screen
                name="CapDetail"
                component={CapDetailScreen}
                options={{ title: 'Battle Details' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
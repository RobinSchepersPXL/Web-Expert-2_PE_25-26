import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RunListScreen from './src/screens/RunListScreen';
import RouteDetailScreen from './src/screens/RouteDetailScreen';
import CapDetailScreen from './src/screens/CapDetailScreen';

import AppDrawer from './src/navigation/AppDrawer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="RunList"
            component={RunListScreen}
          />

          <Stack.Screen
            name="AppDrawer"
            component={AppDrawer}
            options={{ headerShown: false }}
          />

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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
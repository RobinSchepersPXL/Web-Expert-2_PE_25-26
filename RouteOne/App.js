import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RunListScreen from './src/screens/RunListScreen';
import MainTabs from './src/navigation/MainTabs';
import RouteDetailScreen from './src/screens/RouteDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RunList" component={RunListScreen} />
          <Stack.Screen
            name="RunTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="RouteDetail"
          component={RouteDetailScreen}
          options={{ title: 'Route Detail' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
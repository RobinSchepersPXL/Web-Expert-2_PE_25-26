import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RoutesScreen from '../screens/RoutesScreen';
import CapsScreen from '../screens/CapsScreen';
import BoxScreen from '../screens/BoxScreen';
import DeathsScreen from '../screens/DeathsScreen';
import StatsScreen from '../screens/StatsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Routes" component={RoutesScreen} />
      <Tab.Screen name="Caps" component={CapsScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Box" component={BoxScreen} />
      <Tab.Screen name="Graveyard" component={DeathsScreen} />
    </Tab.Navigator>
  );
}
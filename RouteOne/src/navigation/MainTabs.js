import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import RoutesScreen from '../screens/RoutesScreen';
import CapsScreen from '../screens/CapsScreen';
import BoxScreen from '../screens/BoxScreen';
import StatsScreen from '../screens/StatsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          switch (route.name) {
            case 'Routes':
              iconName = 'map-outline';
              break;

            case 'Caps':
              iconName = 'trophy-outline';
              break;

            case 'Stats':
              iconName = 'stats-chart-outline';
              break;

            case 'Box':
              iconName = 'archive-outline';
              break;

            default:
              iconName = 'ellipse-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={20}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: '#22C55E',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="Routes"
        component={RoutesScreen}
      />

      <Tab.Screen
        name="Caps"
        component={CapsScreen}
      />

      <Tab.Screen
        name="Stats"
        component={StatsScreen}
      />

      <Tab.Screen
        name="Box"
        component={BoxScreen}
      />
    </Tab.Navigator>
  );
}
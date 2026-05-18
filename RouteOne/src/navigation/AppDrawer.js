import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabs from './MainTabs';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';

const Drawer = createDrawerNavigator();

export default function AppDrawer({ onLogout }) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Run"
        component={MainTabs}
      />

      <Drawer.Screen name="Settings">
        {(props) => (
          <SettingsScreen
            {...props}
            onLogout={onLogout}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="About"
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
}
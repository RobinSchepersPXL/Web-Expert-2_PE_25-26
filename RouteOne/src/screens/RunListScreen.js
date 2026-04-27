import { View, Text, Button, StyleSheet } from 'react-native';

export default function RunListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Run List Screen</Text>
      <Button
        title="Open Run"
        onPress={() => navigation.navigate('RunTabs')}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
});
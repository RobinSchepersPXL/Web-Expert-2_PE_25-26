import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About Route One</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>What is Route One?</Text>
        <Text style={styles.text}>
          Route One is a React Native companion app for tracking a Pokémon
          Nuzlocke run. Users can save encounters per route, update their status,
          and view caught or dead Pokémon in separate lists.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Main features</Text>
        <Text style={styles.text}>• Route encounter tracking</Text>
        <Text style={styles.text}>• Level caps and battle details</Text>
        <Text style={styles.text}>• Box and Graveyard system</Text>
        <Text style={styles.text}>• PokéAPI integration with sprites</Text>
        <Text style={styles.text}>• Local storage and offline support</Text>
        <Text style={styles.text}>• Login/logout with SecureStore</Text>
        <Text style={styles.text}>• Native share functionality</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Technologies</Text>
        <Text style={styles.text}>• React Native / Expo</Text>
        <Text style={styles.text}>• React Navigation</Text>
        <Text style={styles.text}>• AsyncStorage</Text>
        <Text style={styles.text}>• Expo SecureStore</Text>
        <Text style={styles.text}>• PokéAPI</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Future improvements</Text>
        <Text style={styles.text}>• More supported games</Text>
        <Text style={styles.text}>• Duplicate clause helper</Text>
        <Text style={styles.text}>• Better filtering and search</Text>
        <Text style={styles.text}>• More detailed encounter data</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  text: {
    color: '#444',
    lineHeight: 22,
    marginBottom: 4,
  },
});
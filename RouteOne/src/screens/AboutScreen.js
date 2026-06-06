import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>About Route One</Text>
      <Text style={styles.subtitleText}>
        A FireRed Nuzlocke companion app built with React Native.
      </Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>PROJECT</Text>
        <Text style={styles.heroTitle}>Route One</Text>
        <Text style={styles.heroText}>
          Track encounters, level caps, gyms, teams and your run progress in one
          clean mobile app.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>What is Route One?</Text>
        <Text style={styles.text}>
          Route One is a companion app for tracking a Pokémon Nuzlocke run. Users
          can save encounters per route, update their status, view available
          Pokémon, and manage caught, dead or failed encounters.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Main features</Text>
        <Text style={styles.text}>• Route encounter tracking</Text>
        <Text style={styles.text}>• Available Pokémon per route</Text>
        <Text style={styles.text}>• Level caps and battle details</Text>
        <Text style={styles.text}>• Moves and base stats for major battles</Text>
        <Text style={styles.text}>• Box, Graveyard and Failed encounter system</Text>
        <Text style={styles.text}>• Starter choice with Champion Blue logic</Text>
        <Text style={styles.text}>• Run statistics and progress overview</Text>
        <Text style={styles.text}>• Login/logout with SecureStore</Text>
        <Text style={styles.text}>• Native share functionality</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Technologies</Text>
        <Text style={styles.text}>• React Native / Expo</Text>
        <Text style={styles.text}>• React Navigation</Text>
        <Text style={styles.text}>• AsyncStorage</Text>
        <Text style={styles.text}>• Expo SecureStore</Text>
        <Text style={styles.text}>• PokéAPI sprites</Text>
        <Text style={styles.text}>• Local JSON data</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Future improvements</Text>
        <Text style={styles.text}>• Multiple save slots</Text>
        <Text style={styles.text}>• More supported games</Text>
        <Text style={styles.text}>• Duplicate clause helper</Text>
        <Text style={styles.text}>• Search and filters</Text>
        <Text style={styles.text}>• Encounter rates and level ranges</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7F3D0',
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.6,
    color: '#111827',
  },

  subtitleText: {
    color: '#374151',
    marginTop: 4,
    marginBottom: 18,
    fontSize: 15,
    fontWeight: '600',
  },

  heroCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
  },

  heroLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 6,
  },

  heroText: {
    color: '#D1D5DB',
    marginTop: 8,
    lineHeight: 22,
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 8,
  },

  text: {
    color: '#374151',
    lineHeight: 22,
    marginBottom: 5,
    fontWeight: '600',
  },
});
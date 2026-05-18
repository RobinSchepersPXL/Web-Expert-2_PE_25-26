import { FlatList, Text, View, StyleSheet } from 'react-native';

import fireRedCaps from '../data/firered_caps.json';
import AnimatedCard from '../components/AnimatedCard';

export default function CapsScreen({ navigation }) {
  const caps = fireRedCaps.caps.sort((a, b) => a.order - b.order);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FireRed Level Caps</Text>

      <FlatList
        data={caps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnimatedCard
            style={styles.card}
            onPress={() =>
              navigation.navigate('CapDetail', { capItem: item })
            }
          >
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>

              <View style={styles.capBadge}>
                <Text style={styles.capText}>Lv. {item.cap}</Text>
              </View>
            </View>
          </AnimatedCard>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6f6f6',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },

  card: {
    padding: 14,
  },

  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
  },

  location: {
    marginTop: 4,
    color: '#666',
  },

  capBadge: {
    backgroundColor: '#111',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  capText: {
    color: '#fff',
    fontWeight: '700',
  },
});
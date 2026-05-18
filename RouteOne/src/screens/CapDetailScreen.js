import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

export default function CapDetailScreen({ route }) {
  const { capItem } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capItem.name}</Text>
      <Text style={styles.location}>{capItem.location}</Text>
      <Text style={styles.cap}>Level Cap: {capItem.cap}</Text>

      <Text style={styles.subtitle}>Team</Text>

      <FlatList
        data={capItem.team}
        keyExtractor={(item, index) => `${item.pokemonId}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.pokemonId}.png`,
              }}
              style={styles.sprite}
            />

            <View>
              <Text style={styles.pokemon}>{item.name}</Text>
              <Text style={styles.level}>Lv. {item.level}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f6f6' },
  title: { fontSize: 28, fontWeight: '700' },
  location: { marginTop: 4, color: '#666' },
  cap: { marginTop: 12, fontSize: 18, fontWeight: '700' },
  subtitle: { marginTop: 24, marginBottom: 12, fontSize: 20, fontWeight: '700' },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sprite: { width: 56, height: 56, marginRight: 12 },
  pokemon: { fontSize: 18, fontWeight: '700' },
  level: { marginTop: 4, color: '#666' },
});
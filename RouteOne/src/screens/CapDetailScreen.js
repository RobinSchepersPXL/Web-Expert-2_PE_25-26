import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';

export default function CapDetailScreen({ route }) {
  const { capItem } = route.params;
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const togglePokemon = (index) => {
    setSelectedPokemon(selectedPokemon === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capItem.name}</Text>
      <Text style={styles.location}>{capItem.location}</Text>
      <Text style={styles.cap}>Level Cap: {capItem.cap}</Text>

      <Text style={styles.subtitle}>Team</Text>

      <FlatList
        data={capItem.team}
        keyExtractor={(item, index) => `${item.pokemonId}-${index}`}
        renderItem={({ item, index }) => {
          const isOpen = selectedPokemon === index;

          return (
            <Pressable style={styles.card} onPress={() => togglePokemon(index)}>
              <View style={styles.cardTop}>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.pokemonId}.png`,
                  }}
                  style={styles.sprite}
                />

                <View style={styles.info}>
                  <Text style={styles.pokemon}>{item.name}</Text>
                  <Text style={styles.level}>Lv. {item.level}</Text>
                </View>

                <Text style={styles.expand}>{isOpen ? '▲' : '▼'}</Text>
              </View>

              {isOpen && (
                <View style={styles.details}>
                  <Text style={styles.detailTitle}>Moves</Text>

                  {item.moves?.length > 0 ? (
                    item.moves.map((move) => (
                      <Text key={move} style={styles.detailText}>
                        • {move}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.detailText}>No moves added yet.</Text>
                  )}

                  {item.baseStats && (
                    <>
                      <Text style={styles.detailTitle}>Base stats</Text>

                      <View style={styles.statsGrid}>
                        {Object.entries(item.baseStats).map(([stat, value]) => (
                          <View key={stat} style={styles.statBox}>
                            <Text style={styles.statLabel}>{stat}</Text>
                            <Text style={styles.statValue}>{value}</Text>
                          </View>
                        ))}
                      </View>
                    </>
                  )}
                </View>
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f6f6' },
  title: { fontSize: 28, fontWeight: '700' },
  location: { marginTop: 4, color: '#666' },
  cap: { marginTop: 12, fontSize: 18, fontWeight: '700' },
  subtitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sprite: { width: 56, height: 56, marginRight: 12 },
  info: { flex: 1 },
  pokemon: { fontSize: 18, fontWeight: '700' },
  level: { marginTop: 4, color: '#666' },
  expand: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666',
  },
  details: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  detailTitle: {
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 8,
  },
  detailText: {
    color: '#444',
    marginBottom: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statBox: {
    backgroundColor: '#f6f6f6',
    padding: 10,
    borderRadius: 10,
    minWidth: '30%',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  statValue: {
    fontWeight: '800',
    fontSize: 16,
    marginTop: 2,
  },
});
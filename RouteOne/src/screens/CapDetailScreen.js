import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const championBlueTeams = {
  bulbasaur: [
    { pokemonId: 18, name: 'Pidgeot', level: 59, moves: ['Aerial Ace', 'Whirlwind', 'Quick Attack', 'Feather Dance'], baseStats: { hp: 83, attack: 80, defense: 75, spAttack: 70, spDefense: 70, speed: 101 } },
    { pokemonId: 65, name: 'Alakazam', level: 57, moves: ['Psychic', 'Reflect', 'Recover', 'Future Sight'], baseStats: { hp: 55, attack: 50, defense: 45, spAttack: 135, spDefense: 95, speed: 120 } },
    { pokemonId: 112, name: 'Rhydon', level: 59, moves: ['Take Down', 'Earthquake', 'Rock Tomb', 'Scary Face'], baseStats: { hp: 105, attack: 130, defense: 120, spAttack: 45, spDefense: 45, speed: 40 } },
    { pokemonId: 103, name: 'Exeggutor', level: 59, moves: ['Barrage', 'Hypnosis', 'Light Screen', 'Giga Drain'], baseStats: { hp: 95, attack: 95, defense: 85, spAttack: 125, spDefense: 75, speed: 55 } },
    { pokemonId: 130, name: 'Gyarados', level: 61, moves: ['Hydro Pump', 'Bite', 'Dragon Rage', 'Leer'], baseStats: { hp: 95, attack: 125, defense: 79, spAttack: 60, spDefense: 100, speed: 81 } },
    { pokemonId: 6, name: 'Charizard', level: 63, moves: ['Fire Blast', 'Slash', 'Aerial Ace', 'Fire Spin'], baseStats: { hp: 78, attack: 84, defense: 78, spAttack: 109, spDefense: 85, speed: 100 } },
  ],
  charmander: [
    { pokemonId: 18, name: 'Pidgeot', level: 59, moves: ['Aerial Ace', 'Whirlwind', 'Quick Attack', 'Feather Dance'], baseStats: { hp: 83, attack: 80, defense: 75, spAttack: 70, spDefense: 70, speed: 101 } },
    { pokemonId: 65, name: 'Alakazam', level: 57, moves: ['Psychic', 'Reflect', 'Recover', 'Future Sight'], baseStats: { hp: 55, attack: 50, defense: 45, spAttack: 135, spDefense: 95, speed: 120 } },
    { pokemonId: 112, name: 'Rhydon', level: 59, moves: ['Take Down', 'Earthquake', 'Rock Tomb', 'Scary Face'], baseStats: { hp: 105, attack: 130, defense: 120, spAttack: 45, spDefense: 45, speed: 40 } },
    { pokemonId: 59, name: 'Arcanine', level: 59, moves: ['Flamethrower', 'Roar', 'Extreme Speed', 'Bite'], baseStats: { hp: 90, attack: 110, defense: 80, spAttack: 100, spDefense: 80, speed: 95 } },
    { pokemonId: 103, name: 'Exeggutor', level: 61, moves: ['Barrage', 'Hypnosis', 'Light Screen', 'Giga Drain'], baseStats: { hp: 95, attack: 95, defense: 85, spAttack: 125, spDefense: 75, speed: 55 } },
    { pokemonId: 9, name: 'Blastoise', level: 63, moves: ['Hydro Pump', 'Bite', 'Rain Dance', 'Skull Bash'], baseStats: { hp: 79, attack: 83, defense: 100, spAttack: 85, spDefense: 105, speed: 78 } },
  ],
  squirtle: [
    { pokemonId: 18, name: 'Pidgeot', level: 59, moves: ['Aerial Ace', 'Whirlwind', 'Quick Attack', 'Feather Dance'], baseStats: { hp: 83, attack: 80, defense: 75, spAttack: 70, spDefense: 70, speed: 101 } },
    { pokemonId: 65, name: 'Alakazam', level: 57, moves: ['Psychic', 'Reflect', 'Recover', 'Future Sight'], baseStats: { hp: 55, attack: 50, defense: 45, spAttack: 135, spDefense: 95, speed: 120 } },
    { pokemonId: 112, name: 'Rhydon', level: 59, moves: ['Take Down', 'Earthquake', 'Rock Tomb', 'Scary Face'], baseStats: { hp: 105, attack: 130, defense: 120, spAttack: 45, spDefense: 45, speed: 40 } },
    { pokemonId: 130, name: 'Gyarados', level: 59, moves: ['Hydro Pump', 'Bite', 'Dragon Rage', 'Leer'], baseStats: { hp: 95, attack: 125, defense: 79, spAttack: 60, spDefense: 100, speed: 81 } },
    { pokemonId: 59, name: 'Arcanine', level: 61, moves: ['Flamethrower', 'Roar', 'Extreme Speed', 'Bite'], baseStats: { hp: 90, attack: 110, defense: 80, spAttack: 100, spDefense: 80, speed: 95 } },
    { pokemonId: 3, name: 'Venusaur', level: 63, moves: ['Giga Drain', 'SolarBeam', 'Growth', 'Synthesis'], baseStats: { hp: 80, attack: 82, defense: 83, spAttack: 100, spDefense: 100, speed: 80 } },
  ],
};

export default function CapDetailScreen({ route }) {
  const { capItem } = route.params;

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [starter, setStarter] = useState(null);
  const [isDefeated, setIsDefeated] = useState(false);

  useEffect(() => {
    loadStarter();
    loadDefeatedStatus();
  }, []);

  const loadStarter = async () => {
    try {
      const savedStarter = await AsyncStorage.getItem('starter');
      setStarter(savedStarter || 'charmander');
    } catch (e) {
      console.log('Error loading starter', e);
      setStarter('charmander');
    }
  };

  const loadDefeatedStatus = async () => {
    try {
      const data = await AsyncStorage.getItem('defeatedBosses');

      if (!data) return;

      const gyms = JSON.parse(data);
      setIsDefeated(gyms.includes(capItem.id));
    } catch (e) {
      console.log('Error loading defeated status', e);
    }
  };

  const toggleDefeated = async () => {
    try {
      const data = await AsyncStorage.getItem('defeatedBosses');
      let gyms = data ? JSON.parse(data) : [];

      if (gyms.includes(capItem.id)) {
        gyms = gyms.filter((id) => id !== capItem.id);
        setIsDefeated(false);
      } else {
        gyms.push(capItem.id);
        setIsDefeated(true);
      }

      await AsyncStorage.setItem('defeatedBosses', JSON.stringify(gyms));
    } catch (e) {
      console.log('Error updating gym status', e);
    }
  };

  const getTeam = () => {
    if (capItem.id === 'champion-blue' && starter) {
      return championBlueTeams[starter] || capItem.team;
    }

    return capItem.team;
  };

  const getStatLabel = (stat) => {
    if (stat === 'spAttack' || stat === 'specialAttack') return 'Sp. Atk';
    if (stat === 'spDefense' || stat === 'specialDefense') return 'Sp. Def';
    if (stat === 'hp') return 'HP';
    return stat.toUpperCase();
  };

  const team = getTeam();

  const togglePokemon = (index) => {
    setSelectedPokemon(selectedPokemon === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>LEVEL CAP</Text>
        <Text style={styles.heroTitle}>{capItem.name}</Text>
        <Text style={styles.heroLocation}>{capItem.location}</Text>

        <View style={styles.heroBottomRow}>
          <Text style={styles.heroCap}>Lv. {capItem.cap}</Text>

          {capItem.id === 'champion-blue' && (
            <Text style={styles.starterNote}>
              Starter: {starter || 'loading...'}
            </Text>
          )}
        </View>
      </View>

      <Pressable
        style={[
          styles.defeatButton,
          isDefeated && styles.defeatButtonActive,
        ]}
        onPress={toggleDefeated}
      >
        <Text
          style={[
            styles.defeatButtonText,
            isDefeated && styles.defeatButtonTextActive,
          ]}
        >
          {isDefeated ? '✓ Defeated' : 'Mark as Defeated'}
        </Text>
      </Pressable>

      <Text style={styles.subtitle}>Team</Text>

      <FlatList
        data={team}
        keyExtractor={(item, index) => `${item.pokemonId}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => {
          const isOpen = selectedPokemon === index;

          return (
            <Pressable style={styles.card} onPress={() => togglePokemon(index)}>
              <View style={styles.cardTop}>
                <View style={styles.spriteBox}>
                  <Image
                    source={{
                      uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.pokemonId}.png`,
                    }}
                    style={styles.sprite}
                  />
                </View>

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
                    <View style={styles.movesContainer}>
                      {item.moves.map((move) => (
                        <View key={move} style={styles.moveBadge}>
                          <Text style={styles.moveText}>{move}</Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.detailText}>No moves added yet.</Text>
                  )}

                  {item.baseStats && (
                    <>
                      <Text style={styles.detailTitle}>Base stats</Text>

                      <View style={styles.statsGrid}>
                        {Object.entries(item.baseStats).map(([stat, value]) => (
                          <View key={stat} style={styles.statBox}>
                            <Text style={styles.statLabel}>
                              {getStatLabel(stat)}
                            </Text>
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#A7F3D0',
  },

  heroCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 20,
    marginBottom: 12,
  },

  heroLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  heroTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 6,
  },

  heroLocation: {
    color: '#D1D5DB',
    marginTop: 4,
    fontWeight: '700',
  },

  heroBottomRow: {
    marginTop: 14,
  },

  heroCap: {
    color: '#22C55E',
    fontSize: 28,
    fontWeight: '900',
  },

  starterNote: {
    color: '#D1D5DB',
    marginTop: 6,
    fontWeight: '700',
    textTransform: 'capitalize',
  },

  defeatButton: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 18,
  },

  defeatButtonActive: {
    backgroundColor: '#22C55E',
  },

  defeatButtonText: {
    fontWeight: '900',
    color: '#111827',
  },

  defeatButtonTextActive: {
    color: '#fff',
  },

  subtitle: {
    marginBottom: 12,
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spriteBox: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  sprite: {
    width: 54,
    height: 54,
  },

  info: {
    flex: 1,
  },

  pokemon: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },

  level: {
    marginTop: 4,
    color: '#6B7280',
    fontWeight: '700',
  },

  expand: {
    fontSize: 16,
    fontWeight: '900',
    color: '#6B7280',
  },

  details: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },

  detailTitle: {
    fontWeight: '900',
    fontSize: 17,
    marginBottom: 10,
    marginTop: 8,
    color: '#111827',
  },

  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },

  moveBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  moveText: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 13,
  },

  detailText: {
    color: '#374151',
    marginBottom: 4,
    fontWeight: '600',
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  statBox: {
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: 12,
    minWidth: '30%',
  },

  statLabel: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '900',
  },

  statValue: {
    fontWeight: '900',
    fontSize: 16,
    marginTop: 2,
    color: '#111827',
  },
});
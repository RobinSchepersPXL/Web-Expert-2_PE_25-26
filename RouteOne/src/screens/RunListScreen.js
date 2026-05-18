import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const games = [
  {
    id: 'firered',
    name: 'Pokémon FireRed',
    subtitle: 'Kanto Region',
    available: true,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
  },
  {
    id: 'emerald',
    name: 'Pokémon Emerald',
    subtitle: 'Hoenn Region',
    available: false,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/nest-ball.png',
  },
  {
    id: 'platinum',
    name: 'Pokémon Platinum',
    subtitle: 'Sinnoh Region',
    available: false,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',
  },
  {
    id: 'heartgold',
    name: 'Pokémon HeartGold',
    subtitle: 'Johto Region',
    available: false,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
  },
];

export default function RunListScreen({ navigation }) {
  const openRun = () => {
    navigation.navigate('AppDrawer');
  };

  const startNewRun = async () => {
    await AsyncStorage.removeItem('encounters');
    navigation.navigate('AppDrawer');
  };

  const openGame = (game) => {
    if (!game.available) return;

    navigation.navigate('AppDrawer');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Route One</Text>
      <Text style={styles.subtitle}>Nuzlocke run tracker</Text>

      <View style={styles.menuSection}>
        <Pressable style={styles.menuCard} onPress={openRun}>
          <Text style={styles.menuTitle}>Continue Run</Text>
          <Text style={styles.menuText}>Pokémon FireRed</Text>
        </Pressable>

        <Pressable style={styles.menuCard} onPress={startNewRun}>
          <Text style={styles.menuTitle}>New Run</Text>
          <Text style={styles.menuText}>Start a new FireRed run</Text>
        </Pressable>

        <Pressable style={[styles.menuCard, styles.disabledCard]} disabled>
          <Text style={styles.menuTitle}>Load Run</Text>
          <Text style={styles.menuText}>Coming soon</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Supported games</Text>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, !item.available && styles.disabledCard]}
            onPress={() => openGame(item)}
            disabled={!item.available}
          >
            <View style={styles.leftContent}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <View>
                <Text style={styles.gameName}>{item.name}</Text>
                <Text style={styles.gameSubtitle}>{item.subtitle}</Text>
              </View>
            </View>

            {item.available ? (
              <Text style={styles.openBadge}>OPEN</Text>
            ) : (
              <Text style={styles.comingSoon}>SOON</Text>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 70,
    paddingHorizontal: 16,
  },

  appTitle: {
    fontSize: 34,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 6,
    marginBottom: 24,
  },

  menuSection: {
    marginBottom: 24,
  },

  menuCard: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  menuTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },

  menuText: {
    color: '#ccc',
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  disabledCard: {
    opacity: 0.4,
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 52,
    height: 52,
    marginRight: 14,
  },

  gameName: {
    fontSize: 18,
    fontWeight: '700',
  },

  gameSubtitle: {
    marginTop: 4,
    color: '#666',
  },

  openBadge: {
    fontWeight: '800',
    color: '#111',
    fontSize: 12,
  },

  comingSoon: {
    fontWeight: '800',
    color: '#777',
    fontSize: 12,
  },
});
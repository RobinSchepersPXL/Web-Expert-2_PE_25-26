import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  Modal,
} from 'react-native';

import { useState } from 'react';
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

const starters = [
  {
    id: 'bulbasaur',
    name: 'Bulbasaur',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    id: 'charmander',
    name: 'Charmander',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  {
    id: 'squirtle',
    name: 'Squirtle',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
];

export default function RunListScreen({ navigation }) {
  const [starterModalVisible, setStarterModalVisible] = useState(false);

  const openRun = () => {
    navigation.navigate('AppDrawer');
  };

  const startNewRun = () => {
    setStarterModalVisible(true);
  };

  const selectStarter = async (starter) => {
    await AsyncStorage.removeItem('encounters');
    await AsyncStorage.removeItem('defeatedBosses');

    await AsyncStorage.setItem('starter', starter.id);

    setStarterModalVisible(false);
    navigation.navigate('AppDrawer');
  };

  const openGame = (game) => {
    if (!game.available) return;

    navigation.navigate('AppDrawer');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Route One</Text>
      <Text style={styles.subtitle}>Track your FireRed Nuzlocke run</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>Current Run</Text>
        <Text style={styles.heroTitle}>Pokémon FireRed</Text>
        <Text style={styles.heroText}>Continue your active Kanto journey.</Text>

        <Pressable style={styles.primaryButton} onPress={openRun}>
          <Text style={styles.primaryButtonText}>Continue Run</Text>
        </Pressable>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={styles.actionCard} onPress={startNewRun}>
          <Text style={styles.actionTitle}>New Run</Text>
          <Text style={styles.actionText}>Choose starter</Text>
        </Pressable>

        <Pressable style={[styles.actionCard, styles.disabledCard]} disabled>
          <Text style={styles.actionTitle}>Load Run</Text>
          <Text style={styles.actionText}>Coming soon</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Supported games</Text>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.gameCard, !item.available && styles.disabledGameCard]}
            onPress={() => openGame(item)}
            disabled={!item.available}
          >
            <View style={styles.leftContent}>
              <View style={styles.imageBox}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>

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

      <Modal
        visible={starterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setStarterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>Choose your starter</Text>
            <Text style={styles.modalText}>
              This also changes Champion Blue’s final team.
            </Text>

            {starters.map((starter) => (
              <Pressable
                key={starter.id}
                style={styles.starterCard}
                onPress={() => selectStarter(starter)}
              >
                <Image source={{ uri: starter.sprite }} style={styles.starterImage} />

                <View>
                  <Text style={styles.starterName}>{starter.name}</Text>
                  <Text style={styles.starterText}>Start with {starter.name}</Text>
                </View>
              </Pressable>
            ))}

            <Pressable
              style={styles.cancelButton}
              onPress={() => setStarterModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    paddingTop: 70,
    paddingHorizontal: 18,
  },

  appTitle: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -0.8,
  },

  subtitle: {
    fontSize: 16,
    color: '#6d6d72',
    marginTop: 6,
    marginBottom: 22,
  },

  heroCard: {
    backgroundColor: '#111',
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
  },

  heroLabel: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  heroTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 8,
  },

  heroText: {
    color: '#ccc',
    marginTop: 6,
    marginBottom: 16,
  },

  primaryButton: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#111',
    fontWeight: '900',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },

  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
  },

  actionTitle: {
    fontSize: 17,
    fontWeight: '900',
  },

  actionText: {
    color: '#6d6d72',
    marginTop: 4,
  },

  disabledCard: {
    opacity: 0.45,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },

  list: {
    paddingBottom: 30,
  },

  gameCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  disabledGameCard: {
    opacity: 0.45,
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#f2f2f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  image: {
    width: 38,
    height: 38,
  },

  gameName: {
    fontSize: 17,
    fontWeight: '800',
  },

  gameSubtitle: {
    marginTop: 4,
    color: '#6d6d72',
  },

  openBadge: {
    fontWeight: '900',
    color: '#111',
    fontSize: 12,
  },

  comingSoon: {
    fontWeight: '900',
    color: '#777',
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },

  modalBox: {
    backgroundColor: '#f2f2f7',
    padding: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  modalHandle: {
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#c7c7cc',
    alignSelf: 'center',
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 25,
    fontWeight: '900',
  },

  modalText: {
    color: '#6d6d72',
    marginTop: 6,
    marginBottom: 16,
  },

  starterCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  starterImage: {
    width: 56,
    height: 56,
    marginRight: 12,
  },

  starterName: {
    fontSize: 18,
    fontWeight: '900',
  },

  starterText: {
    color: '#6d6d72',
    marginTop: 4,
  },

  cancelButton: {
    marginTop: 8,
    padding: 14,
    alignItems: 'center',
  },

  cancelText: {
    fontWeight: '900',
    color: '#111',
  },
});
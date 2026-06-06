import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  Modal,
} from 'react-native';

import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
  const [starter, setStarter] = useState('Unknown');
  const [hasRun, setHasRun] = useState(false);
  const [caughtCount, setCaughtCount] = useState(0);
  const [gymsDefeated, setGymsDefeated] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadRunSummary();
    }, [])
  );

  const loadRunSummary = async () => {
    try {
      const savedStarter = await AsyncStorage.getItem('starter');

      if (savedStarter) {
        setStarter(savedStarter);
        setHasRun(true);
      } else {
        setStarter('Unknown');
        setHasRun(false);
      }

      const encounterData = await AsyncStorage.getItem('encounters');
      const encounters = encounterData ? JSON.parse(encounterData) : {};
      const encounterList = Object.values(encounters);

      setCaughtCount(
        encounterList.filter((item) => item.status === 'caught').length
      );

      const defeatedData = await AsyncStorage.getItem('defeatedBosses');
      const defeated = defeatedData ? JSON.parse(defeatedData) : [];

      setGymsDefeated(defeated.length);
    } catch (e) {
      console.log('Error loading run summary', e);
    }
  };

  const openRun = () => {
    if (!hasRun) return;

    navigation.navigate('AppDrawer');
  };

  const startNewRun = () => {
    setStarterModalVisible(true);
  };

  const selectStarter = async (starterChoice) => {
    await AsyncStorage.removeItem('encounters');
    await AsyncStorage.removeItem('defeatedBosses');

    await AsyncStorage.setItem('starter', starterChoice.id);

    setStarter(starterChoice.id);
    setHasRun(true);
    setCaughtCount(0);
    setGymsDefeated(0);

    setStarterModalVisible(false);
    navigation.navigate('AppDrawer');
  };

  const openGame = (game) => {
    if (!game.available) return;

    if (!hasRun) {
      setStarterModalVisible(true);
      return;
    }

    navigation.navigate('AppDrawer');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Route One</Text>
      <Text style={styles.subtitle}>Track your FireRed Nuzlocke run</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>Current Run</Text>
        <Text style={styles.heroTitle}>
          {hasRun ? 'Pokémon FireRed' : 'No run started'}
        </Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Starter</Text>
            <Text style={styles.summaryValue}>{starter}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Caught</Text>
            <Text style={styles.summaryValue}>{hasRun ? caughtCount : '-'}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Gyms</Text>
            <Text style={styles.summaryValue}>{hasRun ? gymsDefeated : '-'}</Text>
          </View>
        </View>

        <Pressable
          style={[
            styles.primaryButton,
            !hasRun && styles.primaryButtonDisabled,
          ]}
          onPress={openRun}
          disabled={!hasRun}
        >
          <Text
            style={[
              styles.primaryButtonText,
              !hasRun && styles.primaryButtonTextDisabled,
            ]}
          >
            {hasRun ? 'Continue Run' : 'Start a New Run First'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={styles.actionCard} onPress={startNewRun}>
          <Text style={styles.actionTitle}>New Run</Text>
          <Text style={styles.actionText}>Choose starter</Text>
          <Text style={styles.starterIcons}>🌱 🔥 💧</Text>
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
        showsVerticalScrollIndicator={false}
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
              <Text style={styles.openBadge}>
                {hasRun ? 'OPEN' : 'START'}
              </Text>
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

            {starters.map((starterChoice) => (
              <Pressable
                key={starterChoice.id}
                style={styles.starterCard}
                onPress={() => selectStarter(starterChoice)}
              >
                <Image
                  source={{ uri: starterChoice.sprite }}
                  style={styles.starterImage}
                />

                <View>
                  <Text style={styles.starterName}>{starterChoice.name}</Text>
                  <Text style={styles.starterText}>
                    Start with {starterChoice.name}
                  </Text>
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
    backgroundColor: '#A7F3D0',
    paddingTop: 70,
    paddingHorizontal: 18,
  },

  appTitle: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -0.8,
    color: '#111827',
  },

  subtitle: {
    fontSize: 16,
    color: '#374151',
    marginTop: 6,
    marginBottom: 22,
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
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  heroTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 8,
  },

  summaryRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    marginBottom: 16,
  },

  summaryItem: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 10,
  },

  summaryLabel: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  summaryValue: {
    color: '#fff',
    marginTop: 4,
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'capitalize',
  },

  primaryButton: {
    backgroundColor: '#22C55E',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },

  primaryButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },

  primaryButtonText: {
    color: '#fff',
    fontWeight: '900',
  },

  primaryButtonTextDisabled: {
    color: '#6B7280',
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
    color: '#111827',
  },

  actionText: {
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '600',
  },

  starterIcons: {
    marginTop: 10,
    fontSize: 18,
  },

  disabledCard: {
    opacity: 0.45,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
    color: '#111827',
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
    backgroundColor: '#F0FDF4',
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
    fontWeight: '900',
    color: '#111827',
  },

  gameSubtitle: {
    marginTop: 4,
    color: '#6B7280',
    fontWeight: '600',
  },

  openBadge: {
    fontWeight: '900',
    color: '#22C55E',
    fontSize: 12,
  },

  comingSoon: {
    fontWeight: '900',
    color: '#9CA3AF',
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },

  modalBox: {
    backgroundColor: '#A7F3D0',
    padding: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  modalHandle: {
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#6B7280',
    alignSelf: 'center',
    marginBottom: 16,
    opacity: 0.5,
  },

  modalTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#111827',
  },

  modalText: {
    color: '#374151',
    marginTop: 6,
    marginBottom: 16,
    fontWeight: '600',
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
    color: '#111827',
  },

  starterText: {
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '600',
  },

  cancelButton: {
    marginTop: 8,
    padding: 14,
    alignItems: 'center',
  },

  cancelText: {
    fontWeight: '900',
    color: '#166534',
  },
});
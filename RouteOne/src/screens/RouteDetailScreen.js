import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Share,
  ScrollView,
} from 'react-native';

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fireRedEncounters from '../data/firered_encounters.json';

export default function RouteDetailScreen({ route }) {
  const { routeItem } = route.params;

  const [pokemonName, setPokemonName] = useState('');
  const [status, setStatus] = useState('caught');
  const [encounter, setEncounter] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const STORAGE_KEY = 'encounters';

  const availablePokemon =
    fireRedEncounters.encounters?.[routeItem.id] ||
    fireRedEncounters[routeItem.id] ||
    [];

  useEffect(() => {
    loadEncounter();
  }, []);

  const loadEncounter = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data) {
        const parsed = JSON.parse(data);

        if (parsed[routeItem.id]) {
          setEncounter(parsed[routeItem.id]);
        }
      }
    } catch (e) {
      console.log('Error loading encounter', e);
    }
  };

  const addEncounter = async () => {
    if (!pokemonName.trim()) {
      setError('Please enter a Pokémon name.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const searchName = pokemonName.trim().toLowerCase();

      const selectedAvailablePokemon = availablePokemon.find(
        (pokemon) => pokemon.name.toLowerCase() === searchName
      );

      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = data ? JSON.parse(data) : {};

      let newEncounter;

      if (selectedAvailablePokemon) {
        newEncounter = {
          pokemon: selectedAvailablePokemon.name,
          pokemonId: selectedAvailablePokemon.pokemonId,
          status: status,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedAvailablePokemon.pokemonId}.png`,
        };
      } else {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchName}`
        );

        if (!response.ok) {
          setError('Pokémon not found. Check the name and try again.');
          return;
        }

        const pokemonData = await response.json();

        newEncounter = {
          pokemon: pokemonData.name,
          pokemonId: pokemonData.id,
          status: status,
          sprite: pokemonData.sprites.front_default,
        };
      }

      parsed[routeItem.id] = newEncounter;

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

      setEncounter(newEncounter);
      setPokemonName('');
      setStatus('caught');
    } catch (e) {
      console.log('Error saving encounter', e);
      setError('Something went wrong while saving the encounter.');
    } finally {
      setLoading(false);
    }
  };

  const updateEncounterStatus = async (newStatus) => {
    if (!encounter) return;

    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = data ? JSON.parse(data) : {};

      const updatedEncounter = {
        ...encounter,
        status: newStatus,
      };

      parsed[routeItem.id] = updatedEncounter;

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

      setEncounter(updatedEncounter);
    } catch (e) {
      console.log('Error updating status', e);
    }
  };

  const shareEncounter = async () => {
    if (!encounter) return;

    try {
      await Share.share({
        message: `I caught ${encounter.pokemon} at ${routeItem.name}!\nStatus: ${encounter.status}`,
      });
    } catch (e) {
      console.log('Error sharing encounter', e);
    }
  };

  const getStatusActiveStyle = (selectedStatus, item) => {
    if (selectedStatus !== item) return null;

    if (item === 'caught') return styles.statusButtonCaughtActive;
    if (item === 'dead') return styles.statusButtonDeadActive;
    if (item === 'failed') return styles.statusButtonFailedActive;

    return null;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{routeItem.name}</Text>

      <Text style={styles.meta}>{routeItem.types.join(', ')}</Text>

      <Text style={styles.sectionTitle}>Available Pokémon</Text>

      <View style={styles.availableBox}>
        {availablePokemon.length > 0 ? (
          availablePokemon.map((pokemon) => (
            <Pressable
              key={pokemon.pokemonId}
              style={styles.availableRow}
              onPress={() => setPokemonName(pokemon.name)}
            >
              <View style={styles.availableSpriteBox}>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemonId}.png`,
                  }}
                  style={styles.availableSprite}
                />
              </View>

              <Text style={styles.availablePokemon}>{pokemon.name}</Text>
            </Pressable>
          ))
        ) : (
          <Text style={styles.availablePokemon}>
            No encounter data available.
          </Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>Register Encounter</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokémon name"
        placeholderTextColor="#9CA3AF"
        value={pokemonName}
        onChangeText={setPokemonName}
        autoCapitalize="none"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>Status</Text>

      <View style={styles.statusRow}>
        {['caught', 'dead', 'failed'].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.statusButton,
              getStatusActiveStyle(status, item),
            ]}
            onPress={() => setStatus(item)}
          >
            <Text
              style={[
                styles.statusText,
                status === item && styles.statusTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[styles.saveButton, loading && styles.saveButtonDisabled]}
        onPress={addEncounter}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? 'Saving...' : 'Save Encounter'}
        </Text>
      </Pressable>

      {encounter && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Current encounter</Text>

          {encounter.sprite && (
            <View style={styles.bigSpriteBox}>
              <Image source={{ uri: encounter.sprite }} style={styles.sprite} />
            </View>
          )}

          <Text style={styles.result}>Pokémon: {encounter.pokemon}</Text>

          <Text style={styles.result}>Status: {encounter.status}</Text>

          <Pressable style={styles.secondaryButton} onPress={shareEncounter}>
            <Text style={styles.secondaryButtonText}>Share Encounter</Text>
          </Pressable>

          <View style={styles.quickActions}>
            <Text style={styles.label}>Update status</Text>

            <View style={styles.statusRow}>
              {['caught', 'dead', 'failed'].map((item) => (
                <Pressable
                  key={item}
                  style={[
                    styles.statusButton,
                    getStatusActiveStyle(encounter.status, item),
                  ]}
                  onPress={() => updateEncounterStatus(item)}
                >
                  <Text
                    style={[
                      styles.statusText,
                      encounter.status === item && styles.statusTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#A7F3D0',
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.6,
    marginBottom: 6,
    color: '#111827',
  },

  meta: {
    color: '#374151',
    marginBottom: 22,
    textTransform: 'capitalize',
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
    color: '#111827',
  },

  availableBox: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 18,
    marginBottom: 22,
  },

  availableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 5,
  },

  availableSpriteBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  availableSprite: {
    width: 38,
    height: 38,
  },

  availablePokemon: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
    color: '#111827',
  },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    fontSize: 16,
  },

  error: {
    color: '#B91C1C',
    marginBottom: 12,
    fontWeight: '700',
  },

  label: {
    fontWeight: '900',
    marginBottom: 8,
    color: '#111827',
  },

  statusRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },

  statusButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },

  statusButtonCaughtActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },

  statusButtonDeadActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },

  statusButtonFailedActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },

  statusText: {
    color: '#111827',
    fontWeight: '800',
    textTransform: 'capitalize',
  },

  statusTextActive: {
    color: '#fff',
  },

  saveButton: {
    backgroundColor: '#166534',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },

  saveButtonDisabled: {
    opacity: 0.55,
  },

  saveButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },

  resultBox: {
    marginTop: 24,
    marginBottom: 40,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 18,
  },

  resultTitle: {
    fontWeight: '900',
    marginBottom: 10,
    fontSize: 18,
  },

  bigSpriteBox: {
    width: 108,
    height: 108,
    borderRadius: 24,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  sprite: {
    width: 96,
    height: 96,
  },

  result: {
    fontSize: 16,
    marginBottom: 4,
    textTransform: 'capitalize',
    fontWeight: '700',
    color: '#111827',
  },

  secondaryButton: {
    marginTop: 16,
    backgroundColor: '#F0FDF4',
    padding: 13,
    borderRadius: 14,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#166534',
    fontWeight: '900',
  },

  quickActions: {
    marginTop: 18,
  },
});
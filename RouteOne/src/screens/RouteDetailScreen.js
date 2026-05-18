import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
  Share,
} from 'react-native';

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RouteDetailScreen({ route }) {
  const { routeItem } = route.params;

  const [pokemonName, setPokemonName] = useState('');
  const [status, setStatus] = useState('caught');
  const [encounter, setEncounter] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const STORAGE_KEY = 'encounters';

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

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchName}`
      );

      if (!response.ok) {
        setError('Pokémon not found. Check the name and try again.');
        return;
      }

      const pokemonData = await response.json();

      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = data ? JSON.parse(data) : {};

      const newEncounter = {
        pokemon: pokemonData.name,
        pokemonId: pokemonData.id,
        status: status,
        sprite: pokemonData.sprites.front_default,
      };

      parsed[routeItem.id] = newEncounter;

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(parsed)
      );

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

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(parsed)
      );

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routeItem.name}</Text>

      <Text style={styles.meta}>
        {routeItem.types.join(', ')}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokémon name"
        value={pokemonName}
        onChangeText={setPokemonName}
        autoCapitalize="none"
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <Text style={styles.label}>Status</Text>

      <View style={styles.statusRow}>
        {['caught', 'dead', 'failed'].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.statusButton,
              status === item &&
                styles.statusButtonActive,
            ]}
            onPress={() => setStatus(item)}
          >
            <Text
              style={[
                styles.statusText,
                status === item &&
                  styles.statusTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Button
        title={loading ? 'Saving...' : 'Save Encounter'}
        onPress={addEncounter}
        disabled={loading}
      />

      {encounter && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>
            Current encounter
          </Text>

          {encounter.sprite && (
            <Image
              source={{ uri: encounter.sprite }}
              style={styles.sprite}
            />
          )}

          <Text style={styles.result}>
            Pokémon: {encounter.pokemon}
          </Text>

          <Text style={styles.result}>
            Status: {encounter.status}
          </Text>

          <View style={styles.shareButton}>
            <Button
              title="Share Encounter"
              onPress={shareEncounter}
            />
          </View>

          <View style={styles.quickActions}>
            <Text style={styles.label}>
              Update status
            </Text>

            <View style={styles.statusRow}>
              {['caught', 'dead', 'failed'].map(
                (item) => (
                  <Pressable
                    key={item}
                    style={[
                      styles.statusButton,
                      encounter.status === item &&
                        styles.statusButtonActive,
                    ]}
                    onPress={() =>
                      updateEncounterStatus(item)
                    }
                  >
                    <Text
                      style={[
                        styles.statusText,
                        encounter.status === item &&
                          styles.statusTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )
              )}
            </View>
          </View>
        </View>
      )}
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },

  meta: {
    color: '#666',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  error: {
    color: '#b00020',
    marginBottom: 12,
    fontWeight: '600',
  },

  label: {
    fontWeight: '700',
    marginBottom: 8,
  },

  statusRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },

  statusButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  statusButtonActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },

  statusText: {
    color: '#111',
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  statusTextActive: {
    color: '#fff',
  },

  resultBox: {
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
  },

  resultTitle: {
    fontWeight: '700',
    marginBottom: 8,
  },

  sprite: {
    width: 96,
    height: 96,
    marginBottom: 8,
  },

  result: {
    fontSize: 16,
    marginBottom: 4,
  },

  shareButton: {
    marginTop: 16,
  },

  quickActions: {
    marginTop: 16,
  },
});
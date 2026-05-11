import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RouteDetailScreen({ route }) {
  const { routeItem } = route.params;

  const [pokemonName, setPokemonName] = useState('');
  const [encounter, setEncounter] = useState(null);

  const STORAGE_KEY = 'encounters';

  // 🔹 Load bij openen
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
      console.log('Error loading', e);
    }
  };

  // 🔹 Opslaan
  const addEncounter = async () => {
    if (!pokemonName) return;

    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = data ? JSON.parse(data) : {};

      parsed[routeItem.id] = pokemonName;

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

      setEncounter(pokemonName);
      setPokemonName('');
    } catch (e) {
      console.log('Error saving', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routeItem.name}</Text>
      <Text style={styles.meta}>{routeItem.types.join(', ')}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokémon name"
        value={pokemonName}
        onChangeText={setPokemonName}
      />

      <Button title="Add Encounter" onPress={addEncounter} />

      {encounter && (
        <Text style={styles.result}>
          Encounter: {encounter}
        </Text>
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
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
});
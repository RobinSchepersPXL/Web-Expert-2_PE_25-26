import { View, Text, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RouteDetailScreen({ route }) {
  const { routeItem } = route.params;

  const [pokemonName, setPokemonName] = useState('');
  const [status, setStatus] = useState('caught');
  const [encounter, setEncounter] = useState(null);

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
    if (!pokemonName.trim()) return;

    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = data ? JSON.parse(data) : {};

      const newEncounter = {
        pokemon: pokemonName.trim(),
        status: status,
      };

      parsed[routeItem.id] = newEncounter;

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

      setEncounter(newEncounter);
      setPokemonName('');
      setStatus('caught');
    } catch (e) {
      console.log('Error saving encounter', e);
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

      <Text style={styles.label}>Status</Text>

      <View style={styles.statusRow}>
        {['caught', 'dead', 'failed'].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.statusButton,
              status === item && styles.statusButtonActive,
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

      <Button title="Save Encounter" onPress={addEncounter} />

      {encounter && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Current encounter</Text>
          <Text style={styles.result}>Pokémon: {encounter.pokemon}</Text>
          <Text style={styles.result}>Status: {encounter.status}</Text>

          <View style={styles.quickActions}>
            <Text style={styles.label}>Update status</Text>

            <View style={styles.statusRow}>
              {['caught', 'dead', 'failed'].map((item) => (
                <Pressable
                  key={item}
                  style={[
                    styles.statusButton,
                    encounter.status === item && styles.statusButtonActive,
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
    marginBottom: 14,
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
  result: {
    fontSize: 16,
    marginBottom: 4,
  },
  quickActions: {
    marginTop: 16,
  },
});
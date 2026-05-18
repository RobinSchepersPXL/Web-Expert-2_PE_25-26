import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fireRedRoutes from '../data/firered_routes.json';

export default function DeathsScreen() {
  const [deadPokemon, setDeadPokemon] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadDeadPokemon();
    }, [])
  );

  const loadDeadPokemon = async () => {
    try {
      const data = await AsyncStorage.getItem('encounters');
      const encounters = data ? JSON.parse(data) : {};

      const deaths = Object.entries(encounters)
        .filter(([_, encounter]) => encounter.status === 'dead')
        .map(([routeId, encounter]) => {
          const route = fireRedRoutes.routes.find((item) => item.id === routeId);

          return {
            routeId,
            routeName: route ? route.name : 'Unknown route',
            ...encounter,
          };
        });

      setDeadPokemon(deaths);
    } catch (e) {
      console.log('Error loading dead pokemon', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Graveyard</Text>

      {deadPokemon.length === 0 ? (
        <Text style={styles.empty}>No dead Pokémon yet.</Text>
      ) : (
        <FlatList
          data={deadPokemon}
          keyExtractor={(item) => item.routeId}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.row}>
                {item.sprite && (
                  <Image source={{ uri: item.sprite }} style={styles.sprite} />
                )}

                <View>
                  <Text style={styles.pokemon}>{item.pokemon}</Text>
                  <Text style={styles.route}>
                    Caught at: {item.routeName}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  empty: {
    color: '#777',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sprite: {
    width: 56,
    height: 56,
    marginRight: 12,
  },
  pokemon: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  route: {
    marginTop: 4,
    color: '#666',
  },
});
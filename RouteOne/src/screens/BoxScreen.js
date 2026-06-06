import { FlatList, Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fireRedRoutes from '../data/firered_routes.json';

const starterData = {
  bulbasaur: {
    routeId: 'starter',
    routeName: 'Starter Pokémon',
    pokemon: 'bulbasaur',
    pokemonId: 1,
    status: 'caught',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  charmander: {
    routeId: 'starter',
    routeName: 'Starter Pokémon',
    pokemon: 'charmander',
    pokemonId: 4,
    status: 'caught',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  squirtle: {
    routeId: 'starter',
    routeName: 'Starter Pokémon',
    pokemon: 'squirtle',
    pokemonId: 7,
    status: 'caught',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
};

export default function BoxScreen() {
  const [activeTab, setActiveTab] = useState('caught');
  const [pokemonList, setPokemonList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadPokemon();
    }, [])
  );

  const loadPokemon = async () => {
    try {
      const starter = await AsyncStorage.getItem('starter');

      const data = await AsyncStorage.getItem('encounters');
      const encounters = data ? JSON.parse(data) : {};

      const allPokemon = Object.entries(encounters).map(([routeId, encounter]) => {
        const route = fireRedRoutes.routes.find((item) => item.id === routeId);

        return {
          routeId,
          routeName: route ? route.name : 'Unknown route',
          ...encounter,
        };
      });

      const starterPokemon = starterData[starter];

      if (starterPokemon) {
        setPokemonList([starterPokemon, ...allPokemon]);
      } else {
        setPokemonList(allPokemon);
      }
    } catch (e) {
      console.log('Error loading pokemon', e);
    }
  };

  const filteredPokemon = pokemonList.filter((item) => item.status === activeTab);

  const getEmptyText = () => {
    if (activeTab === 'caught') return 'No caught Pokémon yet.';
    if (activeTab === 'dead') return 'No dead Pokémon yet.';
    return 'No failed encounters yet.';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Box</Text>

      <View style={styles.segmentedControl}>
        <Pressable
          style={[
            styles.segmentButton,
            activeTab === 'caught' && styles.segmentButtonActive,
          ]}
          onPress={() => setActiveTab('caught')}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'caught' && styles.segmentTextActive,
            ]}
          >
            Caught
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.segmentButton,
            activeTab === 'dead' && styles.segmentButtonActive,
          ]}
          onPress={() => setActiveTab('dead')}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'dead' && styles.segmentTextActive,
            ]}
          >
            Graveyard
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.segmentButton,
            activeTab === 'failed' && styles.segmentButtonActive,
          ]}
          onPress={() => setActiveTab('failed')}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'failed' && styles.segmentTextActive,
            ]}
          >
            Failed
          </Text>
        </Pressable>
      </View>

      {filteredPokemon.length === 0 ? (
        <Text style={styles.empty}>{getEmptyText()}</Text>
      ) : (
        <FlatList
          data={filteredPokemon}
          keyExtractor={(item) => item.routeId}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.row}>
                {item.sprite && (
                  <Image source={{ uri: item.sprite }} style={styles.sprite} />
                )}

                <View>
                  <Text style={styles.pokemon}>{item.pokemon}</Text>
                  <Text style={styles.route}>Caught at: {item.routeName}</Text>
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
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#e5e5ea',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  segmentButtonActive: {
    backgroundColor: '#fff',
  },
  segmentText: {
    color: '#666',
    fontWeight: '700',
  },
  segmentTextActive: {
    color: '#111',
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
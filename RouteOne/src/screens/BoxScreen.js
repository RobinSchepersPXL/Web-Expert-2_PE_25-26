import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';

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
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  charmander: {
    routeId: 'starter',
    routeName: 'Starter Pokémon',
    pokemon: 'charmander',
    pokemonId: 4,
    status: 'caught',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  squirtle: {
    routeId: 'starter',
    routeName: 'Starter Pokémon',
    pokemon: 'squirtle',
    pokemonId: 7,
    status: 'caught',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
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

      const allPokemon = Object.entries(encounters).map(
        ([routeId, encounter]) => {
          const route = fireRedRoutes.routes.find(
            (item) => item.id === routeId
          );

          return {
            routeId,
            routeName: route ? route.name : 'Unknown route',
            ...encounter,
          };
        }
      );

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

  const filteredPokemon = pokemonList.filter(
    (item) => item.status === activeTab
  );

  const getEmptyText = () => {
    if (activeTab === 'caught') return 'No caught Pokémon yet.';
    if (activeTab === 'dead') return 'No Pokémon in the graveyard yet.';
    return 'No failed encounters yet.';
  };

  const getHeaderText = () => {
    if (activeTab === 'caught') return 'Caught Pokémon';
    if (activeTab === 'dead') return 'Graveyard';
    return 'Failed Encounters';
  };

  const getLocationText = (item) => {
    if (item.status === 'dead') return `Fallen at: ${item.routeName}`;
    if (item.status === 'failed') return `Failed at: ${item.routeName}`;
    return `Caught at: ${item.routeName}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Box</Text>
      <Text style={styles.subtitle}>Manage your current run Pokémon</Text>

      <View style={styles.segmentedControl}>
        <Pressable
          style={[
            styles.segmentButton,
            activeTab === 'caught' && styles.segmentCaughtActive,
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
            activeTab === 'dead' && styles.segmentDeadActive,
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
            activeTab === 'failed' && styles.segmentFailedActive,
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

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>{getHeaderText()}</Text>
        <Text style={styles.summaryValue}>{filteredPokemon.length}</Text>
      </View>

      {filteredPokemon.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Nothing here yet</Text>
          <Text style={styles.empty}>{getEmptyText()}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPokemon}
          keyExtractor={(item) => item.routeId}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.row}>
                {item.sprite && (
                  <View style={styles.spriteBox}>
                    <Image source={{ uri: item.sprite }} style={styles.sprite} />
                  </View>
                )}

                <View style={styles.info}>
                  <Text style={styles.pokemon}>{item.pokemon}</Text>
                  <Text style={styles.route}>{getLocationText(item)}</Text>
                </View>

                <View
                  style={[
                    styles.statusDot,
                    item.status === 'caught' && styles.caughtDot,
                    item.status === 'dead' && styles.deadDot,
                    item.status === 'failed' && styles.failedDot,
                  ]}
                />
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
    backgroundColor: '#A7F3D0',
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.6,
    color: '#111827',
  },

  subtitle: {
    color: '#374151',
    marginTop: 4,
    marginBottom: 18,
    fontSize: 15,
    fontWeight: '600',
  },

  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 5,
    marginBottom: 14,
  },

  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },

  segmentCaughtActive: {
    backgroundColor: '#22C55E',
  },

  segmentDeadActive: {
    backgroundColor: '#EF4444',
  },

  segmentFailedActive: {
    backgroundColor: '#F59E0B',
  },

  segmentText: {
    color: '#6B7280',
    fontWeight: '900',
    fontSize: 13,
  },

  segmentTextActive: {
    color: '#FFFFFF',
  },

  summaryCard: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },

  summaryLabel: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  summaryValue: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    marginTop: 4,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 4,
  },

  empty: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '600',
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
  },

  row: {
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
    textTransform: 'capitalize',
    color: '#111827',
  },

  route: {
    marginTop: 4,
    color: '#6B7280',
    fontWeight: '600',
  },

  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
  },

  caughtDot: {
    backgroundColor: '#22C55E',
  },

  deadDot: {
    backgroundColor: '#EF4444',
  },

  failedDot: {
    backgroundColor: '#F59E0B',
  },
});
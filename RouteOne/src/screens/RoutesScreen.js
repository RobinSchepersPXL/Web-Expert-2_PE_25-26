import { FlatList, Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fireRedRoutes from '../data/firered_routes.json';

export default function RoutesScreen({ navigation }) {
  const routes = fireRedRoutes.routes.sort((a, b) => a.order - b.order);
  const [encounters, setEncounters] = useState({});

  useFocusEffect(
    useCallback(() => {
      loadEncounters();
    }, [])
  );

  const loadEncounters = async () => {
    try {
      const data = await AsyncStorage.getItem('encounters');
      setEncounters(data ? JSON.parse(data) : {});
    } catch (e) {
      console.log('Error loading encounters', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FireRed Routes</Text>

      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const encounter = encounters[item.id];

          return (
            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate('RouteDetail', { routeItem: item })
              }
            >
              <Text style={styles.routeName}>{item.name}</Text>

              <Text style={styles.meta}>
                {item.types.join(', ')} • {item.phase}
              </Text>

              {encounter ? (
                <View style={styles.encounterRow}>
                  {encounter.sprite && (
                    <Image
                      source={{ uri: encounter.sprite }}
                      style={styles.sprite}
                    />
                  )}

                  <Text style={styles.encounter}>
                    Encounter: {encounter.pokemon} ({encounter.status})
                  </Text>
                </View>
              ) : (
                <Text style={styles.empty}>No encounter yet</Text>
              )}
            </Pressable>
          );
        }}
      />
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
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  routeName: {
    fontSize: 18,
    fontWeight: '600',
  },
  meta: {
    marginTop: 4,
    color: '#666',
  },
  encounterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sprite: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  encounter: {
    fontWeight: '600',
  },
  empty: {
    marginTop: 8,
    color: '#999',
  },
});
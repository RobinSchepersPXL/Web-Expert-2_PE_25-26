import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fireRedRoutes from '../data/firered_routes.json';
import AnimatedCard from '../components/AnimatedCard';

export default function RoutesScreen({ navigation }) {
  const routes = fireRedRoutes.routes.sort((a, b) => a.order - b.order);
  const [encounters, setEncounters] = useState({});
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEncounters();
    setRefreshing(false);
  };

  const getStatusStyle = (status) => {
    if (status === 'caught') return styles.statusCaught;
    if (status === 'dead') return styles.statusDead;
    if (status === 'failed') return styles.statusFailed;
    return styles.statusEmpty;
  };

  const getStatusText = (status) => {
    if (status === 'caught') return 'Caught';
    if (status === 'dead') return 'Dead';
    if (status === 'failed') return 'Failed';
    return 'Open';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Routes</Text>
      <Text style={styles.subtitle}>Track every FireRed encounter</Text>

      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const encounter = encounters[item.id];

          return (
            <AnimatedCard
              style={styles.card}
              onPress={() =>
                navigation.navigate('RouteDetail', { routeItem: item })
              }
            >
              <View style={styles.cardHeader}>
                <View style={styles.routeInfo}>
                  <Text style={styles.routeName}>{item.name}</Text>

                  <Text style={styles.meta}>
                    {item.types.join(', ')} • {item.phase}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    encounter
                      ? getStatusStyle(encounter.status)
                      : styles.statusEmpty,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      encounter && styles.statusTextActive,
                    ]}
                  >
                    {encounter
                      ? getStatusText(encounter.status)
                      : 'Open'}
                  </Text>
                </View>
              </View>

              {encounter ? (
                <View style={styles.encounterRow}>
                  {encounter.sprite && (
                    <View style={styles.spriteBox}>
                      <Image
                        source={{ uri: encounter.sprite }}
                        style={styles.sprite}
                      />
                    </View>
                  )}

                  <View>
                    <Text style={styles.encounterName}>
                      {encounter.pokemon}
                    </Text>
                    <Text style={styles.encounterMeta}>
                      Current encounter
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyText}>
                    No encounter registered yet
                  </Text>
                </View>
              )}
            </AnimatedCard>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#A7F3D0',
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.6,
  },

  subtitle: {
    color: '#6d6d72',
    marginTop: 4,
    marginBottom: 18,
    fontSize: 15,
  },

  list: {
    paddingBottom: 24,
  },

  card: {
    padding: 16,
    borderRadius: 18,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },

  routeInfo: {
    flex: 1,
  },

  routeName: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.2,
  },

  meta: {
    marginTop: 5,
    color: '#6d6d72',
    fontSize: 13,
    textTransform: 'capitalize',
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#e5e5ea',
  },
  statusCaught: {
    backgroundColor: '#22C55E',
  },
  
  statusDead: {
    backgroundColor: '#EF4444',
  },
  
  statusFailed: {
    backgroundColor: '#F59E0B',
  },
  
  statusEmpty: {
    backgroundColor: '#FFFFFF',
  },
  
  statusText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
  },
  
  statusTextActive: {
    color: '#FFFFFF',
  },

  encounterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },

  spriteBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f2f2f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  sprite: {
    width: 42,
    height: 42,
  },

  encounterName: {
    fontSize: 17,
    fontWeight: '800',
    textTransform: 'capitalize',
  },

  encounterMeta: {
    marginTop: 3,
    color: '#6d6d72',
    fontSize: 13,
  },

  emptyBox: {
    marginTop: 14,
    backgroundColor: '#f2f2f7',
    padding: 12,
    borderRadius: 14,
  },

  emptyText: {
    color: '#6d6d72',
    fontWeight: '600',
  },
});
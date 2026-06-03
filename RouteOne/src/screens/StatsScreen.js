import { View, Text, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fireRedRoutes from '../data/firered_routes.json';

export default function StatsScreen() {
  const [starter, setStarter] = useState('Unknown');
  const [caught, setCaught] = useState(0);
  const [dead, setDead] = useState(0);
  const [failed, setFailed] = useState(0);
  const [completedRoutes, setCompletedRoutes] = useState(0);
  const [defeatedBosses, setDefeatedBosses] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  const loadStats = async () => {
    try {
      const starterData = await AsyncStorage.getItem('starter');
      setStarter(starterData || 'Unknown');

      const encounterData = await AsyncStorage.getItem('encounters');
      const encounters = encounterData
        ? JSON.parse(encounterData)
        : {};

      const encounterList = Object.values(encounters);

      setCaught(
        encounterList.filter(
          (p) => p.status === 'caught'
        ).length
      );

      setDead(
        encounterList.filter(
          (p) => p.status === 'dead'
        ).length
      );

      setFailed(
        encounterList.filter(
          (p) => p.status === 'failed'
        ).length
      );

      setCompletedRoutes(
        Object.keys(encounters).length
      );

      const bossData = await AsyncStorage.getItem(
        'defeatedBosses'
      );

      const bosses = bossData
        ? JSON.parse(bossData)
        : [];

      setDefeatedBosses(bosses.length);
    } catch (e) {
      console.log('Error loading stats', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Run Stats</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Starter</Text>
        <Text style={styles.value}>{starter}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Caught Pokémon</Text>
        <Text style={styles.value}>{caught}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Dead Pokémon</Text>
        <Text style={styles.value}>{dead}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Failed Encounters</Text>
        <Text style={styles.value}>{failed}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Routes Completed</Text>
        <Text style={styles.value}>
          {completedRoutes} / {fireRedRoutes.routes.length}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Gyms Defeated</Text>
        <Text style={styles.value}>{defeatedBosses}</Text>
      </View>
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },

  label: {
    color: '#666',
    marginBottom: 4,
  },

  value: {
    fontSize: 22,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
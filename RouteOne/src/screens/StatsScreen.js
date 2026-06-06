import { View, Text, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fireRedRoutes from '../data/firered_routes.json';
import fireRedCaps from '../data/firered_caps.json';

export default function StatsScreen() {
  const [starter, setStarter] = useState('Unknown');
  const [caught, setCaught] = useState(0);
  const [dead, setDead] = useState(0);
  const [failed, setFailed] = useState(0);
  const [completedRoutes, setCompletedRoutes] = useState(0);
  const [defeatedGyms, setDefeatedGyms] = useState(0);
  const [currentCap, setCurrentCap] = useState(14);
  const [nextGym, setNextGym] = useState('Brock');

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
      const encounters = encounterData ? JSON.parse(encounterData) : {};

      const encounterList = Object.values(encounters);

      setCaught(encounterList.filter((p) => p.status === 'caught').length);
      setDead(encounterList.filter((p) => p.status === 'dead').length);
      setFailed(encounterList.filter((p) => p.status === 'failed').length);
      setCompletedRoutes(Object.keys(encounters).length);

      const gymData = await AsyncStorage.getItem('defeatedBosses');
      const gyms = gymData ? JSON.parse(gymData) : [];

      setDefeatedGyms(gyms.length);

      const caps = fireRedCaps.caps.sort((a, b) => a.order - b.order);
      const nextGymData = caps.find((cap) => !gyms.includes(cap.id));

      if (nextGymData) {
        setCurrentCap(nextGymData.cap);
        setNextGym(nextGymData.name);
      } else {
        setCurrentCap(63);
        setNextGym('Champion Defeated');
      }
    } catch (e) {
      console.log('Error loading stats', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Run Stats</Text>

      <View style={styles.highlightCard}>
        <Text style={styles.label}>Current Level Cap</Text>
        <Text style={styles.highlightValue}>Lv. {currentCap}</Text>
        <Text style={styles.subText}>Next Gym: {nextGym}</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.smallCard}>
          <Text style={styles.label}>Starter</Text>
          <Text style={styles.value}>{starter}</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.label}>Caught</Text>
          <Text style={styles.value}>{caught}</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.label}>Dead</Text>
          <Text style={styles.value}>{dead}</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.label}>Failed</Text>
          <Text style={styles.value}>{failed}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Routes Completed</Text>
        <Text style={styles.value}>
          {completedRoutes} / {fireRedRoutes.routes.length}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Gyms Defeated</Text>
        <Text style={styles.value}>
          {defeatedGyms} / {fireRedCaps.caps.length}
        </Text>
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
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
  },

  highlightCard: {
    backgroundColor: '#111',
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,
  },

  highlightValue: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    marginTop: 4,
  },

  subText: {
    color: '#ccc',
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 6,
  },

  smallCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    width: '48%',
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
  },

  label: {
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },

  value: {
    fontSize: 22,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
});
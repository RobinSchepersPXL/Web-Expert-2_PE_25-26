import { View, Text, StyleSheet, ScrollView } from 'react-native';
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

      setCaught(
        encounterList.filter((p) => p.status === 'caught').length
      );

      setDead(
        encounterList.filter((p) => p.status === 'dead').length
      );

      setFailed(
        encounterList.filter((p) => p.status === 'failed').length
      );

      setCompletedRoutes(Object.keys(encounters).length);

      const gymData = await AsyncStorage.getItem('defeatedBosses');
      const gyms = gymData ? JSON.parse(gymData) : [];

      setDefeatedGyms(gyms.length);

      const caps = fireRedCaps.caps.sort((a, b) => a.order - b.order);

      const nextGymData = caps.find(
        (cap) => !gyms.includes(cap.id)
      );

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

  const routePercentage = Math.round(
    (completedRoutes / fireRedRoutes.routes.length) * 100
  );

  const gymPercentage = Math.round(
    (defeatedGyms / fireRedCaps.caps.length) * 100
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Run Stats</Text>

      <Text style={styles.subtitle}>
        Your current FireRed progress
      </Text>

      <View style={styles.highlightCard}>
        <Text style={styles.highlightLabel}>
          Current Level Cap
        </Text>

        <Text style={styles.highlightValue}>
          Lv. {currentCap}
        </Text>

        <Text style={styles.subText}>
          Next Gym: {nextGym}
        </Text>
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
          <Text style={[styles.value, styles.deadValue]}>
            {dead}
          </Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.label}>Failed</Text>
          <Text style={[styles.value, styles.failedValue]}>
            {failed}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Routes Completed</Text>

        <Text style={styles.value}>
          {completedRoutes} / {fireRedRoutes.routes.length}
        </Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${routePercentage}%` },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {routePercentage}% complete
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Gyms Defeated</Text>

        <Text style={styles.value}>
          {defeatedGyms} / {fireRedCaps.caps.length}
        </Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${gymPercentage}%` },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {gymPercentage}% complete
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7F3D0',
  },

  content: {
    padding: 16,
    paddingBottom: 40,
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

  highlightCard: {
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
  },

  highlightLabel: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  highlightValue: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '900',
    marginTop: 6,
  },

  subText: {
    color: '#D1D5DB',
    marginTop: 6,
    fontSize: 16,
    fontWeight: '700',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  smallCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 18,
    width: '48%',
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 18,
    marginBottom: 10,
  },

  label: {
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '700',
  },

  value: {
    fontSize: 23,
    fontWeight: '900',
    textTransform: 'capitalize',
    color: '#111827',
  },

  deadValue: {
    color: '#EF4444',
  },

  failedValue: {
    color: '#F59E0B',
  },

  progressTrack: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    marginTop: 14,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 999,
  },

  progressText: {
    marginTop: 8,
    color: '#6B7280',
    fontWeight: '700',
  },
});
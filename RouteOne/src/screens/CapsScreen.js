import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fireRedCaps from '../data/firered_caps.json';
import AnimatedCard from '../components/AnimatedCard';

export default function CapsScreen({ navigation }) {
  const caps = fireRedCaps.caps.sort((a, b) => a.order - b.order);
  const [defeatedGyms, setDefeatedGyms] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadDefeatedGyms();
    }, [])
  );

  const loadDefeatedGyms = async () => {
    try {
      const data = await AsyncStorage.getItem('defeatedBosses');
      setDefeatedGyms(data ? JSON.parse(data) : []);
    } catch (e) {
      console.log('Error loading defeated gyms', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Level Caps</Text>
      <Text style={styles.subtitle}>Plan each major FireRed battle</Text>

      <FlatList
        data={caps}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isDefeated = defeatedGyms.includes(item.id);

          return (
            <AnimatedCard
              style={styles.card}
              onPress={() =>
                navigation.navigate('CapDetail', { capItem: item })
              }
            >
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <View
                    style={[
                      styles.statusCircle,
                      isDefeated && styles.statusCircleActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusIcon,
                        isDefeated && styles.statusIconActive,
                      ]}
                    >
                      {isDefeated ? '✓' : ''}
                    </Text>
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.location}>{item.location}</Text>

                    <Text style={styles.statusText}>
                      {isDefeated ? 'Defeated' : 'Not defeated yet'}
                    </Text>
                  </View>
                </View>

                <View style={styles.capBadge}>
                  <Text style={styles.capLabel}>CAP</Text>
                  <Text style={styles.capText}>Lv. {item.cap}</Text>
                </View>
              </View>
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
    color: '#111827',
  },

  subtitle: {
    color: '#374151',
    marginTop: 4,
    marginBottom: 18,
    fontSize: 15,
    fontWeight: '600',
  },

  list: {
    paddingBottom: 24,
  },

  card: {
    padding: 16,
    borderRadius: 18,
  },

  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  statusCircle: {
    width: 34,
    height: 34,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  statusCircleActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },

  statusIcon: {
    fontWeight: '900',
    color: '#6B7280',
  },

  statusIconActive: {
    color: '#fff',
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 19,
    fontWeight: '900',
    color: '#111827',
  },

  location: {
    marginTop: 4,
    color: '#6B7280',
    fontWeight: '600',
  },

  statusText: {
    marginTop: 6,
    color: '#374151',
    fontSize: 13,
    fontWeight: '700',
  },

  capBadge: {
    backgroundColor: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: 'center',
    minWidth: 70,
  },

  capLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  capText: {
    color: '#fff',
    fontWeight: '900',
    marginTop: 2,
  },
});
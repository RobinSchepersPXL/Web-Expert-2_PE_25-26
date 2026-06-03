import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fireRedCaps from '../data/firered_caps.json';
import AnimatedCard from '../components/AnimatedCard';

export default function CapsScreen({ navigation }) {
  const caps = fireRedCaps.caps.sort((a, b) => a.order - b.order);
  const [defeatedBosses, setDefeatedBosses] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadDefeatedBosses();
    }, [])
  );

  const loadDefeatedBosses = async () => {
    try {
      const data = await AsyncStorage.getItem('defeatedBosses');
      setDefeatedBosses(data ? JSON.parse(data) : []);
    } catch (e) {
      console.log('Error loading defeated bosses', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FireRed Level Caps</Text>

      <FlatList
        data={caps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isDefeated = defeatedBosses.includes(item.id);

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

                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.location}>{item.location}</Text>
                  </View>
                </View>

                <View style={styles.capBadge}>
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
    padding: 16,
    backgroundColor: '#f6f6f6',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },

  card: {
    padding: 14,
  },

  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  statusCircle: {
    width: 28,
    height: 28,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusCircleActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },

  statusIcon: {
    fontWeight: '800',
  },

  statusIconActive: {
    color: '#fff',
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
  },

  location: {
    marginTop: 4,
    color: '#666',
  },

  capBadge: {
    backgroundColor: '#111',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  capText: {
    color: '#fff',
    fontWeight: '700',
  },
});
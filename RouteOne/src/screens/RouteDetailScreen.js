import { View, Text, StyleSheet } from 'react-native';

export default function RouteDetailScreen({ route }) {
  const { routeItem } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routeItem.name}</Text>
      <Text style={styles.meta}>{routeItem.types.join(', ')}</Text>
      <Text style={styles.phase}>Phase: {routeItem.phase}</Text>
      <Text style={styles.empty}>Nog geen encounter toegevoegd.</Text>
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
    fontWeight: '700',
    marginBottom: 8,
  },
  meta: {
    color: '#666',
    marginBottom: 20,
  },
  phase: {
    color: '#666',
    marginBottom: 24,
  },
  empty: {
    fontSize: 16,
  },
});
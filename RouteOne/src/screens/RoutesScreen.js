import { FlatList, Text, View, StyleSheet, Pressable } from 'react-native';

import fireRedRoutes from '../data/firered_routes.json';

export default function RoutesScreen({ navigation }) {
  const routes = fireRedRoutes.routes.sort((a, b) => a.order - b.order);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FireRed Routes</Text>

      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
          </Pressable>
        )}
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
});
// File: src/screens/CatalogScreen.js

import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../redux/campers/operations";
import {
  selectCampers,
  selectIsLoading,
  selectFilters,
} from "../redux/selectors";

export default function CatalogScreen({ navigation }) {
  const dispatch = useDispatch();

  // Використовуємо твої існуючі селектори
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    // Запускаємо завантаження при монтуванні компонента
    // Передаємо поточні фільтри (якщо вони є)
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  // Окремий рендер для картки (потім винесемо в src/components/CamperCard.js)
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("CamperDetails", { id: item.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>€{item.price?.toFixed(2)}</Text>
      </View>
      <Text style={styles.location}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading && campers.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#E44848" />
          <Text style={styles.loaderText}>Loading campers...</Text>
        </View>
      ) : (
        <FlatList
          data={campers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No campers found matching your criteria.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listContent: {
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    color: "#6C717B",
  },
  card: {
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    // Тінь для iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Тінь для Android
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#101828",
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#101828",
  },
  location: {
    marginTop: 8,
    color: "#6C717B",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#6C717B",
    fontSize: 16,
  },
});

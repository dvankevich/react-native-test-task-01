// File: src/screens/FavoritesScreen.js

import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
// Імпортуємо твої селектори
import { selectCampers, selectFavorites } from "../redux/selectors";

export default function FavoritesScreen({ navigation }) {
  const allCampers = useSelector(selectCampers);
  const favorites = useSelector(selectFavorites);

  // Оскільки selectFavorites повертає масив об'єктів (судячи з .some((fav) => fav.id...)),
  // ми відображаємо безпосередньо його
  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Catalog", {
                  screen: "CamperDetails",
                  params: { id: item.id },
                })
              }
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>€{item.price?.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No favorites yet</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F7F7F7",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  name: { fontSize: 18, fontWeight: "600", color: "#101828" },
  price: { fontSize: 16, color: "#101828", marginTop: 4 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#6C717B", fontSize: 16 },
});

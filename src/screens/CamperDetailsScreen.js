// File: src/screens/CamperDetailsScreen.js

import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
// Імпортуємо селектори
import { selectCampers, selectIsFavorite } from "../redux/selectors";
// Припустимо, що в тебе є екшени для додавання/видалення (з твого веб-проєкту)
// import { toggleFavorite } from '../redux/favorites/slice';

export default function CamperDetailsScreen() {
  const route = useRoute();
  const { id } = route.params;

  const campers = useSelector(selectCampers);
  const isFavorite = useSelector(selectIsFavorite(id));
  const camper = campers.find((c) => c.id === id);

  if (!camper) return null;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: camper.gallery?.[0]?.original }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{camper.name}</Text>
          <TouchableOpacity>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={28}
              color={isFavorite ? "#E44848" : "#101828"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>€{camper.price?.toFixed(2)}</Text>

        <View style={styles.statsRow}>
          <Ionicons name="star" size={16} color="#FFC531" />
          <Text style={styles.rating}>
            {camper.rating} ({camper.reviews?.length} Reviews)
          </Text>
          <Ionicons
            name="location-outline"
            size={16}
            color="#101828"
            style={{ marginLeft: 8 }}
          />
          <Text style={styles.location}>{camper.location}</Text>
        </View>

        <Text style={styles.description}>{camper.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 260 },
  content: { padding: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#101828", flex: 1 },
  price: { fontSize: 22, fontWeight: "600", marginVertical: 10 },
  statsRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  rating: { marginLeft: 4, textDecorationLine: "underline" },
  location: { marginLeft: 4 },
  description: { color: "#6C717B", lineHeight: 22, fontSize: 16 },
});

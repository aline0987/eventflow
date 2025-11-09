// app/eventos.tsx
import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useEventos } from "./EventosContext";

export default function Eventos() {
  const { eventos, removerEvento } = useEventos();

  const confirmarRemocao = (id: string) => {
    Alert.alert("Excluir Evento", "Tem certeza que deseja excluir este evento?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => removerEvento(id) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Cadastrados</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imagem ? (
              <Image source={{ uri: item.imagem }} style={styles.image} />
            ) : (
              <View style={styles.noImage}><Text style={{ color: "#999" }}>Sem imagem</Text></View>
            )}
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardText}>{item.descricao}</Text>
            <Text style={styles.cardSub}>📍 {item.local}</Text>
            {item.latitude && (
              <Text style={styles.cardSub}>
                🌐 {item.latitude.toFixed(4)}, {item.longitude?.toFixed(4)}
              </Text>
            )}

            <TouchableOpacity style={styles.deleteButton} onPress={() => confirmarRemocao(item.id)}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 15 },
  title: { fontSize: 26, color: "#fff", fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 10 },
  noImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#2c2c2e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  cardText: { color: "#ccc", marginVertical: 6 },
  cardSub: { color: "#aaa", fontSize: 14 },
  deleteButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});

// app/cadastrar.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useEventos } from "./EventosContext";

export default function Cadastrar() {
  const { adicionarEvento } = useEventos();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [local, setLocal] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  async function escolherImagem() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos da sua permissão para acessar a galeria!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setImagem(result.assets[0].uri);
  }

  async function obterLocalizacao() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Erro", "Permissão de localização negada!");
      return;
    }
    const local = await Location.getCurrentPositionAsync({});
    setLatitude(local.coords.latitude);
    setLongitude(local.coords.longitude);
    Alert.alert("Localização capturada!", `Lat: ${local.coords.latitude}, Lon: ${local.coords.longitude}`);
  }

  function salvarEvento() {
    if (!titulo || !descricao) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
      return;
    }

    const novoEvento = {
      id: Date.now().toString(),
      titulo,
      descricao,
      categoria,
      local,
      imagem: imagem ?? "",
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
    };

    adicionarEvento(novoEvento);
    Alert.alert("Sucesso", "Evento cadastrado!");
    setTitulo("");
    setDescricao("");
    setCategoria("");
    setLocal("");
    setImagem(null);
    setLatitude(null);
    setLongitude(null);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Cadastrar Evento</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={escolherImagem}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.image} />
        ) : (
          <Text style={styles.addImageText}>Adicionar Imagem</Text>
        )}
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
      <TextInput style={styles.input} placeholder="Categoria" value={categoria} onChangeText={setCategoria} />
      <TextInput style={styles.input} placeholder="Local" value={local} onChangeText={setLocal} />

      <TouchableOpacity style={styles.locationButton} onPress={obterLocalizacao}>
        <Text style={styles.locationButtonText}>📍 Obter Localização</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={salvarEvento}>
        <Text style={styles.saveButtonText}>Salvar Evento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1c1c1e", padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", color: "#f7f7f7", marginBottom: 20, textAlign: "center" },
  input: {
    backgroundColor: "#2c2c2e",
    color: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: "#3a3a3c",
    height: 220,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  addImageText: { color: "#aaa", fontSize: 16 },
  image: { width: "100%", height: "100%", borderRadius: 15 },
  locationButton: {
    backgroundColor: "#5856D6",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  locationButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  saveButton: {
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Alert, Platform } from "react-native";
import React, { useState } from "react";

const showAlert = (message) => {
  if (Platform.OS === "web") {
    window.alert(message);
  }else {
    Alert.alert("Alert", message,);
  }
}
      

export default function App() {
  return (
    <View style = {styles.container}>
      <Text style = {styles.title}>Botones en React Native</Text>

      <View style = {styles.section}>
        <Button
          title="Presioname"
          onPress={() => showAlert("Boton presionado!")}
        />
      </View>
      <View style = {styles.section}>
        <Text style = {styles.description}>Boton de color:</Text>
        <Button
          title="Presioname"
          color="#f194ff"
          onPress={() => showAlert("Boton de color presionado!")}
        />
      </View>
      <View style = {styles.section}>
        <Text style = {styles.description}>Dos botones</Text>
        <Button
          title="Desabilitado"
          onPress={() => showAlert("No funciona :(")}
        />
      </View>
      <View style = {styles.section}>
        <Text style = {styles.description}></Text>
        <View style = {styles.buttonRow}>
          <Button
            title="Izquierda"
            onPress={() => showAlert("Boton Izquierdo presionado")}
          />
        
          <View style = {styles.buttonSpacer} />
            <Button
              title="Derecha"
              onPress={() => showAlert("Boton Derecho presionado")}
            />
          
        </View>
      </View>
      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#000000",
  },

  section: {
    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333333",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonSpacer: {
    width: 10
  },
});

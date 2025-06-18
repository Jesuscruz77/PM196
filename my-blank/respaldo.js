import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';

const Texto = ({style})=> {
      const [contenido, setContenido] = useState("Hola Mundo"); 
      const actualizaTexto = () => {setContenido("State Modificado")};
      return(
        <Text style={[styles.text, style]} onPress={actualizaTexto} >{contenido}</Text>
      );
    };

export default function App() {
  const [contenido, setTitle] = useState("Hola Mundo desde un botón"); 
  const actualizaBtn = () => {setTitle("Botón modificado")};
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Texto style={styles.verde}></Texto>
      <Texto style={styles.amarillo}></Texto>
      <Texto style={styles.azul}></Texto>

      <Button onPress={actualizaBtn} title={contenido} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: "space-evenly",
    flexDirection: "column",

  },
    
  text: {
    color: "white",
    fontSize: 28,
    width: 100,
    height: 100,
    textAlign: "center",

  },

  verde:{backgroundColor:'green',},
  amarillo:{backgroundColor:'yellow',},
  azul:{backgroundColor:'blue',},


});

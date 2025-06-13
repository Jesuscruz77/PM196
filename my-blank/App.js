import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';

const Texto = ()=> {
      const [contenido, setContenido] = useState("Hola Mundo"); 
      const actualizaTexto = () => {setContenido("State Modificado")};
      return(
        <Text onPress={actualizaTexto}>{contenido}</Text>
      );
    };

export default function App() {
  const [contenido, setTitle] = useState("Hola Mundo desde un botón"); 
  const actualizaBtn = () => {setTitle("Botón modificado")};
  return (
    <View style={styles.container}>
      <Texto></Texto>
      <Texto></Texto>
      <Texto></Texto>
      <Button onPress={actualizaBtn} title={contenido} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

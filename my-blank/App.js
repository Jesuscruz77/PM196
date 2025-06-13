import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

const Texto = (props)=> {
    const {contenido} = props;
      return(
        <Text>{contenido}</Text>
      );
    };

export default function App() {
  return (
    <View style={styles.container}>
      <Texto contenido = "Holaaaaaaaaaaaaaaaaaaaaaaaaa"></Texto>
      <Texto contenido = "Hola desde un parametro"></Texto>
      <Texto contenido = "React Native"></Texto>
      <Button title='Presioname'> </Button>,
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

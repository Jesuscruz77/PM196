import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

const Texto = (props)=> {
    const {children} = props;
      return(
        <Text>{children}</Text>
      );
    };

export default function App() {
  return (
    <View style={styles.container}>
      <Texto>"Hola que tal"</Texto>
      <Texto>"Hola estrellitas la tierra les dice hola"</Texto>
      <Texto>React Native</Texto>
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

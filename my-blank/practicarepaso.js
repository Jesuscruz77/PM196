import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TextInput, Switch, Button, Image, ImageBackground, ActivityIndicator, Alert, Platform, StyleSheet } from 'react-native';

const App = () => { 
  const [cargando, setCargando] = useState(true);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [terminos, setTerminos] = useState(false);

  const mostrarAlerta = () => {
    if (!nombre || !email) {
      if (Platform.OS === 'web') {
        window.alert('Por favor completa todos los campos.');
      } else {
        Alert.alert(
          'Error',
          'Por favor completa todos los campos',
          [{ text: 'OK' }]
        );
      }
    } else if (!terminos) {
      if (Platform.OS === 'web') {
        window.alert('Debes aceptar los términos y condiciones.');
      } else {
        Alert.alert(
          'Términos no aceptados',
          'Debes aceptar los términos y condiciones.',
          [{ text: 'OK' }]
        );
      }
    } else {
      if (Platform.OS === 'web') {
        window.alert(`Registro exitoso\nNombre: ${nombre}\nEmail: ${email}`);
        limpiarFormulario();
      } else {
        Alert.alert(
          'Datos registrados correctamente',
          `Nombre: ${nombre}\nEmail: ${email}`,
          [{ text: 'OK', onPress: () => limpiarFormulario() }]
        );
      }
    }
  };
    const limpiarFormulario = () => {
    setNombre('');
    setEmail('');
    setTerminos(false);
  };

  useEffect(() => {
    setTimeout(() => setCargando(false), 2000);
  }, []);

  if (cargando) {
    return (
      <View style={styles.splash}>
        <Image
          source={{ uri: 'https://pulsouniversitario.mx/universidad/76/universidad-politecnica-de-queretaro' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.splashText}>Cargando...</Text>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
    return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
      style={styles.background}
      resizeMode='cover'
    >
        <View style={styles.container}>
            <SafeAreaView style={styles.overlay}>
            <Text style={styles.title}>Registro de Usuario</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#666"
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.switchRow}>
                <Text style={styles.label}>Aceptar términos y condiciones</Text>
                <Switch
                value={terminos}
                onValueChange={setTerminos}
                trackColor={{ false: '#ccc', true: '#4caf50' }}
                thumbColor={Platform.OS === 'android' ? '#ffffff' : undefined}
                ios_backgroundColor="#3e3e3e"
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Registrarse" onPress={mostrarAlerta} />
            </View>
            </SafeAreaView>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    splash: {
        flex: 1,
        backgroundColor: '#2c3e50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    splashText: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
    },
    background: {
        flex:1,
        justifyContent: 'center',
    },
    overlay: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        margin: 20,
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        paddingHorizontal: 10,
    },
});

export default App;


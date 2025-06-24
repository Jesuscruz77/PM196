import React, { useState } from "react";
import {View, StyleSheet, Text, Button, ActivityIndicator} from "react-native";
import { StatusBar } from "react-native-web";

export default function App() {
    const [cargando, setCargando] = useState(false);
    const [datos, setMensaje] = useState("");
    
    const SimularCarga = () => {
        setCargando(true);
        setDatos("");
        setTimeout(() => {
            setCargando(false);
            setMensaje("Datos cargados correctamente");
        }, 8000);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.titulo}>ActivityIndicator</Text>

        <Button title="Cargar Datos" onPress={SimularCarga} color="#007AFF" />

        {cargando && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}

        {datos !== '' && <Text>{datos}</Text>}

        <StatusBar style="auto" />
        </View>
    );
        
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    btnContainer: {
        marginVertical: 10,
        width: '60%',
    },

    loader: {
        marginVertical: 20,
    },
    textoResultado: {
        marginTop: 20,
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },

});


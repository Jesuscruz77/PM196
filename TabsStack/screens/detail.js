import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Detail({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}onPress={() => navigation.goBack()}>
                {/* Esta funcion regresa a la pantalla anterior cumpliendo con el funcionamento al momento de dar clic */}
                <Text style={styles.backText}>← MainTabs</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Detail</Text>
            <View style={styles.placeholder} />
        </View>
        
        <View style={styles.content}>
            <Text style={styles.title}>Detalles Usuario</Text>
            <Text style={styles.subtitle}>Usando Navegacion Stack</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginTop: 30,
    },
    backButton: {
        flex: 1,
    },
    backText: {
        fontSize: 16,
        color: '#007AFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        flex: 1,
    },
    placeholder: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#007AFF',
    },
});
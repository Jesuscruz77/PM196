import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Perfil({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.content}>
            <View style={styles.iconContainer}>
            <Ionicons name="person-outline" size={28} color="green" />
            <Text style={styles.title}>Perfil usuario</Text>
        </View>
        
        <Pressable style={styles.button} onPress={() => navigation.navigate('Detail')}>
          <Text style={styles.buttonText}>Detalles de Usuario</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginTop: 30,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 6,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});
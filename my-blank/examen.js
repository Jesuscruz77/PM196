import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [peliculas, setPeliculas] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [tiposBusqueda, setTiposBusqueda] = useState('aproximada');

  const API_KEY = 'c9856d0cb57c3f14bf75bdc6c063b8f3';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const buscarPeliculas = async () => {
    if (!busqueda.trim()) {
      mostrarAlerta('Error', 'Por favor ingresa el nombre de una película');
      return;
    }

    setBuscando(true);
    setPeliculas([]);

    try {
      const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(busqueda)}&language=es-MX`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        let resultados = data.results;

        if (tiposBusqueda === 'exacta') {
          resultados = resultados.filter(pelicula =>
            pelicula.title.toLowerCase() === busqueda.toLowerCase() ||
            (pelicula.original_title && pelicula.original_title.toLowerCase() === busqueda.toLowerCase())
          );
        }

        // Agregar retraso de 1 segundo antes de mostrar los resultados
        setTimeout(() => {
          setPeliculas(resultados);
          setBuscando(false);

          if (resultados.length === 0) {
            mostrarAlerta('Sin resultados', 'No se encontraron películas con ese nombre');
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Error al buscar películas:', error);
      // En caso de error, también aplicamos el retraso para consistencia
      setTimeout(() => {
        setBuscando(false);
        mostrarAlerta('Error', 'Error al conectar con el servidor. Verifica tu conexión a internet.');
      }, 1000);
    }
  };

  const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}: ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje, [{ text: 'OK' }]);
    }
  };

  const limpiarBusqueda = () => {
    setBusqueda('');
    setPeliculas([]);
  };

  const renderPelicula = ({ item }) => (
    <TouchableOpacity style={styles.peliculaCard} activeOpacity={0.8}>
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: item.poster_path
              ? `${IMAGE_BASE_URL}${item.poster_path}`
              : 'https://via.placeholder.com/200x300/1a1a1a/ffffff?text=Sin+Imagen'
          }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
          </Text>
        </View>
      </View>

      <View style={styles.peliculaInfo}>
        <Text style={styles.titulo} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.metaInfo}>
          <Text style={styles.anio}>
            {item.release_date ? new Date(item.release_date).getFullYear() : 'N/A'}
          </Text>
          <View style={styles.genreTag}>
            <Text style={styles.genreText}>Película</Text>
          </View>
        </View>

        <Text style={styles.descripcion} numberOfLines={3}>
          {item.overview || 'Sin descripción disponible'}
        </Text>

        <TouchableOpacity style={styles.verMasButton}>
          <Text style={styles.verMasText}>Ver más</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    setTimeout(() => setCargando(false), 2500);
  }, []);

  if (cargando) {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.splash}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>🎬</Text>
          </View>
          <Text style={styles.appName}>Mi App De Peliculitas</Text>
          <Text style={styles.appTagline}>Descubre tu próxima película favorita</Text>
        </View>

        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color="#ff6b6b" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mi App De Peliculitas</Text>
          <Text style={styles.headerSubtitle}>Encuentra películas increíbles</Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="¿Qué película buscas?"
              placeholderTextColor="#8e8e93"
              value={busqueda}
              onChangeText={setBusqueda}
              onSubmitEditing={buscarPeliculas}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={buscarPeliculas}
              disabled={buscando}
            >
              {buscando ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.searchButtonText}>🔍</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Search Type Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                tiposBusqueda === 'aproximada' && styles.toggleButtonActive
              ]}
              onPress={() => setTiposBusqueda('aproximada')}
            >
              <Text style={[
                styles.toggleText,
                tiposBusqueda === 'aproximada' && styles.toggleTextActive
              ]}>
                Aproximada
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                tiposBusqueda === 'exacta' && styles.toggleButtonActive
              ]}
              onPress={() => setTiposBusqueda('exacta')}
            >
              <Text style={[
                styles.toggleText,
                tiposBusqueda === 'exacta' && styles.toggleTextActive
              ]}>
                Exacta
              </Text>
            </TouchableOpacity>
          </View>

          {busqueda.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={limpiarBusqueda}>
              <Text style={styles.clearButtonText}>Limpiar búsqueda</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Results Section */}
        {buscando && (
          <View style={styles.searchingContainer}>
            <ActivityIndicator size="large" color="#ff6b6b" />
            <Text style={styles.searchingText}>Buscando películas...</Text>
          </View>
        )}

        {peliculas.length > 0 && (
          <View style={styles.resultsSection}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>
                {peliculas.length} película{peliculas.length !== 1 ? 's' : ''} encontrada{peliculas.length !== 1 ? 's' : ''}
              </Text>
            </View>

            <FlatList
              data={peliculas}
              renderItem={renderPelicula}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}

        {!buscando && peliculas.length === 0 && busqueda.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🎭</Text>
            <Text style={styles.emptyStateTitle}>¡Comienza tu búsqueda!</Text>
            <Text style={styles.emptyStateText}>
              Escribe el nombre de una película para descubrir información detallada
            </Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  logoText: {
    fontSize: 48,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: 1,
  },
  appTagline: {
    fontSize: 16,
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingIndicator: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '500',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8e8e93',
  },
  searchSection: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 26,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  searchButtonText: {
    fontSize: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 4,
    marginBottom: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 21,
  },
  toggleButtonActive: {
    backgroundColor: '#ff6b6b',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  toggleText: {
    fontSize: 14,
    color: '#8e8e93',
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  clearButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  clearButtonText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '500',
  },
  searchingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '500',
  },
  resultsSection: {
    flex: 1,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  separator: {
    height: 16,
  },
  peliculaCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  posterContainer: {
    position: 'relative',
    marginRight: 16,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  ratingBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 32,
    alignItems: 'center',
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  peliculaInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 22,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  anio: {
    fontSize: 14,
    color: '#8e8e93',
    marginRight: 12,
    fontWeight: '500',
  },
  genreTag: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  genreText: {
    fontSize: 12,
    color: '#ff6b6b',
    fontWeight: '500',
  },
  descripcion: {
    fontSize: 14,
    color: '#b0b0b0',
    lineHeight: 20,
    marginBottom: 12,
  },
  verMasButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  verMasText: {
    color: '#ff6b6b',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default App;

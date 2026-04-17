import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenLayout from '../Components/ScreenLayout';
import { getRecomendados, buscarVendedores } from '../services/vendorService';

const CATEGORIES = [
  { id: 1, name: 'BURGERS', icon: 'fast-food', bg: '#FDE8E8', iconColor: '#C0392B' },
  { id: 2, name: 'PIZZAS', icon: 'pizza', bg: '#FEF6D8', iconColor: '#F0A500' },
  { id: 3, name: 'PANES', icon: 'cafe', bg: '#FDE8E8', iconColor: '#C0392B' },
  { id: 4, name: 'POSTRES', icon: 'ice-cream', bg: '#FEF6D8', iconColor: '#F0A500' },
  { id: 5, name: 'CAFÉ', icon: 'cafe', bg: '#F8C8C8', iconColor: '#C0392B', active: true },
  { id: 6, name: 'SALUDABLE', icon: 'leaf', bg: '#FEF6D8', iconColor: '#F0A500' },
];

// Datos reales suministrados por el backend

const VendorCard = ({ vendor, onPress }) => (
  <TouchableOpacity style={styles.vendorCard} onPress={onPress}>
    <Image
      source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' }}
      style={styles.vendorImage}
    />
    <View style={styles.vendorInfo}>
      <Text style={styles.vendorName}>{vendor.nombreNegocio}</Text>
      <Text style={styles.vendorDetails}>
        {vendor.nombreCategoria || 'Sin categoría'} • {vendor.estado}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
  </TouchableOpacity>
);

const CategoryCard = ({ category }) => (
  <View style={[styles.categoryCard, { backgroundColor: category.bg }]}>
    <View style={styles.categoryIconContainer}>
      <Ionicons
        name={category.icon}
        size={28}
        color={category.iconColor}
      />
    </View>
    <Text style={styles.categoryName}>{category.name}</Text>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchVendors = async () => {
      setLoading(true);
      try {
        if (searchText.trim() === '') {
          const list = await getRecomendados();
          if (active) setVendors(list);
        } else {
          const list = await buscarVendedores(searchText);
          if (active) setVendors(list);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchVendors();
    }, 400);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [searchText]);

  return (
    <ScreenLayout>
      
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Ionicons name="restaurant" size={20} color="#fff" />
              </View>
              <Text style={styles.logoText}>Antojos</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileIcon}>
                <Ionicons name="person" size={22} color="#9ca3af" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="¿Cuál es tu antojo hoy?"
                placeholderTextColor="#9ca3af"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchText.trim() === '' ? 'Recomendados para ti' : 'Resultados de búsqueda'}
            </Text>
            <View style={styles.accentLine} />
          </View>

          <View style={styles.vendorList}>
            {loading ? (
              <Text style={{ textAlign: 'center', marginTop: 10, color: '#9ca3af' }}>Cargando antojos...</Text>
            ) : vendors.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 10, color: '#9ca3af' }}>No se encontraron negocios</Text>
            ) : (
              vendors.map((vendor) => (
                <VendorCard
                  key={vendor.idVendedor}
                  vendor={vendor}
                  onPress={() => navigation.navigate('VendorDetails', { vendor })}
                />
              ))
            )}
          </View>

          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>Ver más antojos</Text>
          </TouchableOpacity>

          <Text style={styles.categoriesTitle}>Categorías</Text>

          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </View>

          <View style={styles.bottomPadding} />
        </View>
      
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#C0392B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileButton: {
    padding: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    marginVertical: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  accentLine: {
    height: 4,
    width: 60,
    backgroundColor: '#F0A500',
    borderRadius: 2,
  },
  vendorList: {
    marginBottom: 20,
  },
  vendorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  vendorImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
  },
  vendorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  vendorDetails: {
    fontSize: 14,
    color: '#9ca3af',
  },
  viewMoreButton: {
    borderWidth: 2,
    borderColor: '#C0392B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 25,
  },
  viewMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C0392B',
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#374151',
  },
  bottomPadding: {
    height: 20,
  },
});

export default HomeScreen;

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenLayout from '../Components/ScreenLayout';
import { getVendorDetail } from '../services/vendorDetailService';



export default function HomeScreen_Vendor({ user }) {
  const { width } = useWindowDimensions();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cálculo responsivo de columnas
  const numColumns = width > 768 ? 3 : 2;
  const columnWidth = (width - (20 * 2) - (15 * (numColumns - 1))) / numColumns;

  // El idVendedor del usuario logueado. 
  // Asumiendo que viene en el perfil o que lo buscamos por idUser.
  // En este punto, el backend ya tiene endpoints para traer el perfil.
  // Pero para este Home, usaremos el idVendedor si está disponible en 'user'.
  // Si no, lo simulamos o lo traemos de la API de detalle si el id es conocido.

  useEffect(() => {
    let active = true;
    const fetchVendorData = async () => {
      setLoading(true);
      try {
        const vendorId = user.idVendedor || 1;
        const data = await getVendorDetail(vendorId);
        if (active) {
          setDetail(data);
        }
      } catch (error) {
        console.error("Error fetching vendor home data:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchVendorData();
    return () => { active = false; };
  }, [user]);

  if (loading) {
    return (
      <ScreenLayout>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#C0392B" />
        </View>
      </ScreenLayout>
    );
  }

  const products = detail?.productos || [];

  return (
    <ScreenLayout containerStyle={{ backgroundColor: '#F9FAFB' }}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>{detail?.nombreNegocio || 'Antojos - Mi Tienda'}</Text>
        </View>
        {/* Botón de perfil removido */}
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>Tus productos</Text>
        <View style={styles.itemCountBadge}>
          <Text style={styles.itemCountText}>{products.length} Items</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {products.map((item) => (
          <View key={item.idProducto} style={[styles.productCard, { width: columnWidth }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop' }}
              style={{ width: columnWidth, height: columnWidth, borderRadius: 16, marginBottom: 10 }}
            />
            <Text style={styles.productName} numberOfLines={1}>{item.nombreProd}</Text>
          </View>
        ))}

        <TouchableOpacity style={[styles.newItemCard, { width: columnWidth, height: columnWidth + 30 }]}>
          <View style={styles.plusIconCircle}>
            <Ionicons name="add" size={32} color="#fff" />
          </View>
          <Text style={styles.newItemText}>NUEVO ITEM</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="#374151" />
        <Text style={styles.deleteButtonText}>Eliminar productos</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  itemCountBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  itemCountText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  productCard: {
    marginBottom: 25,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'left',
  },
  newItemCard: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FCA5A5',
    borderStyle: 'dashed',
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  plusIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E81123',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  newItemText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#E81123',
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 10,
  },
});

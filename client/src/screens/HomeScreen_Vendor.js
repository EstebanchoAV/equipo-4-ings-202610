import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenLayout from '../Components/ScreenLayout';
import { getVendorDetail } from '../services/vendorDetailService';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 2;

export default function HomeScreen_Vendor({ user }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

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
        // En un caso real, buscaríamos el idVendedor asociado al idUser.
        // Por ahora, asumimos que el idUser de 'user' nos sirve para identificar al vendedor.
        // O si ya tenemos el idVendedor en la sesión.
        const vendorId = user.idVendedor || 1; // Fallback para dev
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
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' }}
            style={styles.avatar}
          />
          <Text style={styles.headerTitle}>Antojos - Mi Tienda</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="person" size={24} color="#E81123" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>Tus productos</Text>
        <View style={styles.itemCountBadge}>
          <Text style={styles.itemCountText}>{products.length} Items</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {products.map((item) => (
          <View key={item.idProducto} style={styles.productCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop' }} // Placeholder
              style={styles.productImage}
            />
            <Text style={styles.productName} numberOfLines={1}>{item.nombreProd}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.newItemCard}>
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
    paddingVertical: 15,
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
    width: COLUMN_WIDTH,
    marginBottom: 25,
  },
  productImage: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH,
    borderRadius: 16,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'left',
  },
  newItemCard: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH + 30, // Proporcional al card de producto
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

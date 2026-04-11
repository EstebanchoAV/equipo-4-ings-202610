import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import ScreenLayout from '../Components/ScreenLayout';

const ProfileScreen = ({ onLogout }) => {
  const showAlert = (title, message, onOk) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(title, message, onOk ? [{ text: "OK", onPress: onOk }] : [{ text: "OK" }]);
    }
  };

  const handleLogout = () => {
    showAlert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      () => {
        onLogout();
      }
    );
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={styles.comingSoon}>Próximamente</Text>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  comingSoon: {
    fontSize: 18,
    color: '#9ca3af',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#C0392B',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;

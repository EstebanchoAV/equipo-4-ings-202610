import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { checkServerHealth } from './src/services/api';

import LoginScreen from './src/screens/LoginScreen';
import ClientRegisterScreen from './src/screens/ClientRegisterScreen';
import VendorRegisterScreen from './src/screens/VendorRegisterScreen';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [serverStatus, setServerStatus] = useState('checking');
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await checkServerHealth();
        setServerData(data);
        setServerStatus('connected');
      } catch (error) {
        setServerStatus('error');
      }
    };

    fetchHealth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍔 Antojos UPB</Text>
      
      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>Estado del Servidor:</Text>
        {serverStatus === 'checking' && (
          <ActivityIndicator size="small" color="#0000ff" />
        )}
        {serverStatus === 'connected' && (
          <Text style={styles.connectedText}>🟢 {serverData?.message}</Text>
        )}
        {serverStatus === 'error' && (
          <Text style={styles.errorText}>🔴 Error al conectar. Verifica tu IP.</Text>
        )}
      </View>

      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.navButtonText}>Ir al Inicio de Sesión</Text>
      </TouchableOpacity>

    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Inicio' }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Ingresar', headerShown: false }} 
        />
        <Stack.Screen 
          name="ClientRegister" 
          component={ClientRegisterScreen} 
          options={{ title: 'Registro Cliente', headerShown: false }} 
        />
        <Stack.Screen 
          name="VendorRegister" 
          component={VendorRegisterScreen} 
          options={{ title: 'Registro Vendedor', headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  statusBox: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  statusLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  connectedText: {
    fontSize: 14,
    color: '#2e7d32',
    textAlign: 'center',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
    color: '#d32f2f',
    textAlign: 'center',
    fontWeight: '600',
  },
  navButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    color: '#999',
    position: 'absolute',
    bottom: 40,
  },
});

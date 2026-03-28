import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { checkServerHealth } from './src/services/api';

export default function App() {
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

      <Text style={styles.info}>Sprint 1: Integración inicial lista</Text>
      <StatusBar style="auto" />
    </View>
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
  info: {
    fontSize: 12,
    color: '#999',
    position: 'absolute',
    bottom: 40,
  },
});

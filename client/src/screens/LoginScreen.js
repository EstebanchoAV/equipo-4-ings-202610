import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import BackButton from '../Components/BackButton';
import ScreenLayout from '../Components/ScreenLayout';
import BoxSha from '../Components/BoxSha';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login attempt with:', email, password);
  };

  return (
    <ScreenLayout scrollStyle={styles.scrollContainer}>
      <BackButton navigation={navigation} />

      <View style={styles.formContainer}>

        <BoxSha>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />


          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Juan123."
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>



          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ClientRegister')}>
              <Text style={styles.registerClientLink}>Registrarse como Cliente</Text>
              <View style={styles.divider} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('VendorRegister')}>
              <Text style={[styles.registerLink, styles.vendorClientLink]}>Registrarse como Vendedor</Text>
            </TouchableOpacity>
          </View>

        </BoxSha>
      </View>

    </ScreenLayout>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',

  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginLeft: 4
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 13,
    borderWidth: 0.5,
    borderColor: '#e5e7eb',
    shadowColor: 'rgba(232, 17, 35, 0.25)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: '#e81123',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 5,
    width: '100%',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 5,

  },
  registerClientLink: {
    color: '#e81123',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 1,
  },

  vendorClientLink: {
    color: '#064e3b',
    fontSize: 15,
    fontWeight: '600',
  }
});

export default LoginScreen;

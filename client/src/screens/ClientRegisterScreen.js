import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import BackButton from '../Components/BackButton';
import ScreenLayout from '../Components/ScreenLayout';
import BoxSha from '../Components/BoxSha';

const ClientRegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showAlert = (title, message, onOk) => {
    if (Platform.OS === 'web') {
      alert(`${title}:\n ${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(title, message, onOk ? [{ text: "OK", onPress: onOk }] : [{ text: "OK" }]);
    }
  };

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,70}$/;
  const regexEmail = /^[A-Za-z0-9\.-_]+@[\w\d]+\.\w+$/;
  const regexPhone = /^[3]{1}[0-5]{1}[0-9]{8}$/;

  const handleRegister = async () => {
    
    let errors = [];

    //Limpieza de espacios y validación de campos vacíos
    const n = name.trim();
    const e = email.trim();
    const t = telephone.trim();
    const p = password.trim();

    if (!n || !e || !t || !p) {
      errors.push("• Todos los campos son obligatorios.");
    }

    // 2. Validaciones de formato
    if (n && !regexName.test(n)) {
      errors.push("• El nombre no es valido o es demasiado corto");
    }


    if (e && !regexEmail.test(e)) {
      errors.push("• El correo electrónico no es válido.");
    }

    if (t && !regexPhone.test(t)) {
      errors.push("• El teléfono debe empezar con 3 y tener 10 dígitos.");
    }

    if (p && p.length < 8) {
      errors.push("• La contraseña debe tener al menos 8 caracteres.");
    }

    if (errors.length > 0) {
      showAlert("Campos incorrectos", errors.join("\n"));
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/registro/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreClient: n,
          email: e,
          contrasena: p,
          telefono: t
        }),
      });

      const responseText = await response.text();

      if (response.ok) {
        setName('');
        setTelephone('');
        setEmail('');
        setPassword('');
  

        showAlert("¡Éxito!", "Cliente registrado correctamente", () => {
          navigation.navigate('Login');
        });
      } else {
        showAlert("Aviso", responseText || "Tuvimos un problema con el registro");
      }
    } catch (error) {
      console.error(error);
      showAlert("Error de conexión", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <ScreenLayout scrollStyle={styles.scrollContainer}>

      <BackButton navigation={navigation} />

      <View style={styles.formContainer}>

        <BoxSha>
          <Text style={styles.title}>Crea tu cuenta</Text>
          <Text style={styles.subtitle}>Regístrate como cliente</Text>

          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Juan Pérez Pérez"
            placeholderTextColor="#9ca3af"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Telefono</Text>
          <TextInput
            style={styles.input}
            placeholder="3001234567"
            placeholderTextColor="#9ca3af"
            value={telephone}
            onChangeText={setTelephone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="juan@mail.com"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
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


          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>


          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.sellerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('VendorRegister')}>
              <Text style={styles.sellerLink}>¿Eres vendedor?</Text>
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
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#e5e7eb',
    shadowColor: 'rgba(232, 17, 35, 0.25)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  registerButton: {
    backgroundColor: '#e81123',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'

  },
  loginText: {
    color: '#6b7280',
    fontSize: 14,
    marginRight: 5
  },
  loginLink: {
    color: '#e81123',
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 15,
    width: '100%',
  },
  sellerContainer: {
    alignItems: 'center',
  },

  sellerLink: {
    fontSize: 15,
    color: '#e81123',
    fontWeight: '600',
  }
});

export default ClientRegisterScreen;
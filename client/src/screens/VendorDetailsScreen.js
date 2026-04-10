import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BackButton from '../Components/BackButton';
import BoxSha from '../Components/BoxSha';
import ScreenLayout from '../Components/ScreenLayout';

const VendorDetailsScreen = ({ route, navigation }) => {
    const { initialData } = route.params || {};

    const [description, setDescription] = useState('');
    const [whatsappLink, setWhatsappLink] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [categories] = useState([
        { id: 1, nombre: 'Comida Rápida' },
        { id: 2, nombre: 'Postres / Dulces' },
        { id: 3, nombre: 'Bebidas' },
    ]);

    const showAlert = (title, message, onOk) => {

        if (Platform.OS === 'web') {
            alert(`${title}: ${message}`);
            if (onOk) onOk();
        } else {
            Alert.alert(title, message, onOk ? [{ text: "OK", onPress: onOk }] : [{ text: "OK" }]);
        }
    };

    const regexText = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s]+$/;

    const handleFinalRegister = async () => {

        let errors = [];

        const ds = description.trim();
        const wl = whatsappLink.trim();

        if (!ds || !wl || !categoryId) {
            errors.push("• Todos los campos son obligatorios.");
        }

        if (!regexText.test(ds)) {
            errors.push("• La descripción no es válida.");
        }

        if (errors.length > 0) {
            showAlert("Campos incorrectos", errors.join("\n"));
            return;

        }


        try {
            const payload = {
                nombreNegocio: initialData.b,
                nombrePropietario: initialData.o,
                email: initialData.e,
                contrasena: initialData.p,
                telefono: initialData.t,
                descripcionNeg: ds,
                idCategoriaV: categoryId,
                contactoVen: wl
            };

            const response = await fetch('http://localhost:8080/api/auth/registro/vendedor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const responseText = await response.text();

            if (response.ok) {
                showAlert("¡Éxito!", "Vendedor registrado correctamente", () => {
                    navigation.navigate('Login');
                });
            } else {
                showAlert("Aviso", responseText || "Tuvimos un problema con el registro");
            }
        } catch (error) {
            console.error(error);
            showAlert("Error de conexión", "No se pudo conectar con el servidor. Verifica tu IP e intenta de nuevo.");
        }
    };

    return (
        <ScreenLayout scrollStyle={styles.scrollContainer}>

            <BackButton navigation={navigation} />

            <View style={styles.formContainer}>

                <BoxSha>
                    <Text style={styles.title}>Termina el Registro</Text>
                    <Text style={styles.infoText}>Paso 2 de 2: Información básica</Text>

                    <Text style={styles.label}>Descripción</Text>
                    <TextInput
                        placeholder="Mi negocio trata de:"
                        placeholderTextColor="#9ca3af"
                        style={styles.input}
                        multiline
                        onChangeText={setDescription}
                    />

                    <Text style={styles.label}>Categoría del negocio</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker

                            selectedValue={categoryId}
                            onValueChange={(itemValue) => setCategoryId(itemValue)}
                            style={styles.picker}
                            mode="dropdown"
                        >
                            <Picker.Item label="Selecciona una categoría..." value="" color="#9ca3af" />
                            {categories.map((cat) => (
                                <Picker.Item key={cat.id} label={cat.nombre} value={cat.id} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Contacto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="https://wa.me/57300..."
                        placeholderTextColor="#9ca3af"
                        value={whatsappLink}
                        onChangeText={setWhatsappLink}
                        keyboardType="url"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TouchableOpacity style={styles.registerButton} onPress={handleFinalRegister}>
                        <Text style={styles.registerButtonText}>Finalizar Registro</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />


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
        color: '#064e3b',
        marginBottom: 8,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 16,
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
        shadowColor: 'rgba(6, 78, 59, 0.2)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
    },
    pickerWrapper: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
    },
    picker: {
        height: 50,
        width: '100%',
        borderWidth: 0,
        outlineStyle: 'none',
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
    },
    registerButton: {
        backgroundColor: '#064e3b', // green for vendors
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: 'rgba(6, 78, 59, 0.2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
    },
    registerButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600'
    },
});

export default VendorDetailsScreen;
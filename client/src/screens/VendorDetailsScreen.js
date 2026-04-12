import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import BoxSha from '../Components/BoxSha';
import ModalSelectField from '../Components/ModalSelectField';
import ScreenLayout from '../Components/ScreenLayout';
import { registerVendor } from '../services/authService';
import { validateVendorDetailsForm } from '../utils/validators';

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

    const categoryOptions = useMemo(
        () => categories.map((c) => ({ value: c.id, label: c.nombre })),
        [categories]
    );

    const showAlert = (title, message, onOk) => {

        if (Platform.OS === 'web') {
            alert(`${title}: ${message}`);
            if (onOk) onOk();
        } else {
            Alert.alert(title, message, onOk ? [{ text: "OK", onPress: onOk }] : [{ text: "OK" }]);
        }
    };

    const handleFinalRegister = async () => {

        const ds = description.trim();
        const wl = whatsappLink.trim();

        const errors = validateVendorDetailsForm(ds, categoryId, wl);

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

            await registerVendor(payload);

            showAlert("¡Éxito!", "Vendedor registrado correctamente", () => {
                navigation.navigate('Login');
            });
            
        } catch (error) {
            console.error(error);
            const message = error.message === "Failed to fetch" || error.message.includes("Network Error") 
                ? "No se pudo conectar con el servidor. Verifica tu IP e intenta de nuevo." 
                : error.message;
                
            showAlert("Aviso", message);
        }
    };

    return (
        <ScreenLayout scrollStyle={styles.scrollContainer}>

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

                    <View style={styles.selectBlock}>
                        <ModalSelectField
                            title="Categoría del negocio"
                            placeholder="Selecciona una categoría..."
                            hintText="Toca para elegir categoría"
                            value={categoryId}
                            onSelect={setCategoryId}
                            options={categoryOptions}
                            marginBottom={false}
                        />
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
    selectBlock: {
        marginBottom: 13,
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
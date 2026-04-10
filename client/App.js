import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/LoginScreen';
import ClientRegisterScreen from './src/screens/ClientRegisterScreen';
import VendorRegisterScreen from './src/screens/VendorRegisterScreen';
import VendorDetailsScreen from './src/screens/VendorDetailsScreen';
import ScreenLayout from './src/Components/ScreenLayout';
import BoxSha from './src/Components/BoxSha';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabButton = ({ children, onPress }) => (

  <TouchableOpacity
    style={{
      top: -5,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >

    <View style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'rgb(232, 17, 35)',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {children}

    </View>
  </TouchableOpacity>

);

function DummyScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, color: '#999' }}>Próximamente</Text>
    </View>
  );
}

//Pantalla principal AGREGAR COMPONENTES NUEVOS ACÁ
function HomeScreen({ navigation }) {
  

  return (
    <ScreenLayout>

    {/*Por el momento todos los elementos van a estar con los estilos aplicados a .container,
     si quiere cambiar los estilos aplique cambios a .container
     */}
     
      <View style={styles.container}>

        <Text style={{ fontSize: 18, color: '#999' }}>Próximamente</Text>

      </View>

    </ScreenLayout>
  );
}

/**
 * MainStack
 * 
 * Este componente agrupa todas las pantallas de flujo de la aplicación (como Login, Registros, Detalles) 
 * dentro de un Stack Navigator. Al ubicar este Stack *dentro* de uno de los Tabs (en lugar de poner 
 * el Tab dentro del Stack), logramos que al navegar hacia 'Login' o 'ClientRegister',
 * la barra de pestañas (Tab Bar) inferior de MainTabs se mantenga visible.
 */

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="HomePrimary">
      <Stack.Screen
        name="HomePrimary"
        component={HomeScreen}
        options={{ headerShown: false }}
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
      <Stack.Screen
        name="VendorDetails"
        component={VendorDetailsScreen}
        options={{ title: 'Detalles del Negocio', headerShown: false }}
      />
    </Stack.Navigator>
  );
}


function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
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
      <Stack.Screen
        name="VendorDetails"
        component={VendorDetailsScreen}
        options={{ title: 'Detalles del Negocio', headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * MainTabs (Barra de Navegación Inferior)
 * 
 * Contiene el enrutador principal en forma de Tabs (pestañas). Se usa como contenedor raíz 
 * en App(). Esta configuración asegura que la barra de botones inferior siempre 
 * dibuje por encima de cualquier pantalla que se enrute en ActionTab o MenuTab.
 */

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ActionTab"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: 'rgb(250, 249, 246)',
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: 'rgb(45, 44, 44)',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 6,
          shadowRadius: 10,
          height: 65,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: 'rgb(232, 17, 35)',
        tabBarInactiveTintColor: 'rgb(181, 181, 181)',
      }}
    >
      <Tab.Screen 
        name="MessagesTab" 
        component={DummyScreen} 
        options={{
          tabBarLabel: 'Messages',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen 
        name="MenuTab" 
        component={DummyScreen} 
        options={{
          tabBarLabel: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid" color={color} size={28} />
          ),
        }}
      />
      
      {/* 
        El ActionTab envuelve todo el MainStack.
        Ese botón central sirve como puerta de entrada a todas las pantallas, 
        pero debido a que está encapsulado, conserva la barra activa.
      */}

      <Tab.Screen 
        name="ActionTab" 
        component={MainStack} 
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="home" color="rgba(255, 255, 255, 1)" size={32} />
          ),
          tabBarButton: (props) => (
            <CustomTabButton {...props} />
          )
        }}
      />
      <Tab.Screen 
        name="SettingsTab" 
        component={DummyScreen} 
        options={{
          tabBarLabel: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen 
        name="LoginTab" 
        component={AuthStack} 
        options={{
          tabBarLabel: 'Login',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Componente principal de la app.
 * A diferencia de antes, ahora usa MainTabs como el contenedor raíz, en lugar de un Stack.
 */
export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
  },
});

import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/LoginScreen';
import ClientRegisterScreen from './src/screens/ClientRegisterScreen';
import VendorRegisterScreen from './src/screens/VendorRegisterScreen';
import VendorDetailsScreen from './src/screens/VendorDetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customTabButton}
    onPress={onPress}
  >
    <View style={styles.customTabButtonInner}>
      {children}
    </View>
  </TouchableOpacity>
);

function MenuScreen() {
  return (
    <View style={styles.dummyContainer}>
      <Text style={styles.dummyText}>Próximamente</Text>
    </View>
  );
}

function LoginStack({ onLoginSuccess }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {() => <LoginScreen onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen 
        name="ClientRegister" 
        component={ClientRegisterScreen}
        options={{ title: 'Registro Cliente' }}
      />
      <Stack.Screen 
        name="VendorRegister" 
        component={VendorRegisterScreen}
        options={{ title: 'Registro Vendedor' }}
      />
      <Stack.Screen 
        name="VendorDetails" 
        component={VendorDetailsScreen}
        options={{ title: 'Detalles del Negocio' }}
      />
    </Stack.Navigator>
  );
}

function MainTabs({ onLogout }) {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
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
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tab.Screen 
        name="MenuTab" 
        component={MenuScreen}
        options={{
          tabBarLabel: 'Menú',
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid" color={color} size={26} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="HomeTab" 
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Ionicons name="home" color="rgba(255, 255, 255, 1)" size={30} />
          ),
          tabBarButton: (props) => (
            <CustomTabButton {...props} />
          ),
        }}
      >
        {() => <HomeScreen />}
      </Tab.Screen>
      
      <Tab.Screen 
        name="ProfileTab" 
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={26} />
          ),
        }}
      >
        {() => <ProfileScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabs onLogout={handleLogout} />
      ) : (
        <LoginStack onLoginSuccess={handleLoginSuccess} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  customTabButton: {
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customTabButtonInner: {
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
  },
  dummyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dummyText: {
    fontSize: 18,
    color: '#9ca3af',
  },
});

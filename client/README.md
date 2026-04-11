# Antojos UPB - Frontend (Cliente)

Esta es la aplicación móvil del proyecto **Antojos UPB**, desarrollada con **React Native** utilizando entorno administrado por **Expo**.

## 📋 Requisitos Previos

1. **Node.js** (versión LTS instalada en el sistema).
2. *(Opcional pero recomendado)* La aplicación **Expo Go** instalada en tu dispositivo móvil iOS o Android.

## ⚙️ Instalación de Dependencias

1. Abre una terminal y dirígete al interior de la carpeta `client`.
2. Instala las librerías y dependencias ejecutando:
   ```bash
   npm install
   ```

## 🔌 Conexión con el Servidor Backend

Antes de ejecutar, recuerda revisar la configuración de red.
Si vas a probar la aplicación **en un dispositivo móvil físico**, debes saber que usar `http://localhost:8080/` para tus llamadas a la API **no funcionará**, ya que el celular buscará un servidor dentro de sí mismo.

**Solución:** Ve a los archivos de configuración o servicios (por ejemplo, `src/services/authService.js`) y cambia `localhost` por la **Dirección IP local** de tu computadora conectada al Wi-Fi (Pista: usa el comando `ipconfig` en Windows).
> Ejemplo: `http://192.168.1.15:8080/api/auth`

## 🚀 Ejecución del Frontend

Para iniciar el bundler de Metro y generar el código QR, ejecuta:
```bash
npx expo start
```

## 📱 Iniciar Visualización
- **Dispositivo físico (Expo Go):** Escanea el código QR desde la App en Android, o con la cámara en iOS.
- **Emulador Android:** Presiona la tecla `a` en la terminal de Expo (requiere Android Studio).
- **Simulador iOS:** Presiona la tecla `i` (requiere macOS y Xcode).
- **Navegador Web:** Presiona la tecla `w` en la terminal de Expo.

  > ***Nota sobre la versión Web:*** Si es tu primera vez ejecutándolo en el navegador, es posible que el proyecto te arroje un aviso solicitando librerías adicionales. De ser así, detén el servidor (`Ctrl + C`) y ejecuta:
  > ```bash
  > npx expo install react-native-web react-dom @expo/metro-runtime
  > ```
  > Luego, vuelve a iniciar con `npx expo start`.

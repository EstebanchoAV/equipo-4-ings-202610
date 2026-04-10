# Antojos UPB - Backend (Servidor)

Este es el backend del proyecto **Antojos UPB**, el cual provee la API RESTful. Está construido con **Spring Boot (Java)** e incluye conectividad hacia una base de datos **Microsoft SQL Server**.

## 📋 Requisitos Previos

1. **Java JDK 17** (o la misma versión superior configurada en el proyecto).
2. **Microsoft SQL Server** instalado y corriendo en tu computadora a través del puerto por defecto (`1433`).

## ⚙️ Configuración de la Base de Datos

El backend, por razones de seguridad y consistencia (`spring.jpa.hibernate.ddl-auto=validate`), **no crea la base de datos ni las tablas automáticamente**. Asume que ya existe el esquema con sus tablas listas.  
1. Abre SQL Server Management Studio - SSMS.

2. Asegúrate de tener un usuario habilitado que permita la autenticacion mediante **Auntenticacion de SQL Server** en SSMS, puedes usar el usuario `sa` que viene por defecto con SQL Server. En caso de no estar habilitado, puedes habilitarlo en SSMS, tutorial en el enlace: https://youtu.be/-GRnoHHnous?si=MyQt8ibfJ0Y3bV5J.

  
3. Asegurate de que SQL Server tenga activado el protocolo TCP/IP para poder permitir la conexion con el backend, tutorial en el enlace: https://youtu.be/6d3d-LzA-V4?si=B4tMzWYsSwFEur5_.

3. **IMPORTANTE:** Dirígete al archivo `databaseSchema.sql` ubicado en la carpeta `src/main/resources/database/` y **ejecuta el script SQL en SSMS para crear la base de datos**. Esto se encargará de crear todas las tablas y relaciones necesarias.

## 🔐 Configuración de Variables de Entorno

Por razones de seguridad, el servidor leerá tus credenciales de base de datos desde variables de entorno en lugar del código fuente. Antes de arrancar el servidor, debes establecer las variables de entorno `DB_USERNAME` y `DB_PASSWORD` y asignarle los valores de usuario y contraseña que estableciste en SQL Server. 

**Debes de ejecutar los siguentes comandos en la terminal de tu sistema operativo:**

- **En Windows:**

   ```powershell
   # 1. Crea las variables de forma permanente (Nivel Usuario)
   [System.Environment]::SetEnvironmentVariable("DB_USERNAME", "tu_usuario_sql", "User")
   [System.Environment]::SetEnvironmentVariable("DB_PASSWORD", "tu_password_sql", "User")

   # 2. Verifica en una NUEVA ventana de PowerShell
   $env:DB_USERNAME
   $env:DB_PASSWORD
   ```
- **En Mac / Linux:**
  ```bash
  # 1. Agrega las variables al archivo de configuración
  echo 'export DB_USERNAME="tu_usuario_sql"' >> ~/.zshrc
  echo 'export DB_PASSWORD="tu_password_sql"' >> ~/.zshrc

  # 2. Aplica los cambios en la sesión actual
  source ~/.zshrc

  # 3. Verifica que se guardaron correctamente
  echo $DB_USERNAME
  echo $DB_PASSWORD
  ```
## 🚀 Ejecución del Servidor

Una vez configuradas las variables en la terminal, colócate en la carpeta `server` y utiliza la herramienta integrada Gradle Wrapper para iniciar la aplicación:

- **En Windows:**
  ```powershell
  .\gradlew.bat bootRun
  ```
- **En Mac / Linux:**
  ```bash
  ./gradlew bootRun
  ```

Si tu base de datos fue creada y las credenciales son correctas, observarás los logs de Spring finalizando con un mensaje similar a:  
✅ *`Started [NombreApp] in [X] seconds` (corriendo por defecto en http://localhost:8080).*

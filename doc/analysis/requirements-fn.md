# Requisitos Funcionales
> Proyecto: **Antojos UPB** – Plataforma digital de ventas de comida en el campus de la Universidad Pontificia Bolivariana.

---

## 🧑‍💼 Req 001 – Dos tipos de registro

📝 **Descripción:** El usuario debe poder crear 2 tipos de cuentas: Vendedor o Comprador.

📌 **Prioridad:** P0

✅ **Criterios de aceptación:**

**Scenario: Selección de tipo de cuenta durante el registro**
```gherkin
Given que el usuario accede al formulario de registro
When selecciona el tipo de cuenta "Vendedor" o "Comprador"
Then el sistema debe almacenar el rol seleccionado en la base de datos
And debe mostrar un mensaje de confirmación de registro exitoso
```

**Scenario: Intento de tener ambos roles con la misma cuenta**
```gherkin
Given que el usuario ya tiene una cuenta registrada con un rol específico
When intenta asignar un segundo rol diferente a la misma cuenta
Then el sistema debe impedir la acción
And debe mostrar un mensaje indicando que una cuenta no puede tener ambos roles
```

---

## 📋 Req 002 – Creación de cuenta con información personal

📝 **Descripción:** Todo usuario debe poder crear una cuenta con su información personal.

📌 **Prioridad:** P0

✅ **Criterios de aceptación:**

**Scenario: Registro exitoso con datos válidos**
```gherkin
Given que el usuario accede al formulario de registro
When ingresa su nombre completo, correo institucional y una contraseña de mínimo 8 caracteres
And el correo no está registrado previamente en el sistema
Then el sistema debe crear la cuenta correctamente
And debe mostrar un mensaje de confirmación de registro exitoso
```

**Scenario: Intento de registro con correo duplicado**
```gherkin
Given que el usuario accede al formulario de registro
When ingresa un correo institucional que ya existe en la base de datos
Then el sistema debe rechazar el registro
And debe mostrar un mensaje indicando que el correo ya está en uso
```

**Scenario: Intento de registro con contraseña inválida**
```gherkin
Given que el usuario accede al formulario de registro
When ingresa una contraseña con menos de 8 caracteres
Then el sistema debe impedir el registro
And debe mostrar un mensaje indicando el requisito mínimo de la contraseña
```

---

## ➕ Req 003 – Botón para agregar nuevos vendedores

📝 **Descripción:** Debe poderse agregar desde un botón la información de un vendedor nuevo y así actualizar la lista de vendedores.

📌 **Prioridad:** P2

✅ **Criterios de aceptación:**

**Scenario: Agregar un nuevo vendedor desde el botón**
```gherkin
Given que el usuario administrador está en la vista de lista de vendedores
And existe un botón visible "Agregar vendedor"
When hace clic en el botón
Then el sistema debe abrir un formulario para ingresar la información del nuevo vendedor
```

**Scenario: Guardado exitoso del nuevo vendedor**
```gherkin
Given que el administrador ha completado el formulario de nuevo vendedor
When guarda la información
Then el vendedor debe aparecer automáticamente en la lista de vendedores
And no debe ser necesario recargar la página
```

---

## ✏️ Req 004 – Edición de perfil

📝 **Descripción:** Cada usuario debe poder editar su información de contacto (teléfono, WhatsApp, redes sociales).

📌 **Prioridad:** P1

✅ **Criterios de aceptación:**

**Scenario: Edición exitosa de información de contacto**
```gherkin
Given que el usuario ha iniciado sesión
And está en la vista de su perfil
When modifica su teléfono, WhatsApp o redes sociales
And guarda los cambios
Then el sistema debe actualizar la información en la base de datos
And debe mostrar un mensaje de confirmación de actualización exitosa
```

---

## 🕐 Req 005 – Establecer horario de disponibilidad

📝 **Descripción:** Los vendedores deben poder establecer su horario de disponibilidad por días de la semana.

📌 **Prioridad:** P0

✅ **Criterios de aceptación:**

**Scenario: Configuración exitosa de horario semanal**
```gherkin
Given que el vendedor ha iniciado sesión
And está en la vista de configuración de horario
When selecciona los días de la semana en que estará disponible
And define la hora de inicio y hora de fin para cada día
Then el sistema debe almacenar el horario correctamente en la base de datos
```

**Scenario: Intento de guardar un horario inválido**
```gherkin
Given que el vendedor está configurando su horario
When ingresa una hora de fin anterior a la hora de inicio
Then el sistema debe rechazar el horario
And debe mostrar un mensaje de error indicando que el horario es inválido
```

---

## 🗂️ Req 006 – Visualización en cuadrículas por vendedor

📝 **Descripción:** La información de cada vendedor debe mostrarse en tarjetas que indiquen su disponibilidad y productos.

📌 **Prioridad:** P4

✅ **Criterios de aceptación:**

**Scenario: Visualización correcta de las tarjetas de vendedores**
```gherkin
Given que el usuario accede a la vista principal de vendedores
Then el sistema debe mostrar los vendedores en formato de tarjetas (grid)
And cada tarjeta debe mostrar el nombre, los productos y el estado de disponibilidad del vendedor
And la vista debe adaptarse correctamente a dispositivos móviles
```

---

## 🔄 Req 007 – Estado de disponibilidad automático

📝 **Descripción:** El estado del vendedor debe actualizarse automáticamente según su horario registrado.

📌 **Prioridad:** P3

✅ **Criterios de aceptación:**

**Scenario: Actualización automática del estado del vendedor**
```gherkin
Given que el vendedor tiene un horario de disponibilidad registrado
When el sistema verifica la hora actual
Then el estado del vendedor debe cambiar automáticamente a "Disponible" o "Cerrado" según corresponda
And la actualización debe ocurrir como máximo cada 30 segundos
And no debe requerir intervención manual del vendedor
```

---

## 🟡 Req 008 – Indicador visual "En campus"

📝 **Descripción:** La tarjeta del vendedor debe mostrarse en blanco hueso cuando el vendedor está en la UPB.

📌 **Prioridad:** P4

✅ **Criterios de aceptación:**

**Scenario: Visualización de vendedor activo en campus**
```gherkin
Given que el vendedor ha indicado que se encuentra en el campus de la UPB
When el usuario consulta la lista de vendedores
Then la tarjeta del vendedor debe mostrarse en color blanco hueso
And debe mostrar el indicador visual "En campus"
```

---

## ⬜ Req 009 – Estado cerrado en gris

📝 **Descripción:** Si el vendedor no está en la UPB, su tarjeta debe verse en gris con la leyenda "Cerrado".

📌 **Prioridad:** P4

✅ **Criterios de aceptación:**

**Scenario: Visualización de vendedor cerrado o fuera del campus**
```gherkin
Given que el vendedor no está disponible o no se encuentra en el campus
When el usuario consulta la lista de vendedores
Then la tarjeta del vendedor debe mostrarse en color gris
And debe mostrar la etiqueta "Cerrado"
```

---

## 📷 Req 010 – Foto de perfil del vendedor

📝 **Descripción:** El sistema debe permitir subir una foto de perfil para cada vendedor.

📌 **Prioridad:** P1

✅ **Criterios de aceptación:**

**Scenario: Carga exitosa de foto de perfil**
```gherkin
Given que el vendedor está en la vista de configuración de su perfil
When sube una imagen en formato JPG o PNG con un tamaño máximo de 5MB
Then el sistema debe guardar la imagen correctamente
And debe mostrarse en la tarjeta del vendedor dentro de la plataforma
```

**Scenario: Intento de subir un archivo inválido**
```gherkin
Given que el vendedor intenta subir una foto de perfil
When el archivo supera los 5MB o no es formato JPG o PNG
Then el sistema debe rechazar el archivo
And debe mostrar un mensaje indicando los formatos y tamaño permitidos
```

---

## 📝 Req 011 – Descripción de productos

📝 **Descripción:** Los vendedores deben poder agregar una descripción breve de los productos o servicios que ofrecen.

📌 **Prioridad:** P0

✅ **Criterios de aceptación:**

**Scenario: Agregar descripción de productos**
```gherkin
Given que el vendedor está en la vista de configuración de su perfil
When ingresa una descripción de sus productos de máximo 200 caracteres
And guarda los cambios
Then la descripción debe almacenarse correctamente
And debe mostrarse en la vista pública del vendedor
```

**Scenario: Intento de ingresar descripción que supera el límite**
```gherkin
Given que el vendedor está redactando la descripción de sus productos
When el texto supera los 200 caracteres
Then el sistema debe impedir seguir escribiendo o mostrar una advertencia
And no debe permitir guardar una descripción que exceda el límite
```

---

## 🔍 Req 012 – Filtrar vendedores por tipo de producto

📝 **Descripción:** Los usuarios deben poder filtrar vendedores por tipo de producto o servicio.

📌 **Prioridad:** P0

✅ **Criterios de aceptación:**

**Scenario: Filtrado exitoso por categoría**
```gherkin
Given que el usuario está en la vista principal de vendedores
And existen vendedores con diferentes categorías de productos
When selecciona una categoría desde el filtro disponible
Then el sistema debe actualizar dinámicamente la lista
And debe mostrar únicamente los vendedores que pertenecen a la categoría seleccionada
```

---

## 🔎 Req 013 – Buscar vendedores por nombre

📝 **Descripción:** Los usuarios deben poder buscar vendedores por nombre.

📌 **Prioridad:** P0

✅ **Criterios de aceptación:**

**Scenario: Búsqueda exitosa por nombre**
```gherkin
Given que el usuario está en la vista principal de vendedores
And existe una barra de búsqueda visible
When escribe el nombre o parte del nombre de un vendedor
Then el sistema debe actualizar los resultados en tiempo real
And debe mostrar todos los vendedores cuyo nombre coincida parcial o totalmente con el texto ingresado
```

**Scenario: Búsqueda sin resultados**
```gherkin
Given que el usuario escribe un nombre en la barra de búsqueda
When el sistema no encuentra ningún vendedor con ese nombre
Then debe mostrar un mensaje indicando que no se encontraron resultados
```

---

## 📅 Req 014 – Ver horario semanal del vendedor

📝 **Descripción:** Los usuarios deben poder ver el horario completo semanal de cada vendedor.

📌 **Prioridad:** P0

✅ **Criterios de aceptación:**

**Scenario: Visualización del horario semanal**
```gherkin
Given que el usuario consulta el perfil de un vendedor
When accede a la sección de horario
Then el sistema debe mostrar una tabla o lista organizada por días de la semana
And debe indicar claramente la hora de inicio y la hora de fin de atención para cada día disponible
```

---

## 🟢 Req 015 – Filtrar vendedores por disponibilidad

📝 **Descripción:** Debe poder filtrarse la lista de vendedores por estado: disponible o no disponible.

📌 **Prioridad:** P1

✅ **Criterios de aceptación:**

**Scenario: Filtrado por estado de disponibilidad**
```gherkin
Given que el usuario está en la vista principal de vendedores
When selecciona el filtro "Disponible" o "No disponible"
Then el sistema debe actualizar la lista mostrando únicamente los vendedores que correspondan al estado seleccionado
And no debe requerir recargar la página manualmente
```

---

## 🚩 Req 016 – Reportar vendedores

📝 **Descripción:** Debe permitirse reportar vendedores inactivos o con información incorrecta.

📌 **Prioridad:** P3

✅ **Criterios de aceptación:**

**Scenario: Reporte exitoso de un vendedor**
```gherkin
Given que el usuario está en la tarjeta o perfil de un vendedor
And existe un botón "Reportar" visible
When hace clic en el botón
And selecciona o ingresa el motivo del reporte
And confirma el envío
Then el sistema debe almacenar el reporte en la base de datos
And debe mostrar un mensaje de confirmación indicando que el reporte fue enviado
```

---

## ⏰ Req 017 – Ventana emergente para extender horario

📝 **Descripción:** El sistema debe mostrar una ventana emergente para que el vendedor pueda extender su horario antes de que cierre.

📌 **Prioridad:** P4

✅ **Criterios de aceptación:**

**Scenario: Notificación de cierre próximo**
```gherkin
Given que el vendedor tiene una sesión activa
And faltan 15 minutos para que su horario de atención finalice
When el sistema detecta ese umbral de tiempo
Then debe mostrarse una notificación o ventana emergente informando que el horario está por cerrar
And debe ofrecer al vendedor la opción de extender su horario manualmente
```

**Scenario: Extensión de horario exitosa**
```gherkin
Given que el vendedor recibió la notificación de cierre próximo
When selecciona la opción de extender su horario
Then el sistema debe actualizar la hora de cierre
And el estado del vendedor debe permanecer como "Disponible" durante el tiempo extendido
```

---

## 🗺️ Req 018 – Mapa estático de ubicación

📝 **Descripción:** El sistema debe mostrar un mapa no interactivo con la ubicación de los vendedores con local fijo en el campus.

📌 **Prioridad:** P4

✅ **Criterios de aceptación:**

**Scenario: Visualización del mapa estático**
```gherkin
Given que el usuario consulta el perfil de un vendedor con local fijo en el campus
When accede a la sección de ubicación
Then el sistema debe mostrar una imagen estática con la ubicación del vendedor
And el mapa no debe permitir zoom ni desplazamiento
```

---

## 💬 Req 019 – Implementación de chat en tiempo real

📝 **Descripción:** El sistema debe implementar un canal de comunicación mediante chat en tiempo real entre el comprador y el vendedor.

📌 **Prioridad:** P0

✅ **Criterios de aceptación:**

**Scenario: Apertura de chat con un vendedor**
```gherkin
Given que el usuario está en la vista de un vendedor específico
When selecciona la opción de iniciar un chat
Then el sistema debe abrir el canal de mensajería con ese vendedor
And los mensajes deben enviarse y recibirse en tiempo real
And cada mensaje debe mostrar la hora de envío
```

**Scenario: Notificación de mensaje nuevo**
```gherkin
Given que el usuario o vendedor tiene el chat activo o en segundo plano
When recibe un nuevo mensaje
Then el sistema debe notificar la llegada del mensaje
```

---

## ⭐ Req 020 – Sistema de calificación de vendedores

📝 **Descripción:** Los usuarios deben poder calificar y dejar una reseña a un vendedor después de haber interactuado con él.

📌 **Prioridad:** P2

✅ **Criterios de aceptación:**

**Scenario: Calificación exitosa de un vendedor**
```gherkin
Given que el usuario ha tenido una interacción con un vendedor
And aún no ha calificado dicha interacción
When selecciona entre 1 y 5 estrellas para calificar al vendedor
And opcionalmente escribe una reseña de máximo 250 caracteres
And envía la calificación
Then el sistema debe almacenar la calificación y reseña en la base de datos
And la calificación promedio del vendedor debe actualizarse y mostrarse en su tarjeta
```

**Scenario: Intento de calificar más de una vez la misma interacción**
```gherkin
Given que el usuario ya calificó una interacción específica con un vendedor
When intenta enviar una nueva calificación para esa misma interacción
Then el sistema debe impedir la acción
And debe mostrar un mensaje indicando que ya realizó una calificación para esa interacción
```

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
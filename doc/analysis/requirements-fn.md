## Ejemplo del profesor

### 1. Registro de Pedidos
Como empleado de Café Andino
Quiero registrar nuevos pedidos de clientes
Para asegurar que las órdenes se procesen de manera eficiente

Escenario: Registrar un nuevo pedido de un cliente

Dado que estoy en la página de inicio de sesión del sistema de gestión de pedidos
Y he iniciado sesión correctamente como empleado
Y estoy en la página de "Nuevo Pedido"

Cuando introduzco la información del cliente "Carlos García"
Y selecciono los productos "Café Orgánico Premium, Bolsa de 500g"
Y especifico la cantidad "3"
Y elijo la opción de envío "Envío estándar"
Y hago clic en "Registrar Pedido"

Entonces debería ver un mensaje de confirmación "El pedido ha sido registrado exitosamente"
Y el nuevo pedido debería aparecer en la lista de pedidos pendientes de procesamiento
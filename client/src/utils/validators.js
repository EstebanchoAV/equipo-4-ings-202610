/**
 * Expresiones regulares centrales utilizadas en los formularios.
 */
const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,70}$/;
const regexEmail = /^[A-Za-z0-9\.-_]+@[\w\d]+\.\w+$/;
const regexPhone = /^[3]{1}[0-5]{1}[0-9]{8}$/;
const regexText = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s]+$/;

/**
 * Valida los datos introducidos en el registro de Clientes.
 * Chequea campos vacíos y aplica expresiones regulares.
 * 
 * @param {string} name - Nombre completo del cliente.
 * @param {string} email - Correo del cliente.
 * @param {string} phone - Teléfono del cliente.
 * @param {string} password - Contraseña, mínimo 8 caracteres.
 * @returns {string[]} Arreglo con los errores encontrados. Estará vacío si todo es válido.
 */
export const validateClientForm = (name, email, phone, password) => {
    let errors = [];
    if (!name || !email || !phone || !password) {
        errors.push("• Todos los campos son obligatorios.");
    }
    if (name && !regexName.test(name)) {
        errors.push("• El nombre no es valido o es demasiado corto");
    }
    if (email && !regexEmail.test(email)) {
        errors.push("• El correo electrónico no es válido.");
    }
    if (phone && !regexPhone.test(phone)) {
        errors.push("• El teléfono debe empezar con 3 y tener 10 dígitos.");
    }
    if (password && password.length < 8) {
        errors.push("• La contraseña debe tener al menos 8 caracteres.");
    }
    return errors;
};

/**
 * Valida la primera fase del formulario de registro de Vendedores (Información básica).
 * 
 * @param {string} businessName - Nombre del local o negocio.
 * @param {string} ownerName - Nombre completo del propietario.
 * @param {string} email - Correo corporativo o del dueño.
 * @param {string} phone - Teléfono principal del local.
 * @param {string} password - Contraseña para la cuenta, mínimo 8 caracteres.
 * @returns {string[]} Arreglo con los errores encontrados. Estará vacío si todo es válido.
 */
export const validateVendorBasicForm = (businessName, ownerName, email, phone, password) => {
    let errors = [];
    if (!businessName || !ownerName || !email || !phone || !password) {
        errors.push("Todos los campos son obligatorios.");
    }
    if (businessName && !regexName.test(businessName)) {
        errors.push("Error", "El nombre del negocio no es válido o es demasiado corto");
    }
    if (ownerName && !regexName.test(ownerName)) {
        errors.push("Error", "El nombre del propietario no es válido o es demasiado corto");
    }
    if (email && !regexEmail.test(email)) {
        errors.push("Error", "El correo electrónico no es válido");
    }
    if (phone && !regexPhone.test(phone)) {
        errors.push("Error", "El número de teléfono debe ser válido y comenzar con 3");
    }
    if (password && password.length < 8) {
        errors.push("Error", "La contraseña debe tener al menos 8 caracteres.");
    }
    return errors;
};

/**
 * Valida la segunda fase del formulario de registro de Vendedores (Detalles específicos).
 * 
 * @param {string} description - Texto libre con la descripción del negocio.
 * @param {number|string} categoryId - ID que hace referencia a la categoría seleccionada en el Picker.
 * @param {string} whatsappLink - Enlace de WhatsApp generado ("https://wa.me/...").
 * @returns {string[]} Arreglo con los errores encontrados. Estará vacío si todo es válido.
 */
export const validateVendorDetailsForm = (description, categoryId, whatsappLink) => {
    let errors = [];
    if (!description || !whatsappLink || !categoryId) {
        errors.push("• Todos los campos son obligatorios.");
    }
    if (description && !regexText.test(description)) {
        errors.push("• La descripción no es válida.");
    }
    return errors;
};

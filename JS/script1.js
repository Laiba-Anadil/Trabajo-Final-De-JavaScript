const formInput = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellidos');
const telefonoInput = document.getElementById('telefono');
const emailInput = document.getElementById('email');
const productoInput = document.getElementById('producto');
const plazoInput = document.getElementById('plazo');
const finalInput = document.getElementById('presupuestoFinal');
const aceptoInput = document.getElementById('acepto');

// Errores
const errorNombre = document.getElementById('errorNombre');
const errorApellidos = document.getElementById('errorApellidos');
const errorTelefono = document.getElementById('errorTelefono');
const errorEmail = document.getElementById('errorEmail');
const errorProducto = document.getElementById('errorProducto');
const errorPlazo = document.getElementById('errorPlazo');
const errorAcepto = document.getElementById('errorAcepto');

// Validaciones
function validarNombre() {
    const nombre = nombreInput.value;
    const nombrePattern = /^[a-zA-Z\s]{1,15}$/;
    if (!isNaN(nombre) || !nombrePattern.test(nombre)) {
        nombreInput.classList.add('invalido');
        nombreInput.classList.remove('valido');
        errorNombre.textContent = 'Sólo podrá contener letras y tendrá una longitud máxima de 15 caracteres.';
    } else {
        nombreInput.classList.add('valido');
        nombreInput.classList.remove('invalido');
        errorNombre.textContent = '';
    }
}

function validarApellidos() {
    const apellido = apellidoInput.value;
    const apellidosPattern = /^[a-zA-Z\s]{1,40}$/;
    if (!isNaN(apellido) || !apellidosPattern.test(apellido)) {
        apellidoInput.classList.add('invalido');
        apellidoInput.classList.remove('valido');
        errorApellidos.textContent = 'Sólo podrá contener letras y tendrá una longitud máxima de 40 caracteres.';
    } else {
        apellidoInput.classList.add('valido');
        apellidoInput.classList.remove('invalido');
        errorApellidos.textContent = '';
    }
}

function validarTelefono() {
    const telefono = telefonoInput.value;
    const telefonoPattern = /^(6|7|8|9)[0-9]{8}$/;
    if (!telefonoPattern.test(telefono)) {
        telefonoInput.classList.add('invalido');
        telefonoInput.classList.remove('valido');
        errorTelefono.textContent = 'Sólo podrá contener números y tendrá una longitud máxima de 9 dígitos.';
    } else {
        telefonoInput.classList.add('valido');
        telefonoInput.classList.remove('invalido');
        errorTelefono.textContent = '';
    }
}

function validarEmail() {
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailInput.classList.add('invalido');
        emailInput.classList.remove('valido');
        errorEmail.textContent = 'Debe ser un correo electrónico válido (ej: usuario@dominio.com).';
    } else {
        emailInput.classList.add('valido');
        emailInput.classList.remove('invalido');
        errorEmail.textContent = '';
    }
}

// Presupuesto
function calcularPresupuesto() {
    const producto = productoInput.options[productoInput.selectedIndex];
    const precioProducto = parseFloat(producto.dataset.precio) || 0;
    const plazo = parseInt(plazoInput.value) || 1;

    // Descuento por plazo
    const descuento = precioProducto * 0.02 * plazo;

    // Extras seleccionados
    let totalExtras = 0;
    const extrasSeleccionados = document.querySelectorAll('input[name="extras"]:checked');
    extrasSeleccionados.forEach(extra => {
        totalExtras += parseFloat(extra.dataset.precio);
    });

    const total = precioProducto - descuento + totalExtras;
    finalInput.textContent = `Presupuesto final: ${total.toFixed(2)} €`;
}

// Eventos
nombreInput.addEventListener('input', validarNombre);
apellidoInput.addEventListener('input', validarApellidos);
telefonoInput.addEventListener('input', validarTelefono);
emailInput.addEventListener('input', validarEmail);
productoInput.addEventListener('change', calcularPresupuesto);
plazoInput.addEventListener('input', calcularPresupuesto);
document.querySelectorAll('input[name="extras"]').forEach(checkbox => {
    checkbox.addEventListener('change', calcularPresupuesto);
});

formInput.addEventListener('submit', function validarFormulario(event) {
    event.preventDefault();

    validarNombre();
    validarApellidos();
    validarTelefono();
    validarEmail();

    if (
        nombreInput.classList.contains('valido') &&
        apellidoInput.classList.contains('valido') &&
        telefonoInput.classList.contains('valido') &&
        emailInput.classList.contains('valido') &&
        aceptoInput.checked
    ) {
        alert('Formulario enviado correctamente.');
        formInput.submit();
    } else {
        alert('Por favor, corrija los errores en el formulario.');
    }
});

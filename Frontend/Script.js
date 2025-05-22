/* Inicio Parte Login */
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('LoginForm');
    const errorMessage = document.getElementById('ErrorMessage');
    const togglePassword = document.getElementById('TogglePassword');
    const passwordInput = document.getElementById('Password');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const documentType = document.getElementById('DocumentType').value;
        const documentNumber = document.getElementById('DocumentNumber').value;
        const password = passwordInput.value;

        if (!documentType || !documentNumber || !password) {
            showError('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await simulateApiCall(documentType, documentNumber, password);
            
            if (response.success) {
                hideError(); // Borra el mensaje si es necesario
                window.location.href = '/Frontend/NavInicio.html'; // Redirige a la página de inicio
            } else {
                showError(response.message);
            }
        } catch (error) {
            showError('Error en el servidor. Por favor, intente más tarde.');
        }
    });

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'Password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('show');
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block'; // Asegúrate de mostrar el mensaje
    }

    function hideError() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none'; // Opcional: para ocultar el mensaje si es necesario
    }

    async function simulateApiCall(documentType, documentNumber, password) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const validCredentials = {
            cc: { number: '12345678', password: 'iglesia2024' },
            ce: { number: '87654321', password: 'extranjero2024' },
            pa: { number: 'AB123456', password: 'pasaporte2024' },
            pep: { number: 'PEP78901', password: 'permiso2024' }
        };

        const userCredentials = validCredentials[documentType];

        if (userCredentials && 
            userCredentials.number === documentNumber && 
            userCredentials.password === password) {
            return { success: true };
        } else {
            return { 
                success: false, 
                message: 'Tipo de documento, número de documento o contraseña incorrectos' 
            };
        }
    }
});
/*Fin Parte Login */
/*Botón Volver*/
document.addEventListener("DOMContentLoaded", function() {
    const botonVolver = document.getElementById("btnVolver");

    if (botonVolver) {
        botonVolver.addEventListener("click", function() {
            history.back(); // Volver a la página anterior
        });
    }
});
/*Fin Botón Volver*/
/*Funciones ayuda y logout */
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDateElement = document.getElementById('CurrentDate');
    const currentDate = new Date();
    const options = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric'
    };
    currentDateElement.textContent = currentDate.toLocaleDateString('es-ES', options);

    // Add click event for logout button
    const logoutButton = document.querySelector('.BtnLogout');
    logoutButton.addEventListener('click', function() {
        // Add logout logic here
        window.location.href = '/Frontend/index.html'; // Redirect to login page
    });

    // Add click event for help button
    const helpButton = document.querySelector('.BtnHelp');
    helpButton.addEventListener('click', function() {
        alert('Sistema de Ayuda\n\nPara más información, contacte al administrador.');
    })
});

/*Inicio Clicks Sobre Tarjetas*/
document.addEventListener("DOMContentLoaded", function () {
    const tarjetas = document.querySelectorAll(".DashboardCard");

    tarjetas.forEach(card => {
        // Evita que las tarjetas deshabilitadas se comporten como enlaces
        if (!card.classList.contains("Disabled")) {
            card.style.cursor = "pointer"; // Opcional: estilo visual

            card.addEventListener("click", function () {
                const url = card.getAttribute("data-url");
                if (url) {
                    window.location.href = url;
                }
            });
        }
    });
});
/*Fin Clicks Sobre Tarjetas*/

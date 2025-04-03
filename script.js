document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const emailsList = [];

    form.addEventListener('submit', (e) => {
        // Prevenir el envío normal del formulario
        e.preventDefault();
        
        // Obtener el valor del email
        const email = document.getElementById('email').value;
        const consent = document.getElementById('consent').checked;
        
        // Validar que el email no esté vacío y que haya aceptado el consentimiento
        if (!email || !consent) return;
        
        // Guardar el email localmente
        emailsList.push(email);
        localStorage.setItem('registeredEmails', JSON.stringify(emailsList));
        console.log('Email registrado localmente:', email);
        
        // Almacenar para futura recuperación
        storeEmailLocally(email);
        
        // Enviar datos a FormSubmit
        enviarAFormSubmit(email);
        
        // Limpiar el formulario
        form.reset();
        
        // Mostrar mensaje de confirmación
        form.style.display = 'none';
        confirmationMessage.style.display = 'block';
    });

    // Función para enviar los datos a FormSubmit sin redirección
    function enviarAFormSubmit(email) {
        // Crear un formulario temporal para enviar los datos
        const formData = new FormData();
        formData.append('email', email);
        formData.append('consent', 'accepted');
        formData.append('_captcha', 'false');
        
        // Enviar los datos a FormSubmit usando fetch
        fetch('https://formsubmit.co/vibegenerationai@gmail.com', {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Importante para evitar errores CORS
        })
        .then(response => {
            console.log('Datos enviados a vibegenerationai@gmail.com');
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
    }

    // Función para almacenar el email localmente
    function storeEmailLocally(email) {
        const currentDate = new Date().toISOString();
        const entry = { email, date: currentDate };
        
        let storedData = JSON.parse(localStorage.getItem('emailsToSend')) || [];
        storedData.push(entry);
        localStorage.setItem('emailsToSend', JSON.stringify(storedData));
        
        console.log(`Email guardado: ${email}`);
    }

    // Recuperar emails almacenados anteriormente
    try {
        const storedEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];
        emailsList.push(...storedEmails);
    } catch (error) {
        console.error('Error al recuperar emails:', error);
    }

    // Exportar emails para su posterior procesamiento
    window.exportEmails = () => {
        return emailsList;
    };
}); 
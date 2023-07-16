document.addEventListener("DOMContentLoaded", function() {
  const registerLink = document.getElementById("register-link");
  const loginLink = document.getElementById("login-link");
  const forgotPasswordLink = document.getElementById("forgot-password-link");
  const registerSection = document.getElementById("register");
  const loginSection = document.getElementById("login");
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  // Obtener los datos de usuarios registrados del almacenamiento local del navegador
  const usuarios_registrados = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];

  registerLink.addEventListener("click", function(event) {
    event.preventDefault();
    loginSection.classList.add("slide-out");
    setTimeout(function() {
      loginSection.style.display = "none";
      registerSection.style.display = "block";
      registerSection.classList.add("slide-in");
      loginSection.classList.remove("slide-out");
    }, 300);
  });

  loginLink.addEventListener("click", function(event) {
    event.preventDefault();
    registerSection.classList.add("slide-out");
    setTimeout(function() {
      registerSection.style.display = "none";
      loginSection.style.display = "block";
      loginSection.classList.add("slide-in");
      registerSection.classList.remove("slide-out");
    }, 300);
  });

  registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullnameInput = document.getElementById("fullname").value;
    const emailInput = document.getElementById("emailRegister").value;
    const usernameInput = document.getElementById("usernameRegister").value;
    const passwordInput = document.getElementById("passwordRegister").value;

    // Verificar la contraseña
    if (!validatePassword(passwordInput)) {
      // Mostrar una alerta de error con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error de registro',
        text: 'La contraseña debe tener al menos 6 caracteres y contener al menos 1 letra mayúscula.'
      });
      return;
    }

    // Verificar si el nombre de usuario ya está en uso
    const nombreEnUso = usuarios_registrados.find((user) => user.username === usernameInput);

    if (nombreEnUso) {
      // El nombre de usuario está en uso, mostrar alerta con opciones alternativas
      Swal.fire({
        icon: 'info',
        title: 'Nombre de usuario en uso',
        text: `El nombre "${usernameInput}" ya está en uso. Intenta con una de estas opciones: ${generateUsernameOptions(usernameInput)}`
      });
      return;
    }

    // Agregar el nuevo usuario registrado al array de usuarios_registrados
    usuarios_registrados.push({ fullname: fullnameInput, email: emailInput, username: usernameInput, password: passwordInput });

    // Guardar los datos actualizados en el almacenamiento local del navegador
    localStorage.setItem('usuarios_registrados', JSON.stringify(usuarios_registrados));

    // Mostrar la alerta de registro exitoso con SweetAlert2
    Swal.fire({
      icon: 'success',
      title: '¡Registrado con éxito!',
      text: 'Por favor, inicia sesión.'
    }).then((result) => {
      // Redirigir al usuario al formulario de inicio de sesión después de cerrar la alerta
      if (result.isConfirmed) {
        loginLink.click(); // Simular un clic en el enlace de inicio de sesión
      }
    });
  });

  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;

    // Aquí debes realizar la verificación de las credenciales ingresadas

    // Verificar las credenciales ingresadas
    const usuarioEncontrado = usuarios_registrados.find(
      (user) => user.email === emailInput && user.password === passwordInput
    );

    if (usuarioEncontrado) {
      // Las credenciales son válidas, redirigir al usuario a la página "pagina.html"
      window.location.href = "inicio.html";
    } else {
      // Las credenciales son inválidas, mostrar una alerta de error personalizada con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Correo electrónico o contraseña incorrectos. Por favor, verifica tus datos.'
      });
    }
  });

  // Función para validar la contraseña
  function validatePassword(password) {
    // La contraseña debe tener al menos 6 caracteres y contener al menos 1 letra mayúscula
    const regex = /^(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  }

  // Función para generar opciones de nombre de usuario alternativas
  function generateUsernameOptions(username) {
    const options = [];
    const maxLength = 10; // Máxima longitud del nombre de usuario alternativo

    // Generar opciones alternativas agregando dígitos al final del nombre de usuario
    for (let i = 1; i <= 3; i++) {
      const option = `${username}${i}`;
      options.push(option);

      // Verificar si la opción generada excede la longitud máxima
      if (option.length > maxLength) {
        break;
      }
    }

    return options.join(', '); // Devolver opciones separadas por coma
  }

  // Función para manejar el evento de "Olvidé mi contraseña"
  forgotPasswordLink.addEventListener("click", function(event) {
    event.preventDefault();

    // Mostrar la alerta de construcción con SweetAlert2
    Swal.fire({
      icon: 'info',
      title: 'Funcionalidad en construcción',
      text: 'Funcionalidad de recuperación de contraseña en construcción.'
    });
  });
});
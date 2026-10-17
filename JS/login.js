const formulario = document.getElementById("login-form")
const mensaje = document.getElementById("mensaje-login")

// Funcion que convierte la constraseñna escrita en un Hash SHA-256 seguro
async function encriptarClave(texto) {
    const enconder = new TextEncoder()
    const data = enconder.encode(texto)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
}

async function iniciarSesion(evento) {
    evento.preventDefault()

    const usuarioInput = document.getElementById("username").value.trim().toLocaleLowerCase()
    const claveInput = document.getElementById("password").value

    try {
        // 1. Cargamos el archivo JSON externo
        const respuesta = await fetch("DATA/usuarios.json")
        const usuarios = await respuesta.json() // Convierte el texto JSON en un objeto JS

        const datosUsuario = usuarios[usuarioInput]
        const claveEncriptada = await encriptarClave(claveInput)

        // 2. Verificamos si el usuario existe y si su hash coincide
        if (datosUsuario != undefined && datosUsuario.claveHash === claveEncriptada) {
            // Creamos un objeto de sesión (NUNCA guardamos la contraseña aquí)
            const sesionActiva = {
            username: usuarioInput,
            nombre: datosUsuario.nombre,
            rol: datosUsuario.rol,
            horaIngreso: new Date().toLocaleDateString()
            }

            // Convertimos el objeto a texto JSON con stringly y lo guardamos
            sessionStorage.setItem("sesionUsuario", JSON.stringify(sesionActiva))

            window.location.href = "principal.html"
        } else {
            mensaje.textContent = "Nombre de usuario o contraseña incorrectos."
        }
    } catch (error) {
        console.error("Error al leer el archivo JSON:", error)
        mensaje.textContent = "Error al conectar con la base de datos JSON (Usa Live Server o GitHub Pages)"
    }
}

formulario.addEventListener("submit", iniciarSesion)
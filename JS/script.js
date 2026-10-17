const btn = document.getElementById("btn-saludo")
const mensaje = document.getElementById("mensaje")
const btnLoginNav = document.getElementById("btn-login")

// 1. Leer si ya hay saludos guardados en localStorage
let saludo = JSON.parse(localStorage.getItem("contadorSaludos")) || 0

if (saludo > 0) {
    mensaje.textContent = `Gracias por saludar, llevas ${saludo} saludo(s).`
}

function saludar() {
    saludo++
    // Guardamos el número en formato JSON
    localStorage.setItem("contadorSaludos", JSON.stringify(saludo))
    mensaje.textContent = `Gracias por saludar, llevas ${saludo} saludo(s).`
}

btn.addEventListener("click", saludar)

// 2. Si el usuario ya tiene sesion activa, cambiar el boton "Iniciar Sesión" por "Ir a mi Panel"
const sesionGuardada = sessionStorage.getItem("sesionUsuario")
if (sesionGuardada) {
    const datos = JSON.parse(sesionGuardada)
    btnLoginNav.textContent = `Panel de ${datos.nombre}`
    btnLoginNav.href = "principal.html"
}
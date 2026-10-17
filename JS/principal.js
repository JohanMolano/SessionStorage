const saludo = document.getElementById("saludo")
const infoRol = document.getElementById("info-rol")
const btnSalir = document.getElementById("btn-salir")
const formNotas = document.getElementById("form-notas")
const inputNota = document.getElementById("nueva-nota")
const listaNostas = document.getElementById("lista-notas")

// 1. Recuperamos el texto JSON de la sesión
const sesionJSON = sessionStorage.getItem("sesionUsuario")

// PROTECCIÓN DE RUTA: Si no hay sesión iniciada, lo devolvemos al login inmediatamente
if (!sesionJSON) {
    window.location.href = "login.html"
} else {
    // 2. Convertimos el texto JSON de vuelta a un objeto de JavaScript con JSON.parse()
    const datosUsuario = JSON.parse(sesionJSON)

    saludo.textContent = `¡Bienvenido, ${datosUsuario.nombre}`
    infoRol.textContent = `Rol asignado: ${datosUsuario.rol} | Ingreso a las: ${datosUsuario.horaIngreso}`

    // 3. Cargar y mostrar notas personalizadas de este usuario en formato JSON
    const claveStorageNostas = `notas_${datosUsuario.username}`

    function mostrarNotas() {
        // Leemos el JSON de localStorage (si no hay nada, usamos un array vacio [])
        const notasGuardadas = JSON.parse(localStorage.getItem(claveStorageNostas)) || []
        // Limpiamos la lista visual antes de volver a dibujarla
        listaNostas.innerHTML = ""
        
        notasGuardadas.forEach(nota => {
            const li = document.createElement("li")
            li.textContent = nota;
            listaNostas.appendChild(li)
        })
    }
    formNotas.addEventListener("submit", (e) => {
        e.preventDefault()
        const notasGuardadas = JSON.parse(localStorage.getItem(claveStorageNostas)) || []

        // Agregamos la nueva nota a la lista
        notasGuardadas.push(inputNota.value)

        // Guardamos la lista actualizada conviertiendola a texto JSON
        localStorage.setItem(claveStorageNostas, JSON.stringify(notasGuardadas))

        inputNota.value = ""
        mostrarNotas()
    })
    mostrarNotas()
}

// 4. Función para Cerrar Sesión
btnSalir.addEventListener("click", () => {
    sessionStorage.removeItem("sesionUsuario")
    window.location.href = "login.html"
})
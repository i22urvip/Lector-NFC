// Lista de excusas típicas
const excusas = [
    "En mi máquina funciona perfectamente.",
    "Eso no es un bug, es una característica no documentada.",
    "No he tocado ese código en semanas.",
    "Debe ser un problema de caché del navegador.",
    "Lo compilaré de nuevo a ver si se arregla solo.",
    "Es culpa del usuario, lo está usando mal.",
    "Ayer funcionaba antes de irme a casa.",
    "Es un problema de latencia en la red.",
    "El servidor está poseído.",
    "¿Has probado a reiniciar?"
];

function generarExcusa() {
    // 1. Elegimos un número al azar basado en la longitud de la lista
    const indiceAleatorio = Math.floor(Math.random() * excusas.length);
    
    // 2. Seleccionamos la excusa
    const excusaElegida = excusas[indiceAleatorio];
    
    // 3. La mostramos en el HTML
    document.getElementById("excusa-display").innerText = '"' + excusaElegida + '"';
    
    // Un poco de "debug" para que veas que funciona en la consola
    console.log("Excusa generada: " + excusaElegida);
}

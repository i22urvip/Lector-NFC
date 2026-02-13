const btn = document.getElementById("btn-escanear");
const consola = document.getElementById("consola");

// Función para escribir en la pantallita negra
function log(mensaje, tipo = "normal") {
    const p = document.createElement("div");
    p.textContent = `> ${mensaje}`;
    if (tipo === "error") p.style.color = "#ff4444";
    if (tipo === "exito") p.style.color = "#00ff00";
    consola.prepend(p); // Añade el mensaje al principio
}

btn.addEventListener("click", async () => {
    log("Iniciando escáner...", "normal");

    // 1. Verificamos si el navegador soporta NFC
    if (!("NDEFReader" in window)) {
        log("❌ Tu navegador no soporta Web NFC. Prueba Chrome en Android.", "error");
        return;
    }

    try {
        // 2. Instanciamos el lector
        const ndef = new NDEFReader();
        
        // 3. Pedimos permiso e iniciamos el escaneo
        await ndef.scan();
        log("✅ Escáner activo. Acerca la tarjeta.", "exito");
        btn.style.display = "none"; // Ocultamos botón para que no moleste

        // 4. Qué hacer si hay un error de lectura
        ndef.addEventListener("readingerror", () => {
            log("⚠️ Error leyendo la tarjeta. Intenta mantenerla quieta.", "error");
        });

        // 5. ¡QUÉ HACER CUANDO LEEMOS ALGO!
        ndef.addEventListener("reading", ({ message, serialNumber }) => {
            log("--------------------------------");
            log(`💳 UID (Serial): ${serialNumber}`, "exito");
            
            // Recorremos los registros (records) que tenga la tarjeta
            if (message.records.length === 0) {
                log("La tarjeta está vacía o sin formato NDEF.");
            }

            for (const record of message.records) {
                log(`Tipo de registro: ${record.recordType}`);
                
                // Si es texto, lo decodificamos
                if (record.recordType === "text") {
                    const textoDecodificado = new TextDecoder(record.encoding).decode(record.data);
                    log(`📝 CONTENIDO: ${textoDecodificado}`, "exito");
                } else {
                    log("Datos no textuales detectados.");
                }
            }
        });

    } catch (error) {
        log("❌ Error: " + error, "error");
    }
});

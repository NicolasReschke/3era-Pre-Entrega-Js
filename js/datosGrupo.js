
function comenzarCargaDeDatos() {
    
    class DatosGrupo {
        constructor() {
            this.grupo = []
        }
        
        agregarPersona(nombrePersona, edadPersona) {
            this.grupo.push({id:this.generarId(), nombre:nombrePersona.toUpperCase(), edad:edadPersona});
            console.log("Completaste Nombre y edad");
        }
        
        eliminarPersona(id) {
            this.grupo = this.grupo.filter(item => item.id != id);
            console.log("Eliminado");
        }
        
        totalPersonas() {
            return this.grupo.length;
        }
        
        generarId() {
            let max = 0;
            
            this.grupo.forEach(item => {
                if (item.id > max) {
                    max = item.id;
                }
            });
            
            return max + 1;
        }
        
        listaDePersonas() {
            let personas = "Personas que integran el grupo:\n\n";
            
            this.grupo.forEach(item => {
                personas += `${item.id}) - ${item.nombre} - ${item.edad} años.\n` 
            });
            
            return personas;
        }
    }
        
        let nombre = "";
        let edad = 0;
    const datosGrupo = new DatosGrupo();

    // Ingresamos el nombre de la persona q va a pertenecer al grupo
    while (nombre.toUpperCase() != "ESC") {
        nombre = prompt("Ingrese Nombre:\n(Escriba ESC para finalizar la carga de datos!)");
        
        if (nombre.toUpperCase() == "ESC") {
            break;
        }
        // Ingresamos la edad de la persona
        edad = parseInt(prompt("Ingrese edad de la persona:"));
        datosGrupo.agregarPersona(nombre, edad);
    }
    
    // Validamos si el grupo tiene personas
    if (datosGrupo.totalPersonas() > 0) {
        let id;
        
        // Retiramos personas del grupo
        while (id != 0) {
            id = parseInt(prompt(datosGrupo.listaDePersonas() + "\nIngrese el ID de la persona que quiere retirar del grupo:\n(Escriba 0 finalizar!)"));
            
            if (id > 0) {
                datosGrupo.eliminarPersona(id);
            }
            
            if (datosGrupo.totalPersonas() == 0) {
                break;
            }
        }
        
        // Personas agregadas
        alert(`${datosGrupo.listaDePersonas()}\nGrupo completado. Disfruta el show!!`);
    } else {
        alert("No se encontraron personas agregadas en su grupo");
    }
    
}

let btnCargarDatos = document.getElementById("btnCargarDatos");
btnCargarDatos.addEventListener("click", comenzarCargaDeDatos);

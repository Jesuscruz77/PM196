// 1.Crea una función verificarUsuario(usuario) que retorne una promesa.
// 2. Si el nombre de usuario es "admin", la promesa se resuelve con "Acceso concedido", si no, se rechaza con "Acceso denegado".
function verificarUsuario(usuario) {
    // Retorna una promesa aquí
    return new Promise((resolve, reject) => {
        if (usuario === "admin") {
            resolve("Acceso concedido");
        } else {
            reject("Acceso denegado");
        }
        
    });
}

// Uso con .then() y .catch()
verificarUsuario("admin")
.then(res => console.log("admin = " + res)) // Acceso concedido
.catch(err => console.error(err));
verificarUsuario("lvan")
.then(res => console.log(res))
.catch(err => console.error("Ivan = " + err)); // Acceso denegado

// Crea una función obtenerDatos() que simule una llamada a una API con setTimeout y
// usar async/await para esperar el resultado.

function simularPeticionAPI() {
    return new Promise(resolve => {
    setTimeout(() => {
    resolve("Datos recibidos correctamente");
    }, 5000);
    });
}

async function obtenerDatos() {
    // Usa await para esperar la promesa de simularPeticion
    // Imprime el resultado
    const resultado = await simularPeticionAPI();
    console.log(resultado);
}

//Usa la funcion async
obtenerDatos();

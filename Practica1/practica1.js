//Ejercicio 1
let nombre = "Armando";
let edad = 25;

nombre = "Ana Maria";

const saludo = "Hola, " + nombre + ". Tienes " + edad + " años.";

console.log(saludo);

//Ejercicio 2
function cuadrado(numero) {
    return numero * numero;
}
console.log(cuadrado(3)); 
console.log(cuadrado(5));   
console.log(cuadrado(100)); 

//Ejercicio 3

const Saludo = (nombre, edad) => {
    return "Hola, " + nombre + " y tengo "+ edad + "años.";
};

console.log(Saludo("Isay", 37));
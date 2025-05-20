//1. Tienes el siguiente objeto persona.
//2. Extrae los valores de nombre, edad y ciudad usando destructuración.
//3. Luego, muestra un mensaje como: "Me llamo Ivan Isay, tengo 37 años y vivo en Qro."
const persona = {
    nombre: "Ivan Isay",
    edad: 37,
    direccion: {
        ciudad: "Qro",
        pais: "Mx"
    }
};

const { nombre, edad, direccion: { ciudad } } = persona; 
const mensaje = "Me llamo " + nombre + " tengo " + edad + " años, y vivo en "+ ciudad +"."; 
console.log(mensaje);



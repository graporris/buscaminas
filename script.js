const x = 4;
const y = 4;

//let num1 = parseInt(document.getElementById(form__x);
let num1 = parseInt(prompt('Coordenada x:'));

if ((num1 > x) || (!Number.isInteger(num1))) {
    alert('No existe, debe ser un número menor o igual a ' + x);
} 

let num2 = parseInt(prompt('Coordenada y:'));

if ((num2 > y) || (!Number.isInteger(num2))) {
    alert('No existe, debe ser un número menor o igual a ' + y);
} 
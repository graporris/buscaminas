let tableroHTML = document.getElementById("tablero__juego");

let botonJugar = document.getElementById("nuevojuego__boton");

let boxs = document.querySelectorAll(".tablero__juego__box");

let botonJugarDeNuevo = document.getElementById("botonNuevoJuego");

//Dimensiones del tablero
let x = 4; //j
let y = 4;  //i
let bombas = 4;
let tablero = new Array(y); //(y,x)


function llenarTablero(bombas) {    //Crea la matriz y rellena con bombas y numeros
  let posicionx = new Array(bombas);
  let posiciony = new Array(bombas);

  //crea y rellena un nuevo array con 0.
  for (let i = 0; i < y; i++) {
    tablero[i] = new Array(x);
  }

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      tablero[i][j] = 0;
    }
  }

  //coloca las bombas en el array nuevo, en posiciones aleatorias
  for (let i = 0; i < bombas; i++) {

    let bombax = Math.floor(Math.random() * (x - 1));
    let bombay = Math.floor(Math.random() * (y - 1));

    //si ya existe una bomba en la posicion asigna una nueva
    if (posicionx.includes(bombax) && posiciony.includes(bombay)) {
      do {
        bombax = Math.floor(Math.random() * (x - 1));
        bombay = Math.floor(Math.random() * (y - 1));
      } while (posicionx.includes(bombax) && posiciony.includes(bombay))
    }

    tablero[bombay][bombax] = 'X';
    posicionx.push(bombax);
    posiciony.push(bombay);
    i;

    // CONTROL BOMBAS
    console.log('Y:' + (bombay) + ' X: ' + (bombax));
  }

}

function bombasAdyacentes(num1, num2) { //Indica las bombas que rodean la casilla actual
  let contador = 0;
  
  //Para las coordenadas que no son de los bordes
  if ((num1 > 0) && (num1 < (x - 1)) && (num2 > 0) && (num2 < (y - 1))) {
    for (let i = (num1 - 1); i <= (num1 + 1); i++) {
      for (let j = (num2 - 1); j <= (num2 + 1); j++) {
        if (tablero[i][j] === 'X') {
          contador = contador + 1;
        };
      }
    }
  } else if ((num1 == 0) || (num1 == (x-1))) {  
    switch (num1) {  //x
      case 0:        //Evalúa lado izq
        if ((num2 != 0) && (num2 < (y-1))) {
          for (let i = 0; i < (num1 + 1); i++) {
            for (let j = (num2 - 1); j <= (num2 + 1); j++) {
              if (tablero[i][j] === 'X') {
                contador = contador + 1;
              };
            }
          } 
        } else if (num2 == 0) {
            for (let i = 0; i < (num1 + 1); i++) {
              for (let j = (num2); j <= (num2 + 1); j++) { {
                if (tablero[i][j] === 'X') {
                  contador = contador + 1;
                };
              }
            }
          } 
        } else if (num2 == (y-1)) {
          for (let i = 0; i < (num1 + 1); i++) {
            for (let j = (num2 - 1); j <= (num2); j++) {
              if (tablero[i][j] === 'X') {
                contador = contador + 1;
              };
            }
          } 
        }
        break;
      case (x - 1):  ///Evalúa lado dcho
         if ((num2 != 0) && (num2 < (y-1))) {
            for (let i = (num1 - 1); i <= (num1); i++) {
              for (let j = (num2 - 1); j <= (num2 + 1); j++) {
                if (tablero[i][j] === 'X') {
                  contador = contador + 1;
                };
              }
            }
         } else if (num2 == 0) {
           for (let i = (num1 - 1); i <= (num1); i++) {
              for (let j = (num2); j <= (num2 + 1); j++) {
                if (tablero[i][j] === 'X') {
                  contador = contador + 1;
                };
              }
            }
         } else if (num2 == (y-1)) {
           for (let i = (num1 - 1); i <= (num1); i++) {
              for (let j = (num2 - 1); j <= (num2); j++) {
                if (tablero[i][j] === 'X') {
                  contador = contador + 1;
                };
              }
            }
         }
          break;
        default:
          break;
      }  
    } else {
      switch (num2) { //y
        case 0:          //Evalúa fila arriba
          for (let i = (num1 - 1); i <= (num1 + 1); i++) {
            for (let j = (num2); j <= (num2 + 1); j++) {
              if (tablero[i][j] === 'X') {
                contador = contador + 1;
              };
            }
          }
          break;
        case (y - 1):  //Evalúa fila abajo
          for (let i = (num1 - 1); i <= (num1 + 1); i++) {
            for (let j = (num2 - 1); j <= (num2); j++) {
              if (tablero[i][j] === 'X') {
                contador = contador + 1;
              };
            }
          }
        break;
      default:
        break;
    }
  }

  return contador;
}

function cargarNumeroBombas() {   //Asigna el número de bombas que rodean la casilla
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      if (tablero[i][j] !== "X") {
        tablero[i][j] = parseInt(bombasAdyacentes(j,i));
      }      
    } 
  }
}

function mostrarMatriz() { //BORRAR - SOLO CONTROL
  for (let i = 0; i < y; i++) {
    console.log(tablero[i]);
    i;
  }
}

function borrarTablero() {
  let elementos = tablero.length;
  let contar = 0;
  do {
    tablero.shift();
    contar++;
  } while (contar < elementos);
}

function gameOver() {
  window.location.href = "fin-partida.html";
}

const crearJuego = function(e) {
  borrarTablero();
  llenarTablero(bombas);
  cargarNumeroBombas();
  mostrarMatriz(); //BORRAR
};

const mostrarBox = function(e) {
  let idbox = this.id;
  let i = parseInt(idbox[0]);
  let j = parseInt(idbox[2]);

  if(tablero[i][j] === "X") {
    this.style.background = "red";
    gameOver()
    //this.style.backgroundImage = "url(img/mina.png)";
  } else {
    //this.style.background = "white";
    this.textContent = tablero[i][j];
    //this.style.color = "blue";
    this.classList.toggle("tablero__juego__box--mostrar");
  }
}


boxs.forEach(box => {
  box.addEventListener("click", mostrarBox);
})

botonJugar.addEventListener('click', crearJuego);



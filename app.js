"use strict";
/*
Este código define la lógica de un juego de "Tres en Raya" o "Tic Tac Toe".
Permite a dos jugadores turnarse para jugar con las fichas 'X' y 'O' en una cuadrícula de 3x3,
detectando victorias y tablas automáticamente.
*/

// Constantes de juego
const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const FICHAS = ['X', 'O'];
const FILA_IZQUIERDA = [1, 4, 7];
const FILA_DERECHA = [3, 6, 9];
const DIAGONAL_PRINCIPAL = [1, 5, 9];
const DIAGONAL_SECUNDARIA = [3, 5, 7];

let tablas = false;   // Variable para identificar si el juego termina en tablas
let victoria = false; // Variable para identificar si el juego termina en victoria
let turnoActual = 0;  // Lleva el seguimiento del turno actual

/**
 * ejecutarturno - Marca la casilla con la ficha del jugador actual y actualiza el turno.
 * @param {HTMLElement} casilla - Elemento de la casilla HTML que fue clickeado.
 */
function ejecutarturno(casilla) {
    casilla.textContent = FICHAS[turnoActual % 2];
    turnoActual++;
}

/**
 * comprobarCasillaValida - Verifica si una casilla es válida para jugar (está vacía).
 * @param {HTMLElement} casilla - Elemento de la casilla HTML que fue clickeado.
 * @returns {boolean} - Devuelve true si la casilla es válida (vacía), false en caso contrario.
 */
function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent;
    return CASILLAS_VALIDAS.includes(contenido);
}

/**
 * comprobartablas - Verifica si el juego ha terminado en tablas.
 */
function comprobartablas() {
    if (turnoActual == 9 && !victoria) {
        tablas = true;
    }
}

/**
 * casillaOnClick - Controlador de eventos que maneja el clic en una casilla.
 * @param {Event} event - Evento de clic en la casilla.
 */
function casillaOnClick(event) {
    let casilla = event.target;
    console.log("click desde casilla " + casilla.textContent);
    if (comprobarCasillaValida(casilla)) {
        ejecutarturno(casilla);
        comprobarfinjuego(casilla);
    }
}

/**
 * comprobarfinjuego - Verifica si el juego ha terminado, ya sea por victoria o por tablas.
 * @param {HTMLElement} casilla - La casilla actual que fue clickeada.
 */
function comprobarfinjuego(casilla) {
    const numeroCasilla = parseInt(casilla.id.split('-')[1]);

    comprobarHorizontal(numeroCasilla);
    comprobarVertical(numeroCasilla);

    // Comprueba la diagonal principal si el número de casilla pertenece a ella
    if (DIAGONAL_PRINCIPAL.includes(numeroCasilla)) {
        comprobarDiagonalPrincipal();
    }

    // Comprueba la diagonal secundaria si el número de casilla pertenece a ella
    if (DIAGONAL_SECUNDARIA.includes(numeroCasilla)) {
        comprobarDiagonalSecundaria();
    }

    comprobartablas();

    if (victoria) {
        alert('Gana ' + FICHAS[(turnoActual - 1) % 2]);
        return;
    }

    if (tablas) {
        alert('Tablas');
        return;
    }
}

/**
 * main - Inicializa el juego agregando controladores de eventos a cada casilla.
 */
function main() {
    for (let i = 1; i <= 9; i++) {
        let casilla = document.getElementById(`casilla-${i}`);
        casilla.addEventListener('click', casillaOnClick);
    }
}

/**
 * comprobarHorizontal - Verifica si hay tres fichas iguales en una fila.
 * @param {number} numeroCasilla - Número de la casilla actual para determinar la fila.
 */
function comprobarHorizontal(numeroCasilla) {
    const filaInicio = Math.floor((numeroCasilla - 1) / 3) * 3 + 1;
    const casilla1 = obtenerCasilla(filaInicio);
    const casilla2 = obtenerCasilla(filaInicio + 1);
    const casilla3 = obtenerCasilla(filaInicio + 2);
    
    if (
        casilla1.textContent !== '' &&
        casilla1.textContent === casilla2.textContent &&
        casilla2.textContent === casilla3.textContent
    ) {
        victoria = true;
    }
}

/**
 * comprobarVertical - Verifica si hay tres fichas iguales en una columna.
 * @param {number} numeroCasilla - Número de la casilla actual para determinar la columna.
 */
function comprobarVertical(numeroCasilla) {
    const columnaInicio = (numeroCasilla - 1) % 3 + 1;
    const casilla1 = obtenerCasilla(columnaInicio);
    const casilla2 = obtenerCasilla(columnaInicio + 3);
    const casilla3 = obtenerCasilla(columnaInicio + 6);
    
    if (
        casilla1.textContent !== '' &&
        casilla1.textContent === casilla2.textContent &&
        casilla2.textContent === casilla3.textContent
    ) {
        victoria = true;
    }
}

/**
 * comprobarDiagonalPrincipal - Verifica si hay tres fichas iguales en la diagonal principal.
 */
function comprobarDiagonalPrincipal() {
    const casilla1 = obtenerCasilla(1);
    const casilla2 = obtenerCasilla(5);
    const casilla3 = obtenerCasilla(9);
    
    if (
        casilla1.textContent !== '' &&
        casilla1.textContent === casilla2.textContent &&
        casilla2.textContent === casilla3.textContent
    ) {
        victoria = true;
    }
}

/**
 * comprobarDiagonalSecundaria - Verifica si hay tres fichas iguales en la diagonal secundaria.
 */
function comprobarDiagonalSecundaria() {
    const casilla1 = obtenerCasilla(3);
    const casilla2 = obtenerCasilla(5);
    const casilla3 = obtenerCasilla(7);
    
    if (
        casilla1.textContent !== '' &&
        casilla1.textContent === casilla2.textContent &&
        casilla2.textContent === casilla3.textContent
    ) {
        victoria = true;
    }
}

main(); // Inicializa el juego.
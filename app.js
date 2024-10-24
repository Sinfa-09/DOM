"use strict";
/*(function(){

})();*/
//para ejecutar una funcion imediatamente sin necesidad de luego lanzarla

const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const FICHAS=['X', 'O'];
const FILA_IZQUIERDA = [1 , 4 , 7];
const FILA_DERECHA = [3 , 6 , 9];
const DIAGONAL_PRINCIPAL = [1 , 5 , 9];
const DIAGONAL_SECUNDARIA = [3 , 5 , 7];


let tablas=false;
let victoria = false;
let turnoActual=0;

function ejecutarturno(casilla){
    const numeroCasilla=casilla.textContent;
    casilla.textContent=FICHAS[turnoActual
     % 2];
    turnoActual++;
}

function comprobarCasillaValida(casilla){
    let contenido =casilla.textContent; //Accedemos a la casilla html y debuelve el texto
    return CASILLAS_VALIDAS.includes(contenido);
}
function comprobartablas(){
    if (turnoActual == 9 && !victoria) {
        tablas=true;
    }



}
function comprobardiagonalPrincipal(){}
function comprobarDiagonalSecundaria(){}
function comprobarVertical(){}
function comprobarHorizontal(){}

function comprobarfinjuego(casilla){
    const numeroCasilla = casilla.textContent; 
    comprobarHorizontal(numeroCasilla);
    comprobarVertical(numeroCasilla);
    if(DIAGONAL_PRINCIPAL.includes(numeroCasilla)){
        comprobardiagonalPrincipal(numeroCasilla);
    }
    if (DIAGONAL_SECUNDARIA.includes(numeroCasilla)) {
        comprobarDiagonalSecundaria(numeroCasilla);
    }
    function comprobartablas(){
       if (victoria){
        alert('Gana '+FICHAS[turnoActual % 2]);
        return
    }
    if (tablas){
        alert('Tablas');
        return;
    } 
    }
    
}

function casillaOnClick(event){
    let casilla=event.target;//devuelve el elemento ejecutado
    console.log("click desde casilla "+casilla.textContent);
    if(comprobarCasillaValida(casilla)){
        ejecutarturno(casilla);
        comprobarfinjuego(casilla);
        }
}

// las `` es una interpolacion de cadenas
function main(){
    for (let i = 1;i<=9;i++){
        let casilla =document.getElementById(`casilla-${i}`);//Recupera el elemento del html
        //let casilla= document.querySelector(`#casilla-${i}`);//Este hace lo mismo
        casilla.addEventListener('click', casillaOnClick);
    }
   // let casillas=document.querySelectorAll('.casilla');
}

main();
// pcm 20152016a Blackjack oop - Joao Vaz 40266

var jogo = null;
//reconhece a primeira jogada de modo a esconder a 1º carta do dealer
var firstdraw = null;

function debug(an_object) {
    var json=JSON.stringify("Debug");
    document.getElementById("debugtitle").innerHTML = JSON.parse(json);
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function inicializa_butoes(){
    document.getElementById("carta").disabled     = false;
    document.getElementById("passo").disabled     = false;
    document.getElementById("novo_jogo").disabled = true;
}

function finaliza_butoes(){
    document.getElementById("carta").disabled     = true;
    document.getElementById("passo").disabled     = true;
    document.getElementById("novo_jogo").disabled = false;
}

// Funções para implementar
function novo_jogo(){
    jogo = new BlackJack();
    inicializa_butoes();
    //professor esta teve mesmo que ser que estas 2 linhas de jquery era uma funçao inteira em js
    $('#flex-cards2').empty();
    $('#flex-cards1').empty();
    firstdraw = true;
    atualiza_resultado('play');
    darCartas();
    //debug(jogo);
}

function atualiza_dealer(resultado) {
    var json = JSON.stringify("Cartas: X," + resultado + "  Resultado = " + resultado);
    document.getElementById("dealer").innerHTML = JSON.parse(json);
}

function finaliza_dealer(resultado) {
    var valcarta = [];
    for (var i=0; i< jogo.cartas_dealer.length; i++) {
        valcarta.push(jogo.cartas_dealer[i].getnum());
    }
    var json = JSON.stringify("Cartas: " + valcarta.slice() + "  Resultado = " + resultado);
    document.getElementById("dealer").innerHTML = JSON.parse(json);
}

function atualiza_player(resultado) {
    var valcarta = [];
    for (var i=0; i< jogo.cartas_player.length; i++) {
        valcarta.push(jogo.cartas_player[i].getnum());
    }
    var json = JSON.stringify("Cartas: "+ valcarta.slice() +"  Resultado = " + resultado);
    document.getElementById("player").innerHTML = JSON.parse(json);
}

function atualiza_resultado(msg) {
    var json = JSON.stringify(msg);
    document.getElementById("resultado").innerHTML = JSON.parse(json);
}

function darCartas(){
    jogo.criar_baralho();
    jogada_player();
    jogada_dealer();
    jogada_player();
    jogada_dealer();
}

function jogada_dealer(){
    var carta = jogo.jogada_dealer();
    var resultado = jogo.valor(jogo.get_cartas_init_dealer());
    atualiza_dealer(resultado);
    displayCards(carta);
    //debug(jogo);
}

function jogada_player(){
    var carta = jogo.jogada_player();
    var resultado = jogo.valor(jogo.get_cartas_player()) ;
    atualiza_player(resultado);
    if (resultado > 21 ){
        atualiza_resultado("Arrebentou!<br />O vencedor é o Dealer");
        finaliza_butoes();
    } else if (resultado === 21) {
        atualiza_resultado("Parabens!! Fez Blackjack!!");
        document.getElementById("carta").disabled     = true;
    }
    displayCards(carta);
    //debug(jogo);
}

function dealer_acaba(){
    var pontosdealer = jogo.valor(jogo.get_cartas_dealer());
    var pontosjogador = jogo.valor(jogo.get_cartas_player());
    $('#flex-cards1').empty();
    for (var i=0; i< jogo.cartas_dealer.length; i++) {
        displayCards(jogo.cartas_dealer[i]);
    }

    while (pontosdealer < 17) {
        var carta = jogo.jogada_dealer();
        pontosdealer = jogo.valor(jogo.get_cartas_dealer());
        displayCards(carta);
    }

    finaliza_dealer(pontosdealer);
    //debug(jogo);

    if (pontosdealer>21){
        atualiza_resultado("O vencedor é o Jogador");
    }
    if ((pontosjogador > pontosdealer) && (pontosjogador<=21)){
        atualiza_resultado("O vencedor é o Jogador");
    } else if ((pontosjogador === pontosdealer) && (pontosjogador<=21) && (pontosdealer<=21)) {
        atualiza_resultado("Empate");
    } else if ((pontosjogador < pontosdealer) && (pontosdealer<=21)) {
        atualiza_resultado("O vencedor é o Dealer");
    }
    finaliza_butoes();
}

//funçao encontrada em http://stackoverflow.com/questions/11805251/add-html-elements-dynamically-with-javascript-inside-div-with-specific-id
//insere dinamicamente html
function createCardHtml(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

//permite escrever o html que corresponde as css's das cartas
function displayCards(carta){
    var numero = carta.getnum();
    var numero2 = carta.getnum();
    var naipe, naipe2;
    //converte figuras
    if (numero === 11){
        numero = "J";
        numero2 = "j";
    } else if (numero === 12){
        numero = "Q";
        numero2 = "q";
    } else if (numero === 13){
        numero = "K";
        numero2 = "k";
    }else if (numero === 1){
        numero = "A";
        numero2 = "a";
    }

    //converte naipes
    if (carta.getnaipe() === 0){
        naipe2 = "&spades";
        naipe= "spades";
    } else if (carta.getnaipe() === 1){
        naipe2 = "&hearts";
        naipe= "hearts";
    } else if (carta.getnaipe() === 2){
        naipe2 = "&diams";
        naipe= "diams";
    } else {
        naipe2 = "&clubs";
        naipe= "clubs";
    }
    //implementado usando template strings para permitir a interpolação de expressões
    //https://developer.mozilla.org/pt-PT/docs/Web/JavaScript/Reference/template_strings
    //ECMAScript2015 6yh edition
    var classSrg = `"card rank-${numero2} ${naipe}"`;
    var desenhaCarta;
    //verifica se é a primeira carta do dealer para a desenhar voltada para baixo
    if ((jogo.cartas_dealer.indexOf(carta)) === 0 && (firstdraw===true)){
        desenhaCarta = createCardHtml(`<div class="card back">*</div>`);
        firstdraw=false;
    } else{
        desenhaCarta = createCardHtml(`<div class=${classSrg}><span class="rank">${numero}</span><span class="suit">${naipe2};</span></div>`);
    }
    //verifica se as cartas são do dealer ou do player para escrever na section correcta
    if (jogo.cartas_dealer.indexOf(carta) === -1 ){
        document.getElementById("flex-cards2").appendChild(desenhaCarta);
    }else {
        document.getElementById("flex-cards1").appendChild(desenhaCarta);
    }
}
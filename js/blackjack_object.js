// pcm 20152016a Blackjack object - Joao Vaz 40266

// objeto BlackJack - construtor
function BlackJack() {
    // membros
    this.baralho       = [];
    this.cartas_player = [];
    this.cartas_dealer = [];
    var carta = null;

    //métodos para implementar
    this.criar_baralho = function() {
        this.baralho = this.baralha(this.novo_baralho());
    };

    this.novo_baralho = function () {
        var baralho=[];
        for (var i = 0; i < 4; i++) {
            for (var j= 1; j < 14; j++) {
                carta = new Carta(j,i);
                baralho.push(carta);
            }
        }
        //debug(baralho);
        return baralho;
    };

    this.baralha = function (baralho){
        var indice = null;
        var indices=[];
        var baralhado=[];
        for (var i = 0; i < 52; i++) {
            indices.push(i);
        }
        for (var j= 1; j <= 52; j++) {
            indice= Math.floor(Math.random()*indices.length);
            baralhado.push(baralho[indices[indice]]);
            indices.splice(indice,1);
        }
        //debug(baralhado);
        return baralhado;
    };

    this.valor = function(cartas) {
        var pontos = 0;
        var as = false;
        for (var i = 0; i < cartas.length; i++) {
            if (cartas[i].getnum() > 10 && cartas[i].getnum()<14){
                pontos += 10;
            }
            else if (cartas[i].getnum() <= 10 && cartas[i].getnum() > 1){
                pontos += cartas[i].getnum();
            }
            else if (cartas[i].getnum() === 1) {
                as = true;
                if (pontos+11 <= 21){
                    pontos += 11;
                }
                else {
                    pontos += 1;
                }
            }
        }
        //debug(pontos);
        return pontos;
    };

    this.get_cartas_dealer = function() {
        return this.cartas_dealer.slice();
    };

    this.get_cartas_init_dealer = function() {
        return this.cartas_dealer.slice(1);
    };

    this.get_cartas_player = function() {
        return this.cartas_player.slice();
    };

    this.jogada_player = function() {
        var carta = this.baralho[0];
        this.baralho.splice(0,1);
        this.cartas_player.push(carta);
        return carta;
    };

    this.jogada_dealer = function() {
        var carta = this.baralho[0];
        this.baralho.splice(0,1);
        this.cartas_dealer.push(carta);
        return carta;
    };
}
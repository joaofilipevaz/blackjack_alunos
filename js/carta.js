function Carta(numero, naipe) {
    // membros
    this.numero = numero;
    this.naipe = naipe;

    this.getnaipe = function() {
        return this.naipe;
    };
    this.getnum = function() {
        return this.numero;
    };
}
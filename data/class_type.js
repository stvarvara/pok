// class Type
// Décrit les différents types de Pokémons en fonction de leur forme
class Type {
    static all_types = {}; // L'ensemble des types de Pokémon indexé par le nom du type

    constructor(name) {
        this._name = name; // Nom 
        this._effectiveness = type_effectiveness[name] || {}; // Effetivité du type contre d'autres types de Pokémon
    }

    // Méthode toString pour afficher le nom de type
    toString() {
        return this._name;
    }
    // Getters pour les propriétés de type
    get name() {return this._name;}
    get effectiveness() {return this._effectiveness;}
}

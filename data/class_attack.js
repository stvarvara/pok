// Classe Attack
// Définit les différentes attaques que les Pokémon peuvent apprendre.
class Attack {
    static all_attacks = {}; // Toutes les attaques existantes, indexées par l’identifiant de l’attaque

    // Constructeur de la classe Attack
    constructor(name) {
        // Recherche de l'attaque dans les fichiers JSON de mouvements chargés et rapides
        const attack = charged_moves.find(move => move.name === name) || fast_moves.find(move => move.name === name);
        
        // Vérification si l'attaque existe
        if (!attack) {
            console.log("Undefined move: " + name); // Affiche un message d'erreur si l'attaque n'existe pas
            return undefined; // Retourne undefined si l'attaque n'existe pas
        }

        // Déstructuration des propriétés de l'attaque
        const {
            critical_chance = 0,
            duration,
            move_id,
            energy_delta,
            power,
            stamina_loss_scaler,
            type
        } = attack;

        // Initialisation des propriétés de l'objet Attack
        this._name = name; // Nom 
        this._critical_chance = critical_chance; // Chance de coup critique
        this._duration = duration; // Durée
        this._move_id = move_id; // ID 
        this._energy_delta = energy_delta; // Delta d'énergie
        this._power = power; // Puissance
        this._stamina_loss_scaler = stamina_loss_scaler; // Perte de stamina
        this._type = type; // Type
        this._is_charged = !!charged_moves.find(move => move.name === name); // Si l'attaque est chargée

        // Ajout de l'attaque à la liste des attaques si elle n'existe pas déjà
        if (!Attack.all_attacks[name]) {
            Attack.all_attacks[name] = this;
        }
    }

    // Méthode toString pour afficher le nom de l'attaque
    toString() {
        return this._name;
    }

    // Getters pour les propriétés de l'attaque
    get name() { return this._name; }
    get critical_chance() { return this._critical_chance; }
    get duration() { return this._duration; }
    get move_id() { return this._move_id; }
    get energy_delta() { return this._energy_delta; }
    get power() { return this._power; }
    get stamina_loss_scaler() { return this._stamina_loss_scaler; }
    get type() { return this._type; }
    get is_charged() { return this._is_charged; }
}

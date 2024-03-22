// class Pokémon
// Définit les 898 Pokémons des 8 premières générations
class Pokemon {
    static all_pokemons = {}; // Variable de classe contenant l'ensemble des Pokémon indexés par leur ID

    constructor(pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina, types, moves, generation) {
        this._pokemon_id = pokemon_id;
        this._pokemon_name = pokemon_name;
        this._form = form;
        this._base_attack = base_attack;
        this._base_defense = base_defense;
        this._base_stamina = base_stamina;
        this._types = types; // Liste des types du Pokémon
        this._moves=moves; // Liste des attaques du Pokémon
        this._generation=generation; // Génération à laquelle appartient le Pokémon
    }

    // Getters pour les propriétés de Pokémon
    get pokemon_id() {return this._pokemon_id;}
    get pokemon_name() {return this._pokemon_name;}
    get form() {return this._form;}
    get moves(){return this._moves;}
    get base_attack() {return this._base_attack;}
    get base_defense() {return this._base_defense;}
    get base_stamina() {return this._base_stamina;}
    get generation() { return this._generation;}
    get types() {return this._types;}

    // Méthode toString pour afficher le Pokémon
    toString() {
        return `${this.pokemon_name} (${this.form}) - ID: ${this.pokemon_id}, Attack: ${this.base_attack}, Defense: ${this.base_defense}, Stamina: ${this.base_stamina}`;
    }

    // Méthode statique pour importer les Pokémon à partir des données sources
    static import_pokemon() {
        for (const p of pokemon) {
            if (p.form !== "Normal") {
                continue; // On passe au Pokémon suivant s'il ne s'agit pas d'une forme normale
            }
            
            const { pokemon_name, pokemon_id, base_stamina, base_defense, base_attack } = p;

            // Récupération de la génération du Pokémon
            const generation = Pokemon.import_generation(pokemon_name);

            // Ajout des types du Pokémon
            const types = [];
            for (const ptype of pokemon_type) {
                if (ptype.pokemon_name === pokemon_name) {
                    if (ptype.form==="Normal") {
                        const typeName = ptype.type;
                    if (!Type.all_types[typeName]) {
                        Type.all_types[typeName] = new Type(typeName);
                    }
                    types.push(...typeName);
                    }
                    
                }
            }
             // Ajout des attaques du Pokémon
            const moves = [];
            const seenMoves = new Set(); //les noms des attaques déjà rencontrées
            for (const pattack of pokemon_moves) {
                if (pattack.pokemon_name === pokemon_name) {
                    for (const move of [...pattack.charged_moves, ...pattack.fast_moves]) {
                        if (!seenMoves.has(move)) { // Vérifier si l'attaque n'a pas déjà été ajoutée
                            if (!Attack.all_attacks[move]) { 
                                new Attack(move);
                            }
                            moves.push(move);
                            seenMoves.add(move); // l'ensemble des attaques déjà vues
                        }
                    }
                }
            }
            // Création d'un nouvel objet Pokémon avec les informations récupérées
            const newPokemon = new Pokemon(
                pokemon_id, pokemon_name, p.form, base_stamina, base_defense, base_attack,
                types, moves, generation
            );
            // Ajout du Pokémon à la liste des Pokémon
            Pokemon.all_pokemons[pokemon_id] = newPokemon;
        }
    }
    // Méthode statique pour importer la génération à laquelle appartient le Pokémon
    static import_generation(name) {
        for (const gen in generation) {
            for (const pokemon of generation[gen]) {
                if (pokemon.name === name) {
                    const generationNumber = gen.match(/\d+/)[0]; // on ne veut pas conserver les 0
                    return generationNumber;
                }
            }
        }
        return "Inconnue";
    }
    
    // Méthode pour récupérer les types du Pokémon
    getTypes() {
        return this._types.map(type => Type.all_types[type]);
    }
    
    // Méthode pour récupérer les attaques du Pokémon
    getAttacks() {
        const attackInstances = this._moves.map(move => Attack.all_attacks[move]);
        return attackInstances;
    }

}    

Pokemon.import_pokemon();
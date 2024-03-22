Pokemon.import_pokemon();

///Q1 la liste des Pokémons par type
function getPokemonsByType(typeName) {
    
    const pokemonsWithType = [];
    for (const pokemonId in Pokemon.all_pokemons) {
        const pokemon = Pokemon.all_pokemons[pokemonId];
        if (pokemon.types.includes(typeName)) {
            pokemonsWithType.push(pokemon);
        }
    }

    return pokemonsWithType;
}



///Q2 la liste des Pokémons par attaque
function getPokemonsByAttack(attackName) {
    const pokemonsWithAttack = [];
    for (const pokemonId in Pokemon.all_pokemons) {
        const pokemon = Pokemon.all_pokemons[pokemonId];
        if (pokemon.moves.includes(attackName)) {
            pokemonsWithAttack.push(pokemon);
        }
    }
    return pokemonsWithAttack;
}


///Q3 la liste des attaques par type
function getAttacksByType(typeName) {
    const attacksWithType = [];
    for (const attackName in Attack.all_attacks) {
        const attack = Attack.all_attacks[attackName];
        if (attack.type === typeName) {
            attacksWithType.push(attack);
        }
    }
    return attacksWithType;
}


///Q4 a liste des Pokémons triés par nom dans l’ordre alphabétique
function sortPokemonByName() {
    const sortedPokemons = Object.values(Pokemon.all_pokemons).sort((a, b) => {
        return a.pokemon_name.localeCompare(b.pokemon_name);
    });
    return sortedPokemons;
}



///Q5 la liste des Pokémons triés dans l’ordre décroissant d’endurance (stamina)
function sortPokemonByStamina() {
    const sortedPokemons = Object.values(Pokemon.all_pokemons).sort((a, b) => {
        return b.base_stamina - a.base_stamina;
    });
    return sortedPokemons;
}



///Q6 la liste des Pokémons sur lesquels l’attaque choisie est la plus efficace
function getWeakestEnemies(attackName) {
    let maxEffectiveness = 0;
    let weakestEnemies = [];

    for (const pokemonId in Pokemon.all_pokemons) {
        const pokemon = Pokemon.all_pokemons[pokemonId];
        let totalEffectiveness = 1; // Initialisation de l'efficacité totale de l'attaque sur le Pokémon

        // Calcule de l'efficacité de l'attaque pour chaque type du Pokémon
        for (const typeName of pokemon.types) {
            const pokemon_type = Type.all_types[typeName];
            const attack = Attack.all_attacks[attackName];  
            const attack_type = Type.all_types[attack.type];

            if (pokemon_type.name in attack_type.effectiveness) {
                // Si le type est sensible à l'attaque, on multiplie l'efficacité totale par le multiplicateur
                totalEffectiveness *= attack_type.effectiveness[pokemon_type.name];
            }  
        }

        // Mise à jour de la liste des Pokémon les plus faibles si l'efficacité totale est la plus élevée
        if (totalEffectiveness > maxEffectiveness) {
            maxEffectiveness = totalEffectiveness;
            weakestEnemies = [pokemon];
        } else if (totalEffectiveness === maxEffectiveness) {
            weakestEnemies.push(pokemon);
        }
    }

    return weakestEnemies;
}



///Q7 la liste des types d’attaque les plus efficaces contre un Pokémon donné
function getBestAttackTypesForEnemy(pokemonName) {
    let pokemonID = null;

    // On commence par chercher l'ID du Pokémon en fonction de son nom
    for (const pokemonId in Pokemon.all_pokemons) {
        const pokemon = Pokemon.all_pokemons[pokemonId];
        if (pokemon.pokemon_name.toLowerCase() === pokemonName.toLowerCase()) {
            pokemonID = pokemon.pokemon_id;
        }
    }


    const pokemon = Pokemon.all_pokemons[pokemonID];
    if (!pokemon) {
        console.error("Pokémon non trouvé ! Vérifiez l'écriture que vous avez utilisé et ré-essayez.");
        return [];
    }

    const effectivenessMap = {};

    // Calculer l'efficacité de chaque type d'attaque contre le Pokémon spécifié
    for (const attackName in Attack.all_attacks) {
        const attack = Attack.all_attacks[attackName];
        let effectiveness = 1;

        for (const typeName of pokemon.types) {
            const type = Type.all_types[typeName];
            if (type.effectiveness[attack.type]) {
                effectiveness *= type.effectiveness[attack.type];
            }
        }

        if (effectiveness > 1) {
            effectivenessMap[attack.type] = effectiveness;
        }
    }

    // Trier les types d'attaque par efficacité décroissante
    const bestAttackTypes = Object.keys(effectivenessMap).sort((a, b) => {
        return effectivenessMap[b] - effectivenessMap[a];
    });

    return bestAttackTypes;
}


/////////////


// Fonction pour récupérer la valeur de l'argument commun
function getCommonArgument() {
    return document.getElementById("argument").value;
}

// Fonction de test pour Q1
function testQ1() {
    const typeName = getCommonArgument();
    console.log(`Liste des Pokémons de type ${typeName}:`);
    console.table(getPokemonsByType(typeName));
}

// Fonction de test pour Q2
function testQ2() {
    const attackName = getCommonArgument();
    console.log(`Liste des Pokémons ayant l'attaque ${attackName}:`);
    console.table(getPokemonsByAttack(attackName));
}

// Fonction de test pour Q3
function testQ3() {
    const typeName = getCommonArgument();;
    console.log(`Liste des attaques de type ${typeName}:`);
    console.table(getAttacksByType(typeName));
}

// Fonction de test pour Q4
function testQ4() {
    console.log("Liste des Pokémons triés par nom:");
    console.table(sortPokemonByName());
}

// Fonction de test pour Q5
function testQ5() {
    console.log("Liste des Pokémons triés par endurance:");
    console.table(sortPokemonByStamina());
}

// Fonction de test pour Q6
function testQ6() {
    const attackName = getCommonArgument();
    console.log(`Liste des Pokémons sur lesquels ${attackName} est le plus efficace:`);
    console.table(getWeakestEnemies(attackName));
}

// Fonction de test pour Q7
function testQ7() {
    const pokemonName = getCommonArgument();
    console.log(`Les types d'attaques les plus efficaces contre ${pokemonName} :`);
    console.table(getBestAttackTypesForEnemy(pokemonName));
}

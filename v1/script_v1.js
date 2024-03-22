// La première version de l'affichage dynamique des Pokémons
// Affichage d'un tableau de tous les Pokémons à partir de la source JSON

Pokemon.import_pokemon();// Importe les données des Pokémon

function padId(id) { //ajouter des zéros à gauche pour obtenir une chaîne de 3 caractères pour l'ID
    const paddedId = String(id).padStart(3, '0');
    return paddedId;
}
// Attente du chargement complet du document HTML 
document.addEventListener("DOMContentLoaded", function() { 
    function createPokemonRow(pokemon) { //créer une ligne de tableau pour un Pokémon 
        const row = document.createElement("tr");
         // remplir la ligne avec les informations du Pokémon
        row.innerHTML = `
            <td>${pokemon.pokemon_id}</td>
            <td>${pokemon.pokemon_name}</td>
            <td>${pokemon.generation}</td>
            <td>${pokemon.types.join(", ")}</td>
            <td>${pokemon.base_stamina}</td>
            <td>${pokemon.base_attack}</td>
            <td>${pokemon.base_defense}</td>
            <td><img src="../webp/thumbnails/${padId(pokemon.pokemon_id)}.webp" alt="${pokemon.pokemon_name}" ></td>
        `;
        return row;
    }

    if (typeof Pokemon.all_pokemons === 'object' && Pokemon.all_pokemons !== null) { // si le Pokémon est bien défini 
        const tableBody = document.getElementById("pokemonTableBody");
        // Parcour de chaque Pokémon et création d'une ligne de tableau pour chaque
        for (const pokemonId in Pokemon.all_pokemons) {
            const pokemon = Pokemon.all_pokemons[pokemonId];
            const row = createPokemonRow(pokemon);
            tableBody.appendChild(row);
        }
    } else { // si le Pokémon n'est pas bien défini 
        console.error("Pokemon data not found or not in the correct format.");
    }
});
// La deuxième version de l'affichage dynamique des Pokémons
// Affichage d'un tableau des Pokémons par page de 25

// Attente du chargement complet du document HTML 
document.addEventListener("DOMContentLoaded", function() {
    const pokemonsPerPage = 25; // le nb des Pokémons par page
    let currentPage = 1; //page courante
    let totalPages = Math.ceil(Object.keys(Pokemon.all_pokemons).length / pokemonsPerPage); // cb de pages en total
    
    const tableBody = document.getElementById("pokemonTableBody");

    function padId(id) { //ajouter des zéros à gauche pour obtenir une chaîne de 3 caractères pour l'ID
        const paddedId = String(id).padStart(3, '0');
        return paddedId;
    }

    function createPokemonRow(pokemon) {// créer une ligne de tableau pour un Pokémon 
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

    function renderPokemonPage(page) { // diviser les Pokémons par page
        tableBody.innerHTML = ""; // on n'affiche rien avant les calcules
        const startIdx = (page - 1) * pokemonsPerPage;
        const endIdx = startIdx + pokemonsPerPage;
        const pokemons = Object.values(Pokemon.all_pokemons).slice(startIdx, endIdx); 
        pokemons.forEach(pokemon => {
            const row = createPokemonRow(pokemon);
            tableBody.appendChild(row);
        });
        document.getElementById("currentPage").innerText = page;
    }

    if (!Pokemon.all_pokemons) { // // si les Pokémons sont bien définis 
        console.error("Pokemon data not found or not in the correct format.");
        return;
    }

    renderPokemonPage(currentPage); // appel de fonction pour séparer les Pokémons par page
    //Contrôle que le nombre de Pokémons ne dépasse pas
    document.getElementById("prevButton").addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            renderPokemonPage(currentPage);
        }
    });

    document.getElementById("nextButton").addEventListener("click", function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderPokemonPage(currentPage);
        }
    });

    document.getElementById("totalPages").innerText = totalPages;
});

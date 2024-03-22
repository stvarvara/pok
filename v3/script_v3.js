// La troisième version de l'affichage dynamique des Pokémons
// Affichage d'un tableau des Pokémons par page de 25
// Une zone de détails des Pokémons qui est masquée par défaut et s’affiche, en mode “popup”
// sur un événement "clic sur la ligne d’un Pokémon

//Un survol de la miniature du Pokémon affiche l’image du Pokémon en grande taille, en mode “popup”

// Attente du chargement complet du document HTML 
document.addEventListener("DOMContentLoaded", function() {
    // récupération des éléments de la page à modifier
    const tableBody = document.getElementById("pokemonTableBody");
    const closeButton = document.getElementById("closeButton");
    const pokemonDetails = document.getElementById("pokemonDetails");

    Pokemon.import_pokemon();
    // le calcul des pages
    const pokemonsPerPage = 25;
    let currentPage = 1;
    let totalPages = Math.ceil(Object.keys(Pokemon.all_pokemons).length / pokemonsPerPage);

    function createPokemonRow(pokemon) { // créer une ligne de tableau pour un Pokémon 
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pokemon.pokemon_id}</td>
            <td>${pokemon.pokemon_name}</td>
            <td>${pokemon.generation}</td>
            <td>${pokemon.types.join(", ")}</td>
            <td>${pokemon.base_stamina}</td>
            <td>${pokemon.base_attack}</td>
            <td>${pokemon.base_defense}</td>
            <td><img src="../webp/thumbnails/${padId(pokemon.pokemon_id)}.webp" alt="${pokemon.pokemon_name}" class="pokemon-thumbnail"></td>
        `;
        row.addEventListener("click", function() { // montrer une zone de détails sur un événement "clic sur la ligne"
            showPokemonDetails(pokemon);
        });
        const thumbnail = row.querySelector(".pokemon-thumbnail"); // récupérer l'image du Pokémon dans la table
        thumbnail.addEventListener("mouseover", function() { // montrer une grande photo du Pokémon sur un survol de la miniature
            showPokemonImage(pokemon);
        });
        thumbnail.addEventListener("mouseout", function() { // masquer une grande photo en fin de survol
            hidePokemonImage();
        });

        return row;
    }

    function renderPokemonPage(page) {
        tableBody.innerHTML = "";
        const startIdx = (page - 1) * pokemonsPerPage;
        const endIdx = startIdx + pokemonsPerPage;
        const pokemons = Object.values(Pokemon.all_pokemons).slice(startIdx, endIdx);
        pokemons.forEach(pokemon => {
            const row = createPokemonRow(pokemon);
            tableBody.appendChild(row);
        });
        document.getElementById("currentPage").innerText = page;
    }

    if (!Pokemon.all_pokemons) {
        console.error("Pokemon data not found or not in the correct format.");
        return;
    }

    renderPokemonPage(currentPage);

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

    closeButton.addEventListener("click", function() {
        pokemonDetails.style.display = "none";
    });
});

function padId(id) { 
    const paddedId = String(id).padStart(3, '0');
    return paddedId;
}

function showPokemonImage(pokemon) {
    const popup = document.createElement("div");
    popup.innerHTML = `<img src="../webp/images/${padId(pokemon.pokemon_id)}.webp" alt="${pokemon.pokemon_name}" class="popup-image">`;
    popup.classList.add("popup");
    document.body.appendChild(popup);
}

function hidePokemonImage() {
    const popup = document.querySelector(".popup");
    if (popup) {
        popup.remove();
    }
}

function showPokemonDetails(pokemon) { // afficher les details
    const pokemonAttacks = pokemon.moves; // toutes les attaques
    const chargedAttacks = pokemonAttacks.filter(attackName => Attack.all_attacks[attackName].is_charged);// les attaques chargées
    const fastAttacks = pokemonAttacks.filter(attackName => !Attack.all_attacks[attackName].is_charged);// les attaques rapides

    let detailsHTML = `
        <p><b>№</b> ${pokemon.pokemon_id} ${pokemon.pokemon_name}</p>
        <p><b>Attaques Chargées :</b></p>
    `;

    chargedAttacks.forEach(attackName => {
        const attack = Attack.all_attacks[attackName];
        detailsHTML += `
        <p><span class="att"><i>${attack.name} </i></span>  E: ${attack.energy_delta} P: ${attack.power} D: ${attack.duration}</p>`;
    });

    detailsHTML += `
        <p><b>Attaques Rapides :</b></p>
    `;

    fastAttacks.forEach(attackName => {
        const attack = Attack.all_attacks[attackName];
        detailsHTML += `
        <p><span class="att"><i>${attack.name} </i></span>  E: ${attack.energy_delta} P: ${attack.power} D: ${attack.duration}</p>`;
    });

    detailsContent.innerHTML = detailsHTML;
    pokemonDetails.style.display = "block";
}


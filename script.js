document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".background-overlay").style.backgroundImage = "url('pokemon.jpg')"; 
});

function searchPokemon() {
    let name = document.getElementById("pokemonName").value.toLowerCase().trim();

    if (name === "") {
        alert("Please enter a Pokémon name.");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found! Please try another name.");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("pokemonResult").style.display = "block";
            document.getElementById("pokemonImage").src = data.sprites.other["official-artwork"].front_default;
            document.getElementById("pokemonImage").alt = data.name;
            document.getElementById("pokemonTitle").innerText = data.name.toUpperCase();
            document.getElementById("pokemonDescription").innerText = 
                `Type: ${data.types.map(type => type.type.name).join(", ")}`;

            
            document.querySelector(".background-overlay").style.backgroundImage = `url(${data.sprites.other["official-artwork"].front_default})`;
        })
        .catch(error => {
            alert(error.message);
            document.getElementById("pokemonResult").style.display = "none";
        });
}

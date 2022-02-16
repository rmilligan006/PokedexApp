/*This is the array for the pokeDex, */

const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  // Added the loadList which gets the full pokemon list.
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          //Just have this here to show that the api is properly running. Will remove eventually console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // This is where the details for the pokemon will come. Eventurally allowing to call the sprite of the pokemon
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        details.types.forEach(function (itemType) {
          item.types.push(itemType.type.name);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Explanation: created function to add within the pokemon-list items in to the ul. Which hold the items as the inner text.
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemonElement = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add(
      "list-group-item",
      "list-group-item-action",
      "text-center",
      "text-uppercase"
    );

    //adding data toggle, and a data target to trigger the modal
    listPokemonElement.setAttribute("data-toggle", "modal");
    listPokemonElement.setAttribute("data-target", "#pokemonModal");
    listPokemonElement.appendChild(button);
    pokemonList.append(listPokemon);

    //an event listener for the new button created
    buttonEventlistener(button, pokemon);
  }
  //Added a Event listener to the button.
  function buttonEventlistener(button, pokemon) {
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }
  // function that loads the details from the api and then prints the pokemon details into the console.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //modal creation!
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // here's a function to show the modal with the pokemon details.
  function showModal(pokemon) {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    //clear the pre-existing content!
    modalTitle.empty();
    modalBody.empty();

    //Adding Pokemon name to the title!!`
    let titleElement = $(
      '<h1 class="text-uppercase">' + pokemon.name + "</h1>"
    );
    modalTitle.append(titleElement);

    //here we are, creating the elements for the modal body!
    //This is for the image.
    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.src = pokemon.imageUrl;

    //This will be for the height.
    let heightElement = $("<p>" + "height: " + pokemon.height + "</p>");

    //This is for the weight;
    let weightElement = $("<p>" + "weight: " + pokemon.weight + "</p>");

    //This is for the types element.
    let typesELement = $("<p>" + "Types: " + pokemon.types + " </p>");

    //appending elements to the modalBody
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesELement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemonOne) {
    pokemonRepository.addListItem(pokemonOne);
  });
});

/* always remember to call a function after you've created it */

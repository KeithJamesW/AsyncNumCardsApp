$(function() {
    let baseURL = "https://pokeapi.co/api/v2";
  
    
    async function get_all_pokemon() {
      let data = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
      console.log(data);
    }
  
    
    async function get_three_pokemon() {
      let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
      );
      pokemonData.forEach(p => console.log(p));
    }
  
    
    async function species_call() {
      let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
      );
      let speciesData = await Promise.all(
        pokemonData.map(p => $.getJSON(p.species.url))
      );
      descriptions = speciesData.map(d => {
        let descriptionObj = d.flavor_text_entries.find(
          entry => entry.language.name === "en"
        );
        return descriptionObj
          ? descriptionObj.flavor_text
          : "No description available.";
      });
      descriptions.forEach((desc, i) => {
        console.log(`${pokemonData[i].name}: ${desc}`);
      });
    }
  
    let $btn = $("button");
    let $pokemonDiv = $("#pokemon-div");
  
    $btn.on("click", async function() {
      $pokemonDiv.empty();
      let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
      );
      let speciesData = await Promise.all(
        pokemonData.map(p => $.getJSON(p.species.url))
      );
      speciesData.forEach((d, i) => {
        let descriptionObj = d.flavor_text_entries.find(function(entry) {
          return entry.language.name === "en";
        });
        let description = descriptionObj ? descriptionObj.flavor_text : "";
        let name = pokemonData[i].name;
        let imgSrc = pokemonData[i].sprites.front_default;
        $pokemonDiv.append(makePokeCard(name, imgSrc, description));
      });
    });
  
    function makePokeCard(name, imgSrc, description) {
      return `
        <div class="card">
          <h1>${name}</h1>
          <img src=${imgSrc} />
          <p>${description}</p>
        </div>
      `;
    }
  });
  
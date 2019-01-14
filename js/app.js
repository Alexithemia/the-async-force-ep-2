window.onload = function () {
  //add listener to request button
  let reqBtn = document.getElementById('requestResourceButton');
  reqBtn.addEventListener('click', runRequest);

  function runRequest() {
    //gets data from user inputs
    let input = document.getElementById('resourceId').value;
    let type = document.getElementById('resourceType').value;

    //joins input to make url
    let url = 'https://swapi.co/api/' + type + '/' + input + '/';

    let oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListen);
    oReq.open('GET', url);
    oReq.send();

    //listener for original request
    function reqListen() {
      let contain = document.getElementById('contentContainer');
      contain.innerHTML = '';

      //error handler
      if (this.status !== 200) {
        let errorH2 = document.createElement('h2');
        contain.appendChild(errorH2);
        errorH2.innerHTML = this.responseURL + this.responseText;
        return;
      }

      //parses response text into new variable
      let response = JSON.parse(this.responseText);

      //if-else statement seperating operations depending on user input
      if (type === 'people') {

        //creating and appending new html elements with included data
        let nameh2 = document.createElement('h2');
        nameh2.innerHTML = response.name;
        contain.appendChild(nameh2);

        let genderP = document.createElement('p');
        genderP.innerHTML = 'Gender: ' + response.gender;
        contain.appendChild(genderP);

        let speciesReq = new XMLHttpRequest();
        speciesReq.addEventListener('load', setSpecies);
        speciesReq.open('GET', response.species[0]);
        speciesReq.send();

        //new xhr request for further data
        function setSpecies() {
          let speciesResponse = JSON.parse(this.responseText);
          let speciesP = document.createElement('p');
          speciesP.innerHTML = 'Species: ' + speciesResponse.name;
          contain.appendChild(speciesP);
        }

      } else if (type === 'planets') {

        //creating and appending new html elements with included data
        let nameh2 = document.createElement('h2');
        nameh2.innerHTML = response.name;
        contain.appendChild(nameh2);

        let terrainP = document.createElement('p');
        terrainP.innerHTML = 'Terrain: ' + response.terrain;
        contain.appendChild(terrainP);

        let popP = document.createElement('p');
        popP.innerHTML = 'Population: ' + response.population;
        contain.appendChild(popP);

        let filmsLi = document.createElement('li');
        filmsLi.innerHTML = 'Appeared In:'
        contain.appendChild(filmsLi);

        response.films.forEach(filmUrl => {

          //new xhr request for further data for each film
          let filmsReq = new XMLHttpRequest();
          filmsReq.addEventListener('load', setFilms);
          filmsReq.open('GET', filmUrl);
          filmsReq.send();
        });

        //creates and appends element with data for each film request
        function setFilms() {
          let filmsResponse = JSON.parse(this.responseText);
          let filmP = document.createElement('p');
          filmP.innerHTML = filmsResponse.title;
          filmsLi.appendChild(filmP);
        }

      } else if (type === 'starships') {

        //creating and appending new html elements with included data
        let nameh2 = document.createElement('h2');
        nameh2.innerHTML = response.name;
        contain.appendChild(nameh2);

        let manuP = document.createElement('p');
        manuP.innerHTML = 'Manufacturer: ' + response.manufacturer;
        contain.appendChild(manuP);

        let classP = document.createElement('p');
        classP.innerHTML = 'Class: ' + response.starship_class;
        contain.appendChild(classP);

        let filmsLi = document.createElement('li');
        filmsLi.innerHTML = 'Appeared In:'
        contain.appendChild(filmsLi);

        response.films.forEach(filmUrl => {

          //new xhr request for further data for each film
          let filmsReq = new XMLHttpRequest();
          filmsReq.addEventListener('load', setFilms);
          filmsReq.open('GET', filmUrl);
          filmsReq.send();
        });

        //creates and appends element with data for each film request
        function setFilms() {
          let filmsResponse = JSON.parse(this.responseText);
          let filmP = document.createElement('p');
          filmP.innerHTML = filmsResponse.title;
          filmsLi.appendChild(filmP);
        }
      }

    }
  }
}

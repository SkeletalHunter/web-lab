function loadJSON(data) {
  let text = '';
  text += '<p>ID: ' + data.id + '</p>';
  text += '<p>Name: ' + data.name + '</p>';
  text += '<p>Username: ' + data.username + '</p>';
  text +=
    '<p>Geo: ' + data.address.geo.lat + ', ' + data.address.geo.lng + '</p>';
  let people = document.getElementById('people-info');
  people.innerHTML = text;
  /*
        let template = document.getElementById('people-template');
        let peopleInfo = document.querySelector('#people-info');
        console.log(template);
        let clone = template.content.cloneNode(true);
        let templateId = clone.querySelector('#people-ID')
        templateId.content = data.id;
        let templateName = clone.querySelector('#people-name')
        templateName.content = data.name;
        let templateUsername = clone.querySelector('#people-username')
        templateUsername.content = data.username;
        let templateGeo = clone.querySelector('#people-geo')
        templateGeo.content = data.address.geo.lat + ', ' + data.address.geo.lng;
        peopleInfo.appendChild(clone);
    */
}

function createPeople() {
  let people = document.getElementById('people-info');
  people.innerHTML = '';
  let template = document.getElementById('people-template');
  //console.log(template);
  let preloader = document.getElementById('preloader');
  preloader.style.display = 'inline';
  setTimeout(() => {
    let item = Math.floor(Math.random() * 10 + 1);
    fetch('https://jsonplaceholder.typicode.com/users/' + item)
      .then((response) => response.json())
      .then((json) => loadJSON(json))
      .catch(function (err) {
        people.innerHTML = '<p>⚠ Что-то пошло не так</p>';
        console.log(err);
      })
      .finally(() => {
        preloader.style.display = 'none';
      });
  }, 1000);
}

window.addEventListener('load', function (event) {
  createPeople();
});

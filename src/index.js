const insta = new Instarest('localhost:8080')

let page = 1

document
  .querySelector('.pagination__back')
  .addEventListener('click', ev => getAirfields(page === 1 ? page : --page))

document
  .querySelector('.pagination__forward')
  .addEventListener('click', ev => getAirfields(++page))

getAirfields(page)

function getAirfieldHtml (airfield) {
  return `
    <div class="airfield">
      <div class="airfield__name" data-id="${airfield.ID}">${airfield.ShortName}</div>
    </div>
  `
}

function getAirfieldDetailsHtml (airfield) {
  return `
    <div class="airfield__name">Short Name: ${airfield.ShortName}</div>
    <div class="airfield__status">Name: ${airfield.Name}</div>
    <div class="airfield__region">Region: ${airfield.Region}</div>
  `
}

function showAirfield (ev) {
  getAirfield(ev.target.dataset.id)
    .then(airfield => {
      document
        .querySelector('.airfield-info').innerHTML = getAirfieldDetailsHtml(airfield)
    })
}

function getAirfield (id) {
  return insta
    .get(`/airfields/${id}`)
    .then(response => response.data)
}

function getAirfields(page = 1) {
  return insta
    .get(`/airfields/page/${page}`)
    .then(response => response.data)
    .then((airfields) => {
      document
        .querySelector('.airfields')
        .innerHTML = airfields.map(airfield => getAirfieldHtml(airfield)).join('')
  
      document
        .querySelectorAll('.airfield')
        .forEach(airfieldEl => airfieldEl.addEventListener('click', showAirfield))
  
    })
}
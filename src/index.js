// Your code here
let url = 'https://api.npoint.io/f8d1be198a18712d3f29/films/';
const listHolder = document.getElementById('films');

document.addEventListener('DOMContentLoaded', () => {
  document.getElementsByClassName('film item')[0].remove();
  fetchMovies(url);
});

function fetchMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(movies => {
      movies.forEach(movie => {
        displayMovie(movie);
      });
    });
}

function displayMovie(movie) {
  const li = document.createElement('li');
  li.style.cursor = "pointer";
  li.textContent = movie.title.toUpperCase();
  listHolder.appendChild(li);
  addClickEvent(li, movie.id);
}

function addClickEvent(li, movieId) {
  li.addEventListener('click', () => {
    fetch(`${url}${movieId}`)
      .then(res => res.json())
      .then(movie => {
        document.getElementById('buy-ticket').textContent = 'Buy Ticket';
        setUpMovieDetails(movie);
      });
  });
}

function setUpMovieDetails(childMovie) {
  const preview = document.getElementById('poster');
  preview.src = childMovie.poster;

  const movieTitle = document.querySelector('#title');
  movieTitle.textContent = childMovie.title;
  
  const movieTime = document.querySelector('#runtime');
  movieTime.textContent = `${childMovie.runtime} minutes`;

  const movieDescription = document.querySelector('#film-info');
  movieDescription.textContent = childMovie.description;

  const showTime = document.querySelector('#showtime');
  showTime.textContent = childMovie.showtime;

  const tickets = document.querySelector('#ticket-num');
  tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
}

const btn = document.getElementById('buy-ticket');

btn.addEventListener('click', function(e) {
  e.preventDefault();
  let remTickets = parseInt(document.querySelector('#ticket-num').textContent, 10);
  if (remTickets > 0) {
    document.querySelector('#ticket-num').textContent = remTickets - 1;
  } else if (remTickets === 0) {
    btn.textContent = 'Sold Out';
  }
});

'use strict';

// Implementation of task II.2.a, II.2.b
// Class used to create movie objects.
class Movie {
  constructor(title, genre, duration, details) {
    this.title = title;
    this.genre = genre;
    this.duration = duration;
    this.details = details; // complex value: object containing array and price
  }

  // Method that returns a short description of the movie.
  getDescription() {
    return `${this.title} is a ${this.genre} movie lasting ${this.duration} minutes.`;
  }

  // Method using built-in String method.
  getUppercaseTitle() {
    return this.title.toUpperCase();
  }
}

// Implementation of task II.2.a
// Create at least three objects using the Movie class.
const movie1 = new Movie('Northern Lights', 'adventure', 118, {
  actors: ['Emma Stone', 'Leo Clark'],
  price: 120,
  ageLimit: 12,
});

const movie2 = new Movie('Code Hearts', 'romance comedy', 104, {
  actors: ['Mia Jones', 'Oliver Reed'],
  price: 100,
  ageLimit: 9,
});

const movie3 = new Movie('Shadow Circuit', 'science fiction', 132, {
  actors: ['Noah Smith', 'Ella Ray'],
  price: 140,
  ageLimit: 15,
});

const movies = [movie1, movie2, movie3];

// Implementation of task II.3
// Built-in Date object used to show today's booking date.
const today = new Date();
const bookingDate = today.toLocaleDateString('en-GB');

// Implementation of task II.2.c
// Display information about the objects in the user interface.
const movieList = document.querySelector('#movieList');

let movieCards = '';

for (let i = 0; i < movies.length; i++) {
  const movie = movies[i];

  movieCards += `
    <article class="movie-card">
      <h2>${movie.getUppercaseTitle()}</h2>
      <p>${movie.getDescription()}</p>
      <p><strong>Actors:</strong> ${movie.details.actors.join(', ')}</p>
      <p><strong>Age limit:</strong> ${movie.details.ageLimit}+</p>
      <p><strong>Ticket price:</strong> ${movie.details.price} kr</p>
      <p><strong>Booking date:</strong> ${bookingDate}</p>

      <button class="book-button" data-title="${movie.title}">
        Book ticket
      </button>

      <p class="booking-message invisible"></p>
    </article>
  `;
}

movieList.innerHTML = movieCards;

// Implementation of task II.4
// Add event listeners to all booking buttons.
const buttons = document.querySelectorAll('.book-button');

for (const button of buttons) {
  button.addEventListener('click', function (event) {
    const clickedButton = event.target;
    const movieTitle = clickedButton.dataset.title;

    const card = clickedButton.parentElement;
    const message = card.querySelector('.booking-message');

    message.textContent = `Your ticket for "${movieTitle}" is now booked.`;
    message.className = 'booking-message visible';

    clickedButton.textContent = 'Booked';
    clickedButton.className = 'book-button booked';
    clickedButton.disabled = true;

    setTimeout(function () {
      message.className = 'booking-message invisible';
    }, 5000);
  });
}

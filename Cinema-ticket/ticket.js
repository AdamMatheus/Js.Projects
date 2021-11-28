const notOccupiedSeats = document.querySelectorAll('.row .seat:not(occupied)');
const movieSelectBox = document.getElementById('movie');
const count = document.getElementById('count');
const film = document.getElementById('film');
const total = document.getElementById('total');
const container = document.querySelector('.container');

window.addEventListener('load', () => {
	displayUI();
	movieRefresh();
});
const movieRefresh = () => {
	const selectedPrices = JSON.parse(localStorage.getItem('selectedPrice'));
	const selecteFilmNameIndexs = JSON.parse(localStorage.getItem('selecteFilmNameIndex'));

	updateMovieInfo(selectedPrices);
};
const displayUI = () => {
	const selectedSeatsFromStorage = JSON.parse(localStorage.getItem('selectedSeats'));
	if (selectedSeatsFromStorage !== null && selectedSeatsFromStorage.length > 0) {
		notOccupiedSeats.forEach((seat, index) => {
			if (selectedSeatsFromStorage.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}
};
movieSelectBox.addEventListener('change', (e) => {
	let price = e.target.value;
	updateMovieInfo(price);
});
const updateMovieInfo = (filmPrice) => {
	let selectedSeats = document.querySelectorAll('.row .seat.selected');

	const seatsIndexArray = [ ...selectedSeats ].map((seat) => [ ...notOccupiedSeats ].indexOf(seat));
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndexArray));

	const selectedSeatsCount = selectedSeats.length;
	count.innerText = selectedSeatsCount;
	film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split('(')[0];
	total.innerText = selectedSeatsCount * parseFloat(filmPrice);
	localStorage.setItem('selectedPrice', JSON.stringify(filmPrice));
	localStorage.setItem('selecteFilmNameIndex', JSON.stringify(movieSelectBox.selectedIndex));
};

container.addEventListener('click', (e) => {
	if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
		e.target.classList.toggle('selected');
	}
	let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
	updateMovieInfo(price);
});

const renderCountry = (data, className = '') => {
	document.getElementById('search').value = '';
	const {
		name: { common: countryName },
		region,
		capital,
		flags: { svg: countryFlag },
		population,
		languages,
		currencies
	} = data;
	const countryElm = document.querySelector('.countries');
	const htmlContent = ` 
        <div class="country ${className}">
            <img class="country__img" src="${countryFlag}" />
            <div class="country__data">
             <h3 class="country__name">${countryName}</h3>
             <h4 class="country__region">${region}</h4>
             <p class="country__row">
              <span><i class="fas fa-2x fa-landmark"></i></span>${capital}</p>
                <p class="country__row"> <span><i class="fas fa-lg fa-users"></i></span>${(+population /
					1_000_000).toFixed(1)}M People</p>
                <p class="country__row"><span><i class="fas fa-lg fa-comments"></i></span>${Object.values(
					languages
				)}</p>
                <p class="country__row"><span><i class="fas fa-lg fa-money-bill-wave"></i></span>${Object.values(
					currencies
				)[0].name} <strong>${Object.values(currencies)[0].symbol}</strong>
      </p>
    </div>
  </div>`;

	countryElm.insertAdjacentHTML('beforeend', htmlContent);
	countryElm.style.opacity = 1;
};
const showCountryAlpha = async (countryCode) => {
	try {
		const { data } = await axios(`https://restcountries.com/v3.1/alpha/${countryCode}`);
		const country = data[0];
		return country;
	} catch (error) {
		console.log(error);
	}
};
const showCountryWithNeighbors = async (countryName) => {
	const { data } = await axios(`https://restcountries.com/v3.1/name/${countryName}`);
	const countryData = data[0];
	renderCountry(countryData);

	const neighbors = data[0].borders;
	neighbors.forEach(async (border) => {
		const country = await showCountryAlpha(border);
		renderCountry(country, 'neighbor');
	});
};

var search = document.getElementById('search');
var btn = document.getElementById('srcCountry');

btn.addEventListener('submit', (e) => {
	e.preventDefault();
	let countryS = search.value.toLowerCase().trim();
	showCountryWithNeighbors(countryS);
});

countryElm.addEventListener('click', clearHtml);
function clearHtml() {
	countryElm.innerHTML = '';
}

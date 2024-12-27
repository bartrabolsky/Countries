async function displayCountryDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const countryName = urlParams.get('country');

        if (!countryName) {
            throw new Error('Country name not provided');
        }

        const response = await fetch('./CountriesData.json');
        const allCountries = await response.json();

        const country = allCountries.find(c => c.name === countryName);

        if (!country) {
            throw new Error('Country not found');
        }


        const countryDetailsSection = document.querySelector('.country-details');
        countryDetailsSection.innerHTML = `
            <div class="country-flag">
                <img src="${country.flag}" alt="${country.name} Flag" />
            </div>
            <div class="country-info">
                <h2 class="country-title">${country.name}</h2>
                <div class="country-content">
                    <ul class="left-side">
                        <li><strong>Population: </strong>${country.population.toLocaleString()}</li>
                        <li><strong>Region: </strong>${country.region}</li>
                        <li><strong>Capital: </strong>${country.capital}</li>
                    </ul>
                </div>
            </div>
        `;


        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }

    } catch (error) {
        console.error('Error loading country details:', error);

        const countryDetailsSection = document.querySelector('.country-details');
        countryDetailsSection.innerHTML = `
            <div class="error-message">
                <h2>Error loading country details</h2>
                <p>Please try again later</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', displayCountryDetails);
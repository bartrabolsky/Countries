
const dropdownWrapper = document.querySelector('.dropdown-wrapper');
const dropdownHeader = document.querySelector('.dropdown-header');
const dropdownBody = document.querySelector('.dropdown-body');
const dropdownIcon = document.querySelector('.dropdown-header .icon');

const toggleDropdown = () => {
    dropdownWrapper.classList.toggle('open');
}

const closeDropdownOnClickOutside = (event) => {
    if (!dropdownWrapper.contains(event.target)) {
        dropdownWrapper.classList.remove('open');
    }
}

async function filterCountriesByRegion(region) {
    try {
        console.log('Filtering by region:', region);

        const response = await fetch('./CountriesData.json');
        const allCountries = await response.json();
        console.log('Fetched countries:', allCountries.length);

        const countriesGrid = document.querySelector('.countries-grid');
        countriesGrid.classList.remove('no-grid');

        let filteredCountries;
        if (region === 'all') {
            filteredCountries = allCountries;
        } else {
            filteredCountries = allCountries.filter(country =>
                country.region.toLowerCase() === region.toLowerCase()
            );
        }

        console.log('Filtered countries:', filteredCountries.length);

        countriesGrid.innerHTML = '';

        if (filteredCountries.length === 0) {
            console.log('No countries found for region:', region);
            countriesGrid.classList.add('no-grid');
            return;
        }

        filteredCountries.forEach(country => {
            const countryElement = document.createElement('a');
            countryElement.href = '#';
            countryElement.className = 'country scale-effect';
            countryElement.setAttribute('data-country-name', country.name);

            countryElement.innerHTML = `
                <div class="country-flag">
                    <img src="${country.flag}" alt="${country.name} Flag" />
                </div>
                <div class="country-info">
                    <h2 class="country-title">${country.name}</h2>
                    <ul class="country-brief">
                        <li><strong>Population: </strong>${country.population.toLocaleString()}</li>
                        <li><strong>Region: </strong>${country.region}</li>
                        <li><strong>Capital: </strong>${country.capital}</li>
                    </ul>
                </div>
            `;

            countriesGrid.appendChild(countryElement);
        });

        console.log('Finished displaying countries');
    } catch (error) {
        console.error('Error in filterCountriesByRegion:', error);
    }
}


handleRegionSelect = (event) => {
    if (event.target.tagName === 'LI') {
        const selectedRegion = event.target.dataset.region;
        console.log('Selected region:', selectedRegion);

        const headerText = dropdownHeader.querySelector('span');
        headerText.textContent = event.target.textContent;

        // מוצא את כל ה-li בתוך ה-ul של הדרופדאון
        const items = dropdownBody.querySelectorAll('ul li');
        items.forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');

        filterCountriesByRegion(selectedRegion);
        dropdownWrapper.classList.remove('open');
    }
}


dropdownHeader.addEventListener('click', toggleDropdown);
document.addEventListener('click', closeDropdownOnClickOutside);
dropdownBody.addEventListener('click', handleRegionSelect);


const allRegionsOption = dropdownBody.querySelector('ul li[data-region="all"]');
if (allRegionsOption) {
    allRegionsOption.classList.add('active');
}


document.addEventListener('DOMContentLoaded', () => {
    filterCountriesByRegion('all');
});

function handleCountryClick(event) {
    event.preventDefault();

    const countryElement = event.target.closest('.country');
    if (countryElement) {
        const countryName = countryElement.getAttribute('data-country-name');
        window.location.href = `details.html?country=${encodeURIComponent(countryName)}`;
    }
}

document.querySelector('.countries-grid').addEventListener('click', handleCountryClick);
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_Zyc15vsLWME0Ezyn0SJRdTL6JLoPr05b7FKFL0hoUfqyA7hZM7EbWXAYmNtcprir";


function fetchBreeds() {
  const breedSelect = document.querySelector(".breed-select");
  const loader = document.querySelector(".loader");

  axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      const breeds = response.data;
      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error(error);
      showError();
    })
    .finally(() => {
      loader.style.display = "none";
    });
}

function fetchCatByBreed(breedId) {
  const catInfo = document.querySelector(".cat-info");
  const loader = document.querySelector(".loader");

    
    
  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      const catData = response.data[0];
      const catImage = document.createElement("img");
      catImage.src = catData.url;

      const catName = document.createElement("p");
      catName.textContent = `Breed: ${catData.breeds[0].name}`;

      const catDescription = document.createElement("p");
      catDescription.textContent = `Description: ${catData.breeds[0].description}`;

      const catTemperament = document.createElement("p");
      catTemperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;

      catInfo.innerHTML = "";
      catInfo.appendChild(catImage);
      catInfo.appendChild(catName);
      catInfo.appendChild(catDescription);
      catInfo.appendChild(catTemperament);
    })
    .catch((error) => {
      console.error(error);
      showError();
    })
    .finally(() => {
      loader.style.display = "none";
    });
}

function showError() {
  const errorElement = document.querySelector(".error");
  errorElement.style.display = "block";
}
fetchBreeds();

const breedSelect = document.querySelector(".breed-select");
breedSelect.addEventListener("change", (event) => {
  const selectedBreedId = event.target.value;
  fetchCatByBreed(selectedBreedId);
});


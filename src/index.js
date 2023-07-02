import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_Zyc15vsLWME0Ezyn0SJRdTL6JLoPr05b7FKFL0hoUfqyA7hZM7EbWXAYmNtcprir";

function fetchBreeds() {
  const breedSelect = document.querySelector(".breed-select");
 const loader = document.querySelector(".loader");
  const errorElement = document.querySelector(".error");

   loader.textContent = "Loading data, please wait...";
  loader.style.display = "block";
  breedSelect.style.display = "none";
  errorElement.style.display = "none";

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
      loader.style.display = "none";
      breedSelect.style.display = "block";
    })
    .catch((error) => {
      console.error(error);
      showError();
    });
}

function fetchCatByBreed(breedId) {
   const catInfo = document.querySelector(".cat-info");
  const loader = document.querySelector(".loader");
  const errorElement = document.querySelector(".error");

  loader.textContent = "Loading data, please wait...";
    loader.style.display = "block";
   catInfo.style.display = "none";
  errorElement.style.display = "none";

  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      const catData = response.data[0];
      const catImage = document.createElement("img");
      catImage.src = catData.url;
      catImage.style.maxWidth = "400px";

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

      loader.style.display = "none";
      catInfo.style.display = "block";
    })
   .catch((error) => {
     console.error(error);
      showError();
    clearCatInfo();
    });
}

function showError() {
  const errorElement = document.querySelector(".error");
    const loader = document.querySelector(".loader");
  loader.style.display = "none";
errorElement.textContent = "Oops! Something went wrong! Try reloading the page!";
  errorElement.style.display = "block";
}

function clearCatInfo() {
   const catInfo = document.querySelector(".cat-info");
  catInfo.innerHTML = "";
}
document.addEventListener("DOMContentLoaded", () => {
  const breedSelect = document.querySelector(".breed-select");
 const loader = document.querySelector(".loader");
  const errorElement = document.querySelector(".error");
   loader.style.display = "none";
  breedSelect.style.display = "none";
  errorElement.style.display = "none";

  fetchBreeds();
});

const breedSelect = document.querySelector(".breed-select");
breedSelect.addEventListener("change", (event) => {
  const selectedBreedId = event.target.value;
  fetchCatByBreed(selectedBreedId);
});

const search = document.querySelector("#search");

const nominationsListStore = [];

search.addEventListener('submit', (e) => {
  const loader = document.querySelector('.loader');
  const result = document.querySelector('.searchResult');
  loader.classList.add('showloader');

  setTimeout(function() {
    const searchValue = document.getElementById("searchValue").value;
    returnedMovie(searchValue)
    // searchValue.value = '';
    loader.classList.remove("showloader");
    result.classList.add("showNomination");
    console.log("message will show after 2s")
  }, 3000);
  e.preventDefault()
})

const returnedMovie = async (request) => {
  const apikey = "b90c7b67";
  const response = await fetch(`https://www.omdbapi.com/?t=${request}&apikey=${apikey}`);
  
  if (!response.ok) {
    const errorMessage = "Server error";
    return errorMessage;
  }
  
  const data = await response.json();
  console.log(data)
  displayResponse(data)
}

function displayResponse({ Title, Year, Poster, Error }) {
  const searchResultParent = document.querySelector('.searchResult');
  let searchResultChild 

  if (Error) {
    console.log("movie not found")
  } else {
    searchResultChild = `
    <div class="box">
      <div class="image">
        <img src=${Poster} alt="">
      </div>
      <div class="writeup">
        <h1>${Title}</h1>
        <p>${Year}</p>
        <button class="nominateBtn">Nominate</button>
      </div>
    </div>
    `
  }
  searchResultParent.innerHTML = searchResultChild;

  const nominateBtn = document.querySelector(".nominateBtn");
  nominateBtn.addEventListener("click", (e) => {
    const movieName = e.target.parentElement.children[0].innerText;
    addNomination(movieName)
  })
  
}



function addNomination(name) {
  const store = JSON.parse(localStorage.getItem('nomination'));
  const checkStore = store !== null ? store : [];
  const checkListForDuplicates = checkStore.includes(name);
  if (checkStore.length >= 5) {
    return console.log("Maximum amount of nomination reached")
  }

  if (checkListForDuplicates) {
    return console.log("dup found")
  }
  
  checkStore.push(name);
  localStorage.setItem('nomination', JSON.stringify(checkStore));

  updateNominationList()
}

function updateNominationList() {
  console.log("update should happen now")
}

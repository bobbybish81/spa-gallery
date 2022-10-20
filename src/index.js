import './styles/main.scss'

const imageContainer = document.querySelector('.image-container');
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search');
const option = document.querySelector('.option');

const fetchImages = async url => {
  const data = await fetch(url)
    .then(res => res.json())
  return data;
};

const images = async () => {
  const data = await fetchImages(`https://api.unsplash.com/photos/?client_id=${process.env.Access_key}`);
  data.forEach(obj => {
    const { urls, user } = obj;
    imageContainer.innerHTML += `<article class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img class="img" src="${urls.full}">
        </div>
        <div class="flip-card-back">
          <p>Creator: ${user.name}</p>
          <p>Bio: ${user.bio}</p>
          <p>Likes: ${obj.likes}</p>
        </div>
      </div>
    </article>`
  })
}

images();

let pageNum = 0;

const imageSearch = async (value) => {
  const data = await fetchImages(`https://api.unsplash.com/search/photos/?query=${value}&client_id=${process.env.Access_key}`);
  const { results } = data;
  results.forEach(obj => {
    const { urls, user } = obj;
    imageContainer.innerHTML += `<article class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img class="img" src="${urls.full}">
        </div>
        <div class="flip-card-back">
          <p>Creator: ${user.name}</p>
          <p>Bio: ${user.bio}</p>
          <p>Likes: ${obj.likes}</p>
        </div>
      </div>
    </article>`
  })
}

document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && searchInput.value) {
    localStorage.setItem(searchInput.value, searchInput.value);
    imageContainer.innerHTML = '';
    imageSearch(searchInput.value);
  }
})

let archive = [];
const allStorage = () => {
  for (let i = 0; i < localStorage.length; i++) {
    archive.push(localStorage.getItem(localStorage.key(i)));
  }
  return archive;
}

searchInput.addEventListener('click', () => {
  archive = allStorage();
  console.log('click-archive', archive);
  const dataList = document.querySelector('.data-list');
  archive.forEach(value => {
    dataList.innerHTML += `<option class="option" onClick="imageSearch(this.innerHTML)">${value}</option>`;
    dataList.style.display = 'block';
  });
}, {once: true})

window.imageSearch= imageSearch;



import './styles/main.scss'

const imageContainer = document.querySelector('.image-container');

const fetchImages = async url => {
  const data = await fetch(url)
    .then(res => res.json())
  return data;
};

const images = async () => {
  const data = await fetchImages(`https://api.unsplash.com/photos/?client_id=${process.env.Access_key}`);
  data.forEach(obj => {
    const { urls } = obj;
    console.log(urls.full)
    const img = document.createElement('img');
    img.setAttribute('src', `${urls.full}`);
    img.classList.add('img');
    imageContainer.append(img);
  })
return data;
}

images();
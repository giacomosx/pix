window.onload = () => {
    // loader();
    getPix('random').then(res => res.map(photo => createCard(photo)))
}

document.querySelector('.searchbar__button').addEventListener('click', () => {
    document.querySelectorAll('.col').forEach(col => col.remove());
    
    let query = document.querySelector('.searchbar input').value;

    getPix(query).then(res => res.map(photo => createCard(photo)))
    
})

const loader = () => {
    const loader = document.createElement('div');
    loader.classList.add('loader');

    loader.innerHTML = /* HTML */ `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
    
    document.getElementById('results').append(loader);
}

const getPix = async (query) => {
    let url = `https://api.pexels.com/v1/search?query=${query}`
    const APIKEY = 'R2M3pz0pjrO0pa5zHTD1dxngNbQ8XUgokfi2YyIiskKChv9IwtlHnT3V';
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': APIKEY
              }
        });
        const data = await response.json();
        return data.photos

    } catch (error) {
        console.log(error);
    }
}

const createCard = (photo) => {
    
    const resultsContainer = document.getElementById('results');

    const col = document.createElement('div');
    col.classList.add('col');

    const card = /* HTML */`
        <div class="card overflow-hidden ">
            <img src="${photo.src.tiny}" alt="${photo.alt}" class="object-fit-cover card-img">
            <div class="card-img-overlay bg-black text-white rounded-top-0">
                <div class="card-text top-50 position-absolute ">
                    <p>${photo.alt}</p>
                </div>
            </div>
        </div>
    `; 
    col.innerHTML = card

    resultsContainer.append(col)
}
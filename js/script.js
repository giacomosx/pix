window.onload = () => {
    loader()
    
    getPix('random') 
    .then(res => {
        console.log(res);
        document.querySelector('.spinner').remove();
        res.map(photo => createCard(photo))
    })
}

document.querySelector('.searchbar__button').addEventListener('click', () => {
    document.querySelectorAll('.col').forEach(col => col.remove());
    
    loader()
    
    let input = document.querySelector('.searchbar input').value.trim();
    let query = input !== '' ? input : 'random';
    
    getPix(query)
    .then(res => {
        document.querySelector('.spinner').remove();
        if (document.querySelector('.notFoundContainer')){
            document.querySelector('.notFoundContainer').remove();
        }

        if (res.length === 0 ) {
            notFound()
        } else {
            res.map(photo => createCard(photo))
        }
    })
    
})

const loader = () => {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = /* HTML */ `
        <div class="d-flex align-items-center justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
    
    document.querySelector('.helper-container').append(spinner);
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

const notFound = () => {
    const notFoundContainer = document.createElement('div');
    notFoundContainer.classList.add('notFoundContainer');

    notFoundContainer.innerHTML = /* HTML */ `
        <div class="alert alert-light" role="alert">
            <h4 class="alert-heading">I'm sorry!</h4>
            <p>The search has not produced results</p>
            <hr>
            <p class="mb-0">Try with another keyword.</p>
    </div>
    `;

    document.querySelector('.helper-container').append(notFoundContainer)
}
let idPhotos = [JSON.parse(localStorage.getItem('pixes'))]
console.log(idPhotos);
window.onload = () => {
    if (idPhotos[0] !== null) {
        loader()
        idPhotos.forEach(index =>
            index.forEach(photo =>
                getPix(photo.id)
                    .then(photo => {
                        if (document.querySelector('.spinner')) {
                            document.querySelector('.spinner').remove();
                        }
                        createCard(photo)
                    })
            )
        )
    } else {
        notFound();
    }
}


const getPix = async (query) => {
    let url = `https://api.pexels.com/v1/photos/${query}`
    const APIKEY = 'R2M3pz0pjrO0pa5zHTD1dxngNbQ8XUgokfi2YyIiskKChv9IwtlHnT3V';
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': APIKEY
            }
        });
        const data = await response.json();
        return data

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
                    <div class="card-img-overlay text-white rounded-top-0 p-0">
                        <div class="d-flex bottom-0 position-absolute justify-content-between w-100 px-4 py-2 card__icons align-items-end ">
                            <a role="button" class="text-white fs-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                </svg>
                            </a>
                            <a class="text-white fs-4" onclick="downloadImage('${photo.src.original}', 'image.jpeg')"><i class="bi bi-download"></i></a>
                        </div>
                        <p class="px-3 py-2 small">Ph. <a href="${photo.photographer_url}" class="text-white " target="_blank">${photo.photographer}</a></p>
                    </div>
                </div>
    `;
    col.innerHTML = card

    resultsContainer.append(col)
}

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


const downloadImage = (url, filename) => {
    fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const anchor = document.createElement('a');
            anchor.href = URL.createObjectURL(blob);
            anchor.download = filename;
            anchor.click()
        })
}

let menuItems = ['Animals', 'Nature', 'Cities', 'Flower', 'People']

menuItems.sort().forEach(item => {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    const liElement = document.createElement('li');
    liElement.innerHTML = `<a class="dropdown-item" role="button">${item}</a>` 

    dropdownMenu.append(liElement);
})

const notFound = () => {
    const notFoundContainer = document.createElement('div');
    notFoundContainer.classList.add('notFoundContainer');

    notFoundContainer.innerHTML = /* HTML */ `
        <div class="alert alert-light" role="alert">
            <h4 class="alert-heading">Ops!</h4>
            <p>You haven’t added any photos to favorites yet!</p>
    </div>
    `;

    document.querySelector('.helper-container').append(notFoundContainer)
}
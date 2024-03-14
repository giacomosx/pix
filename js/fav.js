let idPhotos = [JSON.parse(localStorage.getItem('pixes'))]

window.onload = () => {

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
}


const getPix = async (query) => {
    let url = `https://api.pexels.com/v1/photos/${query}&per_page=24`
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
                            <a role="button" class="text-white fs-4"><i class="bi bi-heart-fill"></i></a>
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
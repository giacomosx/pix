window.onload = () => {
    loader()

    getPix('random')
        .then(res => {
            console.log(res);
            res.map(photo => createCard(photo))
        })
}

document.querySelector('.searchbar__button').addEventListener('click', () => {
    document.querySelectorAll('.col').forEach(col => col.remove());

    loader();

    let input = document.querySelector('.searchbar input').value.trim();
    let query = input === '' ? 'random' : input;

    getPix(query)
        .then(res => {
            if (document.querySelector('.notFoundContainer')) {
                document.querySelector('.notFoundContainer').remove();
            }

            if (res.length === 0) {
                notFound()
            } else {
                res.map(photo => createCard(photo))
            }
        })

    document.querySelector('.searchbar input').value = '';

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
    let url = `https://api.pexels.com/v1/search?query=${query}&per_page=24`
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
    } finally {
        document.querySelector('.spinner').remove();
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
                            <a role="button" class="text-white fs-4 heart-button" onclick="saveItem(${photo.id})"><i class="bi bi-heart"></i></a>
                            <a class="text-white fs-4" onclick="downloadImage('${photo.src.original}', 'image.jpeg')"><i class="bi bi-download"></i></a>
                        </div>
                        <p class="px-3 py-2 small">Ph. <a href="${photo.photographer_url}" class="text-white " target="_blank">${photo.photographer}</a></p>
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


let temporaryStorage = []

const saveItem = (idPhoto) => {
    let photo = {
        id: idPhoto
    }
    temporaryStorage.push(photo)

    localStorage.setItem('pixes', JSON.stringify(temporaryStorage));
}
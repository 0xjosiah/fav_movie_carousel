const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('previous')
const movies = document.getElementById('movies').children
const btns = document.getElementsByClassName('cycle-btn')
const searchInput = document.getElementById('movie-search')
const queryList = document.getElementById('query-list')
const movieNames = getMovieNames(movies)
const searchBar = document.getElementById('search-bar')

function btnDown(btn) {
    btn.classList.add('btn-click')
}

function btnUp (btn) {
    btn.classList.remove('btn-click')
}

nextBtn.addEventListener('mousedown', function() {btnDown(this)})
nextBtn.addEventListener('mouseup', function() {btnUp(this)})
prevBtn.addEventListener('mousedown', function() {btnDown(this)})
prevBtn.addEventListener('mouseup', function() {btnUp(this)})

function hideAllSlides() {
    for (let movie of movies) {
        movie.classList.remove('next')
        movie.classList.remove('prev')
        movie.classList.remove('carousel-item-visible')
    }
}

let slidePosition = 0

nextBtn.addEventListener('click', function() {
    hideAllSlides()
    if (slidePosition == movies.length-1) {
        slidePosition = 0
    } else {
        slidePosition++
    }
    movies[slidePosition].classList.add('next')
})

prevBtn.addEventListener('click', function() {
    hideAllSlides()
    if (slidePosition == 0) {
        slidePosition = movies.length-1
    } else {
       slidePosition--
    } 
    movies[slidePosition].classList.add('prev')
})

function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}

function getMovieNames (obj) {
    let list = []
    for (let item of obj) {
        let altTitles = item.children[0].alt.toLowerCase()
        let title = altTitles.replace(/\b( movie poster)\b/, '')
        list.push(title)
    }
    return list
}

searchBar.addEventListener('mouseover', function () {
    searchInput.classList.add('search-field-appear')
})

searchBar.addEventListener('mouseleave', function () {
    setTimeout(function() {
        searchInput.classList.remove('search-field-appear')
        // queryList.innerHTML = ''
        // searchInput.value = ''
    }, 1000) 
})

searchInput.addEventListener('keyup', handleInput)

function handleInput (event) {
    const searchQuery = event.target.value.toLowerCase()
    let filteredMovies = movieNames.filter(movie => {
        if (searchQuery !== '') {
            return movie.includes(searchQuery)
        }
    })
    renderResults(filteredMovies)
}

function renderResults (arr) {
    queryList.innerHTML = ''
    arr.forEach(renderMovie)
}

function renderMovie (title) {
    let newListItem = document.createElement('li')
    newListItem.classList.add('query-result')
    newListItem.textContent = titleCase(title)
    queryList.appendChild(newListItem)
    const movieLinks = queryList.querySelectorAll('.query-result')
    movieLinks.forEach(link => { //shit not working
        link.addEventListener('click', () => {
            queryList.innerHTML = ''
            searchInput.value = ''
            viewQueriedMovie(link.textContent)
            searchInput.classList.remove('search-field-appear')
        })
    })
}

function viewQueriedMovie(title) {
    hideAllSlides()
    for (let i = 0; i < movieNames.length; i++) {
        if (movieNames[i].includes(title.toLowerCase())) {
            if (i > slidePosition) {
                movies[i].classList.add('next')
            } else {
                movies[i].classList.add('prev')
            }
            slidePosition = i
        }
    }
}

const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('previous')
const carouselItems = document.getElementById('carousel-items').children
const btns = document.getElementsByClassName('cycle-btn')
const searchInput = document.getElementById('search-input')
const queryList = document.getElementById('query-list')
const carouselItemNames = getCarouselItemNames(carouselItems)
const searchBar = document.getElementById('search-bar')
const openTrailerBtns = document.querySelectorAll('[data-modal-target]')
const closeModalBtns = document.querySelectorAll('[data-close-modal]')
const videoPlayers = document.querySelectorAll('.video-player')

function btnDown(btn) {
    btn.classList.add('btn-click')
    btn.children[0].style.transform = 'scale(.95)'
}

function btnUp(btn) {
    btn.classList.remove('btn-click')
    btn.children[0].style.transform = 'scale(1)'
}

nextBtn.addEventListener('mousedown', function() {btnDown(this)})
nextBtn.addEventListener('mouseup', function() {btnUp(this)})
prevBtn.addEventListener('mousedown', function() {btnDown(this)})
prevBtn.addEventListener('mouseup', function() {btnUp(this)})


function hideAllCards() {
    for (let card of carouselItems) {
        card.classList.remove('next')
        card.classList.remove('prev')
        card.classList.remove('carousel-item-visible')
        let carouselItemDescription = card.children[1]
        carouselItemDescription.classList.remove('render-carousel-item-description')
    }
}

let cardPosition = 0

nextBtn.addEventListener('click', function() {
    hideAllCards()
    if (cardPosition == carouselItems.length-1) {
        cardPosition = 0
    } else {
        cardPosition++
    }
    renderCard(cardPosition, 'next')
})

function renderCard(position, direction) {
    carouselItems[position].classList.add(direction)
    let carouselItemDescription = carouselItems[position].children[1]
    carouselItemDescription.classList.add('render-carousel-item-description')

}

prevBtn.addEventListener('click', function() {
    hideAllCards()
    if (cardPosition == 0) {
        cardPosition = carouselItems.length-1
    } else {
       cardPosition--
    } 
    renderCard(cardPosition, 'prev')
})

function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}

function getCarouselItemNames (obj) {
    let list = []
    for (let item of obj) {
        let altTitles = item.children[0].alt.toLowerCase()
        let title = altTitles.replace(/\b( poster)\b/, '')
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
    let filteredCarouselItems = carouselItemNames.filter(card => {
        if (searchQuery !== '') {
            return card.includes(searchQuery)
        }
    })
    renderResults(filteredCarouselItems)
}

function renderResults (arr) {
    queryList.innerHTML = ''
    arr.forEach(renderCarouselCard)
}

function renderCarouselCard (title) {
    let newListItem = document.createElement('li')
    newListItem.classList.add('query-result')
    newListItem.textContent = titleCase(title)
    queryList.appendChild(newListItem)
    const movieLinks = queryList.querySelectorAll('.query-result')
    movieLinks.forEach(link => { //shit not working
        link.addEventListener('click', () => {
            queryList.innerHTML = ''
            searchInput.value = ''
            viewQueriedCarouselCard(link.textContent)
            searchInput.classList.remove('search-field-appear')
        })
    })
}

function viewQueriedCarouselCard(title) {
    hideAllCards()
    for (let i = 0; i < carouselItemNames.length; i++) {
        if (carouselItemNames[i].includes(title.toLowerCase())) {
            if (i > cardPosition) {
                carouselItems[i].classList.add('next')
            } else {
                carouselItems[i].classList.add('prev')
            }
            cardPosition = i
        }
    }
}

openTrailerBtns.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
    videoPlayers.forEach(videoPlayer => {
        videoPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    })
})

window.addEventListener('keydown', (event) => {
    if(event.key == 'Escape') {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeModal(modal)
        })
        videoPlayers.forEach(videoPlayer => {
            videoPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        })
    }
})

closeModalBtns.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
        videoPlayers.forEach(videoPlayer => {
            videoPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        })
    })
})

function openModal (modal) {
    if (modal == null) return;
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal (modal) {
    if (modal == null) return;
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

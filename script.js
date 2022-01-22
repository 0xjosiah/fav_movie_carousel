const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('previous')
const movies = document.getElementById('movies').children

console.log(movies)


let count = 0
nextBtn.addEventListener('click', function() {
    if (count < 7) {
        count += 1
        movies[count-1].classList.remove('carousel-item-visible')
        movies[count].classList.add('carousel-item-visible')
    } else {
        count -= 7
        movies[count+7].classList.remove('carousel-item-visible')
        movies[count].classList.add('carousel-item-visible')
    }
})

prevBtn.addEventListener('click', function() {
    if (count > 0 && count < 8) {
        count -= 1
        movies[count+1].classList.remove('carousel-item-visible')
        movies[count].classList.add('carousel-item-visible')
    } else {
        count += 7
        movies[count].classList.add('carousel-item-visible')
        movies[count-7].classList.remove('carousel-item-visible')
    } 
})
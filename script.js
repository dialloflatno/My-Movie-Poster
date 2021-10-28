const movieInput = document.querySelector('#movie-name');
const subheadingInput = document.querySelector('#subheading-input');
const characterInput = document.querySelector('#character-names');
const imageInput = document.querySelector('#image-url');
const submitForm = document.querySelector(".comment-box");
const submitButton = document.querySelector('#submit-button');
const templateImage = document.querySelector('.template-box img');
const templateMovieName = document.querySelector('#MovieTitle');
const briefInput = document.querySelector('#movie-description');
const templateMovieSubheading = document.querySelector('#subheading');
const templateMovieCharacters = document.querySelector('#Characters');
const fontDropdown = document.querySelector('#dropDownFonts');
const colorDropdown = document.querySelector('#dropDownColors');
const posterList = document.querySelector('#poster-list');
let uploadIcon = document.querySelector('#uploadIcon');
let templateBox = document.querySelector('.template-box');

const movieJSON = {
    "title": "",
    "subheading": "",
    "characters": "",
    "img": "",
    "description": "",
    "likes": 0,
    "font": "",
    "color": "",
    "layout": ""
}

const fonts = ['Arial', 'Comic Sans MS', 'Courier New', 'Georgia', 'Helvetica', 'Impact', 'Lucida Console', 'Lucida Sans Unicode', 'Palatino Linotype', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana']
const colors = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Green', hex: '#008000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Indigo', hex: '#4B0082' },
    { name: 'Violet', hex: '#EE82EE' },
    { name: 'Black', hex: '#000000' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Maroon', hex: '#800000' },
    { name: 'Olive', hex: '#808000' },
    { name: 'Lime', hex: '#00FF00' },
    { name: 'Aqua', hex: '#00FFFF' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Purple', hex: '#800080' },
]

fonts.forEach(font => {
    const option = document.createElement('option')
    option.innerHTML = font
    option.value = font
    fontDropdown.appendChild(option)
})

colors.forEach(color => {
    const option = document.createElement('option')
    option.innerHTML = color.name
    option.value = color.hex
    colorDropdown.appendChild(option)
})

//https://image.similarpng.com/very-thumbnail/2021/06/Art-empty-frame-in-golden-on-transparent-background-PNG.png
imageInput.addEventListener('change', () => {
    templateImage.src = imageInput.value
    templateImage.width = 250
    templateImage.height = 350
    templateImage.style.zIndex = '-1'
    templateImage.style.position = 'absolute'
})

movieInput.addEventListener('keyup', () => {
    if (movieInput.value === '') templateMovieName.innerHTML = 'Movie Title'
    else {
        templateMovieName.innerHTML = movieInput.value
        templateMovieName.style.fontFamily = fontDropdown.value
    }
})

subheadingInput.addEventListener('keyup', () => {
    if (subheadingInput.value === '') templateMovieSubheading.innerHTML = 'Subheading'
    else {
        templateMovieSubheading.innerHTML = subheadingInput.value
        templateMovieSubheading.style.fontFamily = fontDropdown.value
    }
})

characterInput.addEventListener('keyup', () => {
    if (characterInput.value === '') {
        templateMovieCharacters.innerHTML = 'Character Names'
    } else {
        templateMovieCharacters.innerHTML = characterInput.value
        templateMovieCharacters.style.fontFamily = fontDropdown.value
    }
})

fontDropdown.addEventListener('change', () => {
    templateMovieName.style.fontFamily = fontDropdown.value
})

colorDropdown.addEventListener('change', () => {
    templateMovieName.style.color = colorDropdown.value
    templateMovieSubheading.style.color = colorDropdown.value
    templateMovieCharacters.style.color = colorDropdown.value
})

// prevent default submit
submitForm.addEventListener('submit', (e) => submitComments(e));

const submitComments = e => {
    e.preventDefault()
    movieJSON.title = movieInput.value
    movieJSON.subheading = subheadingInput.value
    movieJSON.characters = characterInput.value
    movieJSON.img = imageInput.value
    movieJSON.description = briefInput.value
    movieJSON.font = fontDropdown.value
    movieJSON.color = colorDropdown.value
    console.log(movieJSON)
    fetch('http://localhost:3000/moviePoster', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieJSON)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
};

const getPosters = () => {
    fetch('http://localhost:3000/moviePoster')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayPosters(data)
        })
}


const displayPosters = (data) => {
    data.forEach(poster => {
        const posterDiv = document.createElement('div')
        const posterName = document.createElement('p')
        try {
            document.querySelector('#uploadIcon').remove()
        } catch {}
        posterDiv.classList.add('poster-div')
        posterDiv.style.backgroundImage = `url(${poster.img})`
        posterDiv.style.backgroundSize = 'cover'
        posterDiv.style.backgroundPosition = 'center'
        posterDiv.style.width = '250px'
        posterDiv.style.height = '350px'
        posterDiv.style.margin = '10px'
        posterDiv.style.borderRadius = '10px'
        posterDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)'
        posterDiv.style.display = 'inline-block'
        posterDiv.style.cursor = 'pointer'
        posterName.innerText = poster.title
        posterDiv.addEventListener('click', () => {
            templateBox.style.backgroundImage = `url(${poster.img})`
            templateBox.style.backgroundSize = 'cover'
            templateBox.style.width = '250px'
            templateBox.style.height = '350px'
            templateBox.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)'
            templateBox.style.cursor = 'pointer'
            templateMovieName.innerHTML = poster.title
            templateMovieSubheading.innerHTML = poster.subheading
            templateMovieCharacters.innerHTML = poster.characters
            fontDropdown.value = poster.font
            colorDropdown.value = poster.color
        })
        posterDiv.addEventListener('mouseover', () => {
            posterDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)'
        }
        )
        posterDiv.addEventListener('mouseout', () => {
            posterDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.1)'
        })
        posterList.append(posterDiv, posterName)
    })
}

getPosters();

const colors = [

    "White",
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Indigo",
    "Violet",
    "Black",
    "Gray",
    "Silver",
    "Maroon",
    "Olive",
    "Lime",
    "Aqua",
    "Teal",
    "Navy",
    "Purple",
]
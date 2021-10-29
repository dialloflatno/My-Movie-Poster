// DECLARE NEEDED VARIABLES AND GRAB ELEMENTS TO WORK FROM
const movieInput = document.querySelector('#movie-name');
const subheadingInput = document.querySelector('#subheading-input');
const characterInput = document.querySelector('#character-names');
const producerInput = document.querySelector('#producer-name');
const imageInput = document.querySelector('#image-url');
const submitForm = document.querySelector(".comment-box");
const submitButton = document.querySelector('#submit-button');
const templateImage = document.querySelector('.template-box img');
const briefInput = document.querySelector('#movie-description');
const templateMovieName = document.querySelector('#template-title');
const templateMovieSubheading = document.querySelector('#template-sub');
const templateMovieCharacters = document.querySelector('#template-char');
const templateMovieProducer = document.querySelector('#template-producer');
const fontDropdown = document.querySelector('#dropDownFonts');
const colorDropdown = document.querySelector('#dropDownColors');
const posterList = document.querySelector('#poster-list');
const displayImage = document.querySelector('.display-box img');
const displayMovieName = document.querySelector('#display-title');
const displayMovieSubheading = document.querySelector('#display-sub');
const displayMovieCharacters = document.querySelector('#display-char');
const displayMovieProducer = document.querySelector('#display-producer');
const displayMovieBrief = document.querySelector('#display-brief span');
const displayMovieBriefTitle = document.querySelector('#display-brief-title');
const likeButton = document.querySelector("#like-bttn")
const likesNum = document.querySelector("#like-num")
const layoutOptions = document.querySelectorAll(".layout-box")
const completedLikes = [];
const layouts = [];
const posterListElements = [];
let currentDisplay = 0;
let uploadIcon = document.querySelector('#uploadIcon');
let templateBox = document.querySelector('.template-box');
let displayBox = document.querySelector('.display-box');

// TEMPLATE FOR DATABASE POST REQUESTS
const movieJSON = {
    "title": "",
    "subheading": "",
    "characters": "",
    "producer": "",
    "img": "",
    "description": "",
    "likes": 0,
    "font": "",
    "color": "",
    "layout": ""
}

// SET FONT AND COLOR OPTIONS FOR DROP-DOWN MENUS
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

// LOAD DROP-DOWN MENUS WITH OPTIONS
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

layoutOptions.forEach(layout => layout.addEventListener("click", () => {
    const layoutChoice = event.target.parentNode.id.slice(7) - 1;
    movieJSON.layout = parseInt(event.target.parentNode.id.slice(7));
    templateMovieName.style.top = layouts[layoutChoice]["style-title"]
    templateMovieSubheading.style.top = layouts[layoutChoice]["style-sub"]
    templateMovieCharacters.style.top = layouts[layoutChoice]["style-char"]
    templateMovieProducer.style.top = layouts[layoutChoice]["style-producer"]
}))

// ADD NECESSARY EVENT LISTENERS TO THE DOCUMENT
imageInput.addEventListener('change', () => {
    // templateImage.src = imageInput.value
    templateBox.style.backgroundImage = `url('${imageInput.value}')`
    templateBox.style.backgroundSize = 'cover'
    // templateImage.width = 250
    // templateImage.height = 350
    // templateImage.style.zIndex = '-1'
    // templateImage.style.position = 'absolute'
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
        // templateMovieSubheading.style.fontFamily = fontDropdown.value
    }
})

characterInput.addEventListener('keyup', () => {
    if (characterInput.value === '') {
        templateMovieCharacters.innerHTML = 'Character Names'
    } else {
        templateMovieCharacters.innerHTML = characterInput.value
        // templateMovieCharacters.style.fontFamily = fontDropdown.value
    }
})

producerInput.addEventListener('keyup', () => {
    if (producerInput.value === '') {
        templateMovieProducer.innerHTML = 'Producer'
    } else {
        templateMovieProducer.innerHTML = producerInput.value
        // templateMovieProducer.style.fontFamily = fontDropdown.value
    }
})

fontDropdown.addEventListener('change', () => {
    templateMovieName.style.fontFamily = fontDropdown.value
})

colorDropdown.addEventListener('change', () => {
    templateMovieName.style.color = colorDropdown.value
    templateMovieSubheading.style.color = colorDropdown.value
    templateMovieCharacters.style.color = colorDropdown.value
    templateMovieProducer.style.color = colorDropdown.value
})

submitForm.addEventListener('submit', (e) => submitComments(e));

likeButton.addEventListener('click', () => {
    console.log(event.target.src)
    if (event.target.src.endsWith('FULL.png')) {
        event.target.src = './assets/likeButtonheart_EMPTY.png'
        fetch(`http://localhost:3000/moviePoster/${currentDisplay}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "likes": parseInt(likesNum.innerText) - 1
            })
        })
        likesNum.innerText = parseInt(likesNum.innerText) - 1
        document.querySelector(`#id-${currentDisplay}`).liked = false;
        document.querySelector(`#id-${currentDisplay}`).likes = likesNum.innerText;
        console.log(document.querySelector(`#id-${currentDisplay}`).likes);
    } else {
        event.target.src = 'assets/likeButtonheart_FULL.png'
        fetch(`http://localhost:3000/moviePoster/${currentDisplay}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "likes": parseInt(likesNum.innerText) + 1
            })
        })
        likesNum.innerText = parseInt(likesNum.innerText) + 1
        document.querySelector(`#id-${currentDisplay}`).liked = true;
        document.querySelector(`#id-${currentDisplay}`).likes = likesNum.innerText;
        console.log(document.querySelector(`#id-${currentDisplay}`).likes);
    }
})

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

async function initialize() {
    const getPosters = () => {
        fetch('http://localhost:3000/moviePoster')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                // displayPosters(data)
                data.forEach(object => displayPosters(object))
            })
    }
    const getLayouts = () => {
        fetch('http://localhost:3000/layouts')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                data.forEach(layout => layouts.push(layout))
                posterListElements[0].click()
            })
    }
    getPosters()
    getLayouts()
}


const displayPosters = (poster) => {
    // data.forEach(poster => {
    const posterDiv = document.createElement('div')
    const posterName = document.createElement('p')
    posterDiv.classList.add('poster-div')
    posterDiv.id = `id-${poster.id}`
    posterDiv.style.backgroundImage = `url(${poster.img})`
    posterDiv.style.backgroundSize = 'cover'
    posterDiv.style.backgroundPosition = 'center'
    posterDiv.style.width = '250px'
    posterDiv.style.height = '350px'
    posterDiv.style.margin = '10px'
    posterDiv.style.marginright = '20px;'
    posterDiv.style.borderRadius = '10px'
    posterDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)'
    posterDiv.style.display = 'inline-block'
    posterDiv.style.cursor = 'pointer'
    posterDiv.liked = false;
    posterDiv.likes = poster.likes;
    // console.log(poster.id, poster.likes)
    posterName.innerText = poster.title
    posterDiv.addEventListener('click', () => {
        displayBox.style.backgroundImage = `url(${poster.img})`
        displayBox.style.backgroundSize = 'cover'
        displayBox.style.width = '250px'
        displayBox.style.height = '350px'
        displayBox.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)'
        displayBox.style.cursor = 'pointer'
        displayMovieName.innerHTML = poster.title
        displayMovieSubheading.innerHTML = poster.subheading
        displayMovieCharacters.innerHTML = poster.characters
        displayMovieProducer.innerHTML = poster.producer
        displayMovieBrief.textContent = poster.description
        displayMovieBriefTitle.textContent = poster.title
        displayMovieName.style.color = poster.color
        displayMovieName.style.fontFamily = poster.font
        displayMovieSubheading.style.color = poster.color
        displayMovieCharacters.style.color = poster.color
        displayMovieProducer.style.color = poster.color
        fontDropdown.value = poster.font
        colorDropdown.value = poster.color
        currentDisplay = poster.id;
        likesNum.innerText = posterDiv.likes;

        displayMovieName.style.top = layouts[poster.layout - 1]["style-title"]
        displayMovieSubheading.style.top = layouts[poster.layout - 1]["style-sub"]
        displayMovieCharacters.style.top = layouts[poster.layout - 1]["style-char"]
        displayMovieProducer.style.top = layouts[poster.layout - 1]["style-producer"]

        if (posterDiv.liked === true) likeButton.src = "./assets/likeButtonheart_FULL.png"
        else likeButton.src = "./assets/likeButtonheart_EMPTY.png"
    })
    posterDiv.addEventListener('mouseover', () => {
        posterDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)'
    }
    )
    posterDiv.addEventListener('mouseout', () => {
        posterDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.1)'
    })
    posterList.append(posterDiv, posterName)
    posterListElements.push(posterDiv)
}

initialize();

    // posterListElements[0].click()
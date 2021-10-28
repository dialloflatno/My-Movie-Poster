const movieInput = document.querySelector('#movie-name');
const subheadingInput = document.querySelector('#subheading-input');
const characterInput = document.querySelector('#character-names');
const imageInput = document.querySelector('#image-url');
const submitButton = document.querySelector('#submit-button');
const templateImage = document.querySelector('.template-box img');
const templateMovieName = document.querySelector('#MovieTitle');
const briefInput = document.querySelector('#movie_description');
const templateMovieSubheading = document.querySelector('#subheading');
const templateMovieCharacters = document.querySelector('#Characters');
const fontDropdown = document.querySelector('#dropDownFonts');
const colorDropdown = document.querySelector('#dropDownColors');

const fonts = ['Arial', 'Comic Sans MS', 'Courier New', 'Georgia', 'Helvetica', 'Impact', 'Lucida Console', 'Lucida Sans Unicode', 'Palatino Linotype', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana']
const colors = [
    {name: 'White', hex: '#FFFFFF'},
    {name: 'Red', hex: '#FF0000'},
    {name: 'Orange', hex: '#FFA500'},
    {name: 'Yellow', hex: '#FFFF00'},
    {name: 'Green', hex: '#008000'},
    {name: 'Blue', hex: '#0000FF'},
    {name: 'Indigo', hex: '#4B0082'},
    {name: 'Violet', hex: '#EE82EE'},
    {name: 'Black', hex: '#000000'},
    {name: 'Gray', hex: '#808080'},
    {name: 'Silver', hex: '#C0C0C0'},
    {name: 'Maroon', hex: '#800000'},
    {name: 'Olive', hex: '#808000'},
    {name: 'Lime', hex: '#00FF00'},
    {name: 'Aqua', hex: '#00FFFF'},
    {name: 'Teal', hex: '#008080'},
    {name: 'Navy', hex: '#000080'},
    {name: 'Purple', hex: '#800080'},
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
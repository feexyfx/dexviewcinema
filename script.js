// Sample movie data
const movies = {
    'now-showing': [
        {
            title: 'The Dark Knight',
            genre: 'Action, Crime, Drama',
            rating: '9.0/10',
            synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
            image: 'voi'
        },
        {
            title: 'Inception',
            genre: 'Action, Sci-Fi, Thriller',
            rating: '8.8/10',
            synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
            image: 'https://source.unsplash.com/400x600/?movie,sci-fi'
        },
        {
            title: 'The Matrix',
            genre: 'Action, Sci-Fi',
            rating: '8.7/10',
            synopsis: 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.',
            image: 'https://source.unsplash.com/400x600/?movie,matrix'
        }
    ],
    'coming-soon': [
        {
            title: 'Dune: Part Two',
            genre: 'Action, Adventure, Sci-Fi',
            rating: 'Coming Soon',
            synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
            image: 'https://source.unsplash.com/400x600/?movie,dune'
        },
        {
            title: 'Deadpool & Wolverine',
            genre: 'Action, Adventure, Comedy',
            rating: 'Coming Soon',
            synopsis: 'Wade Wilson and Logan team up for an epic adventure that will change the Marvel Cinematic Universe forever.',
            image: 'https://source.unsplash.com/400x600/?movie,superhero'
        }
    ]
};

// Hero Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideInterval = 5000; // 5 seconds per slide
let slideTimer;

function fadeOut(element) {
    element.style.opacity = 1;
    
    (function fade() {
        if ((element.style.opacity -= .1) < 0) {
            element.style.display = 'none';
            element.classList.remove('active');
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = 'block';
    element.classList.add('active');

    (function fade() {
        let val = parseFloat(element.style.opacity);
        if (!((val += .1) > 1)) {
            element.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

function nextSlide() {
    fadeOut(slides[currentSlide]);
    currentSlide = (currentSlide + 1) % slides.length;
    setTimeout(() => fadeIn(slides[currentSlide]), 500);
}

function startSlideshow() {
    if (slideTimer) {
        clearInterval(slideTimer);
    }
    slideTimer = setInterval(nextSlide, slideInterval);
}

// Movie Cards rendering
function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="genre">${movie.genre}</div>
                <div class="rating">${movie.rating}</div>
                <div class="synopsis">${movie.synopsis}</div>
            </div>
        </div>
    `;
}

function renderMovies(category) {
    const moviesGrid = document.querySelector('.movies-grid');
    moviesGrid.innerHTML = movies[category].map(createMovieCard).join('');
}

// Category Toggle functionality
const toggleButtons = document.querySelectorAll('.toggle-btn');
const movieCards = document.querySelectorAll('.movie-card');

function showMovies(category) {
    movieCards.forEach(card => {
        if (category === 'now-showing') {
            if (card.classList.contains('coming-soon')) {
                card.classList.remove('show');
            } else {
                card.classList.add('show');
            }
        } else {
            if (card.classList.contains('coming-soon')) {
                card.classList.add('show');
            } else {
                card.classList.remove('show');
            }
        }
    });
}

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        showMovies(button.dataset.category);
    });
});

// Hamburger Menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const activeCategory = document.querySelector('.toggle-btn.active').dataset.category;
    const filteredMovies = movies[activeCategory].filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.genre.toLowerCase().includes(searchTerm)
    );
    
    const moviesGrid = document.querySelector('.movies-grid');
    moviesGrid.innerHTML = filteredMovies.map(createMovieCard).join('');
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    showMovies('now-showing');
    // Show first slide
    slides[0].style.opacity = 1;
    slides[0].style.display = 'block';
    slides[0].classList.add('active');
    // Start the slideshow
    startSlideshow();
}); 
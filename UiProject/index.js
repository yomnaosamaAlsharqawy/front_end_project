const sliders = document.querySelector(".carouselbox")
var scrollPerClick;
var ImagePadding = 20;

showMoviesData();


var scrollAmount = 0;
function sliderScrollLeft(){
    sliders.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth"
    });
    if (scrollAmount < 0){
        scrollAmount = 0;
    }
    console.log("Scroll Amount: ", scrollAmount);
}

function sliderScrollRight() {
    if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth){
        sliders.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth"
        });
    }
    console.log("Scroll Amount: ", scrollAmount);
}




//for Dynamic content
async function showMoviesData(){
    const api_key = "e7dd4890b7b87ca63bd3309d8d96c90f"
     //for sample
     /*
    var result = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key="+
        api_key +
        "&sort_by=popularity.desc"
    );
    */
   var result = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key="+
    api_key +
    "&sort_by=popularity.desc"
);
result= await result.json();
    result = result.results;
    result.map(function(cur,index){
        sliders.insertAdjacentHTML(
            "beforeend",
            `<img class="img-${index} slider-img" src="http://image.tmdb.org/t/p/w185/${cur.poster_path}" /> `
        );
    });
    scrollPerClick = document.querySelector(".img-1").clientWidth + 120;
}
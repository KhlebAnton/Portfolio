const slider = document.getElementById('slider');
slider.innerHTML = '';
let works = [];
let visibleSlide = 2;



fetch('./works/works.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (let key in data) {
            let title = data[key].title;
            let urlPreview = data[key].preview;
            let desc = data[key].description;
            let link = data[key].link;

            let slideWorks = `
            <div class="slide">
                <div class="preview-img">
                    <img src="${urlPreview}" alt="${title}">
                </div>
                <div class="description-group">
                    <div class="title-slide">${title}</div>
                    <div class="desc-slide">${desc}</div>
                    <div class="btn link-slide" onclick='window.open("${link}")'>Открыть</div>
                </div>
                
            </div>
        `;
            
            slider.innerHTML += slideWorks;
        }

        processWorks();
    });

function processWorks() {
    works = slider.querySelectorAll('.slide');
    works[0].classList.add('zoom');
}



function nextSlide() {
    let lenSlider = slider.childElementCount;
    let zoomSlide = slider.querySelector('.zoom');
    let prevSlided = slider.querySelector('.prev-slide');

    if(zoomSlide !== works[lenSlider - 1]) {
        if(prevSlided) {
            prevSlided.classList.remove('prev-slide')
        }
        zoomSlide.classList.remove('zoom');
        zoomSlide.classList.add('prev-slide');
        zoomSlide.nextElementSibling.classList.add('zoom')
    }   

}
function prevSlide() {
    let lenSlider = slider.childElementCount;
    let zoomSlide = slider.querySelector('.zoom');
    let prevSlided = slider.querySelector('.prev-slide');

    if(zoomSlide !== works[0]) {
        if(prevSlided) {
            prevSlided.classList.remove('prev-slide')
        }
        zoomSlide.classList.remove('zoom');
        prevSlided.classList.add('zoom');
        if(prevSlided.previousElementSibling) {
            prevSlided.previousElementSibling.classList.add('prev-slide')
        }
        
    }   

}


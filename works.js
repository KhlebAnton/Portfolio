const worksSection = document.getElementById('works');

let works = null;
fetch('./works/works.json')
.then((response) => { return response.json();})
.then((data) => {
    works = data;
    addWorks();
});
let worksContainer = document.querySelector('.works-container');
function addWorks() {
    let count = 0;
    works.forEach(work => {
        if(count != 4) {
            let newWork = document.createElement('div');
        newWork.classList.add('work-item');
        newWork.addEventListener('click', ()=> {
            window.location.href = `./works.html?id=${work.id}`
        })
        newWork.innerHTML = `
        <img loading="lazy" src='${work.preview}'>
        <h3 class='work-title'>${work.title}</h3>
        `

        worksContainer.appendChild(newWork);
        count ++;
        }

        
    });
}
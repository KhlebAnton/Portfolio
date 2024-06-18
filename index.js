const loader = document.querySelector('.loader');
const navBar = document.querySelector('.header');
const sideBar = document.querySelector('.side-links');

window.addEventListener('load', () => {
    setTimeout(() => {
        navBar.style.top = "0";
        sideBar.style.left = '0';
        loader.classList.add('hidden');
        setTimeout(() => {
            smallInterface.classList.remove('hidden');
        }, 1000);

        openSection('home');
        addTalk('Привет!', true);
        addChoise([{ data: 'who', text: 'Ты кто??' }, { data: 'hello', text: 'Эм, привет..' }]);

    }, 2000)


});


setTimeout(() => {
    navBar.style.top = `-${navBar.clientHeight}px`;
    document.addEventListener('mousemove', function (event) {
        const y = event.clientY;
        if (y <= window.innerHeight * 0.1) {
            navBar.style.top = "0";
        } else {
            navBar.style.top = `-${navBar.clientHeight}px`;
        }
    });

    sideBar.style.left = `-${sideBar.clientWidth - sideBar.clientWidth * 0.1}px`;
    document.addEventListener('mousemove', function (event) {
        const x = event.clientX;
        if (x <= window.innerWidth * 0.1) {
            sideBar.style.left = "0";
        } else {
            sideBar.style.left = `-${sideBar.clientWidth - sideBar.clientWidth * 0.1}px`;
        }
    });
}, 5000);

const arraySections = document.querySelectorAll('.section-slide');
function openSection(idSection) {
    arraySections.forEach((item) => {
        item.classList.remove('visible')
    })
    let section = document.getElementById(idSection);
    section.classList.add('visible');
}

const choiseGroup = document.querySelector('.choise-group');
const talkGroup = document.querySelector('.talk-group');
const iconTalk = document.querySelector('.talk-icon');


function selectChoise(choise) {
    let arrChoises = document.querySelectorAll('.choice');
    arrChoises.forEach((choise) => choise.remove());
    addTalk(choise.textContent, false);
    setTimeout(() => { iconTalk.classList.remove('no-name') }, 2000)

    switch (choise.getAttribute("data-choise")) {
        case 'who':
            addTalk('Ой, извини, видимо коммуникатор барахлит. Секунду.. Ах да! Меня Антон зовут.', true);
            addChoise([{ data: 'ha-ha', text: 'Ха, коммуникатор..' }, { data: 'about', text: 'Привет, Антон. Ну и что дальше?' }]);
            break;
        case 'ha-ha':
            addTalk('Смейся давай, ага. Быстро тогда про всё тут расскажу, наверху навигация по сайту, слева плашка связь со мной. Посмотри работы, свяжись со мной. Пока!', true);

            break;
        case 'about':
            addTalk('Я разработчик сайтов, тут можешь посмотреть мои работы и связаться со мной. Сверху навигация, слева способы связи. Просто наведи мышкой к краям.', true);
            addChoise([{ data: 'Bye', text: 'Посмотрю' }, { data: 'AI', text: 'А ты получается ИИ?' }]);
            break;
        case 'Bye':
            addTalk('Способы связи выбирай любой, во вкладке "контакты" ссылки на гит и тому подобное. Счастливо!', true);

            break;
        case 'AI':
            addTalk('Нет, я просто несколько строчек кода, посмотри подробнее мой код на Гите, ссылку я оставил во вкладке "Контакты". А теперь мне пора, Счастливо!', true);

            break;
        case 'hello':
            addTalk('Видимо что-то со связью, пару секунд. Извини, что не представился. Меня Антон зовут.', true);
            addChoise([{ data: 'about', text: 'Антон, ну и кто ты?' }]);
            break;
        default:
            break;
    }
}

function addTalk(string, bool) {
    let stroke = document.createElement('p');
    stroke.classList.add((bool) ? 'talk' : 'talk-me');
    stroke.innerHTML = string;
    if (bool) {
        printText();
        setTimeout(() => { talkGroup.append(stroke) }, 2000);
    } else {
        talkGroup.append(stroke);
    }

}

const interface = document.getElementById('interface');
const smallInterface = document.getElementById('interface-small');
function toggleInterface() {
    interface.classList.toggle('hidden');
    smallInterface.classList.toggle('hidden');

    let lastMsg = interface.querySelector('.talk-group').lastChild.textContent;
    smallInterface.querySelector('.talk-group').textContent = lastMsg;

    let bgUrl = interface.querySelector('.bg-icon').style.backgroundImage;
    smallInterface.querySelector('.bg-icon').style.backgroundImage = bgUrl;

    let iconUrl = interface.querySelector('.talk-icon').style.backgroundImage;
    smallInterface.querySelector('.talk-icon').style.backgroundImage = iconUrl;
    if (!interface.querySelector('.talk-icon').classList.contains('no-name')) {
        smallInterface.querySelector('.talk-icon').classList.remove('no-name')
    }
}

function addChoise(array) {
    array.forEach((choise) => {
        let choiseElem = document.createElement('div');
        choiseElem.classList.add('hidden');
        choiseElem.classList.add('choice');

        choiseElem.setAttribute('onclick', 'selectChoise(this)');
        choiseElem.setAttribute('data-choise', choise.data);
        choiseElem.innerHTML = choise.text;
        setTimeout(() => { choiseElem.classList.remove('hidden') }, 2000)
        choiseGroup.append(choiseElem);
    })
};


function printText() {
    let stroke = document.createElement('p');
    stroke.classList.add('print-text');
    stroke.innerHTML = 'набирает сообщение..';
    talkGroup.append(stroke);
    setTimeout(() => {
        stroke.remove();
    }, 2000)
}

let iconArray = [
    { bg: 'bg_foto_1.jpg', icon: 'talk_1.gif' },
    { bg: 'bg_foto_2.jpg', icon: 'talk_2.gif' },
    { bg: 'bg_foto_3.jpg', icon: 'talk_3.gif' },
    { bg: 'bg_foto_4.jpg', icon: 'talk_4.gif' },

];
let count = 3;

const bgIcon = document.querySelector('.bg-icon');
const talkIcon = document.querySelector('.talk-icon');
function changeIcon() {
    if (count < 3) {
        bgIcon.setAttribute('style', `background-image: url('./img/bg-noise.5d8fd24c.webp')`);
        // talkIcon.setAttribute('style', `background-image:'')`);
        talkIcon.classList.add('no-name');
        setTimeout(() => {
            bgIcon.setAttribute('style', `background-image: url('./img/${iconArray[count].bg}')`);
            talkIcon.setAttribute('style', `background-image: url('./img/${iconArray[count].icon}')`);
        }, 500);
        setTimeout(() => { talkIcon.classList.remove('no-name'); }, 1000);

        count++
    } else {
        count = 0;
        bgIcon.setAttribute('style', `background-image: url('./img/bg-noise.5d8fd24c.webp')`);
        // talkIcon.setAttribute('style', `background-image: '`);
        talkIcon.classList.add('no-name');
        setTimeout(() => {
            bgIcon.setAttribute('style', `background-image: url('./img/${iconArray[0].bg}')`);
            talkIcon.setAttribute('style', `background-image: url('./img/${iconArray[0].icon}')`);
        }, 500);
        setTimeout(() => { talkIcon.classList.remove('no-name'); }, 1000);
    }
}



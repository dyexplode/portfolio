const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('#menu');
const navItemList = document.querySelectorAll('.nav-item a');
const selectBody = document.querySelector('body');
const selectHideMenu = document.querySelector('.shadow');
//console.dir(selectBody);
function toggleMenu() {
  hamburger.classList.toggle('open');
  navList.classList.toggle('open-menu');
  selectBody.classList.toggle('block-scroll-body');
  selectHideMenu.classList.toggle('draw');
}

//function to close context menu
function closeMenu(){
  hamburger.classList.remove('open');
  navList.classList.remove('open-menu');
  selectBody.classList.remove('block-scroll-body');
  selectHideMenu.classList.remove('draw');
}

hamburger.addEventListener('click', toggleMenu);
navItemList.forEach(element => element.addEventListener('click', closeMenu));



//portfolio-part3 variable;
const portfolioImages = document.querySelectorAll('.portfolio-image');
const portfolioBtns = document.querySelector('.portfolio-container');
const btn = document.querySelectorAll('.button-port');


//portfolio-part3 code

//function to change image in section portfolio
// and draw button in header this section
function changeImage(event) {
 // if press a button
  if (event.target.classList.contains('button-port')){
    //remove active class in all button this section
    btn.forEach(b => b.classList.remove('button-black-active'));
    //change image
    portfolioImages.forEach((img, index) => img.src = `assets/img/portfolio-items/${event.target.dataset.season}/${index + 1}.jpg`);
    //draw active button
    event.target.classList.add('button-black-active');
  };
 
}
//add event listener on container button portfolio
portfolioBtns.addEventListener('click', changeImage);

//function to cache images from website
function preloadImages(seasons){
  seasons.forEach((value) => {
    for (let i = 1; i < 7; i++){
      const img = new Image();
      img.src = `assets/img/portfolio-items/${value}/${i}.jpg`;
    };
  });
  
  
};

const seasons = ['winter', 'spring', 'summer', 'autumn'];
//run cached with timeout 3 seconds
setTimeout(preloadImages(seasons),3000);

//############################################################
//translate page
//############################################################
import i18Obj from "./translate.js";

const selectLangList = document.querySelectorAll('.switch-lng-item');
const selectTranslateList = document.querySelectorAll('[data-i18]');

function doTranslate(languageCode){
  selectLangList.forEach((item) => {(item.firstChild.dataset.language === languageCode)?item.firstChild.classList.add('gold'):item.firstChild.classList.remove('gold')});
  selectTranslateList.forEach((tag) => {
    if (tag.placeholder){
      tag.placeholder = i18Obj[languageCode][tag.dataset.i18];
      tag.textContent = '';
    }else{
      tag.textContent = i18Obj[languageCode][tag.dataset.i18];
    };
  });
}

function getTranslate(event){
  selectLangList.forEach((item) => {item.firstChild.classList.remove('gold')});
  event.target.classList.add('gold');
  //selectTranslateList.forEach((item) => {item.textContent = i18Obj[event.target.dataset.language][item.dataset.i18]});
  doTranslate(event.target.dataset.language);
  localStorage.setItem('languagePage', event.target.dataset.language);
};

selectLangList.forEach((item) => item.addEventListener('click', getTranslate));
const selectTitle = document.querySelectorAll('.section-title');


function doSwitchThemeTo(theme){
  if (theme === 'moon') {
    selectTitle.forEach(tag => {tag.classList.remove('select-title-dark')});
    selectTitle.forEach(tag => {tag.classList.add('select-title-light')});
    selectThemeSwitcher.firstElementChild.classList.remove('moon');
    selectThemeSwitcher.firstElementChild.classList.add('sun');
    selectChangeTheme.forEach((tag) => {
      tag.classList.remove('dark');
      tag.classList.add('light');
    });
    btn.forEach(
      (button) => {
        button.classList.remove('button-black-dark');
        button.classList.add('button-black-light');
      });

  }else{
    selectTitle.forEach(tag => {tag.classList.add('select-title-dark')});
    selectTitle.forEach(tag => {tag.classList.remove('select-title-light')});
    selectThemeSwitcher.firstElementChild.classList.remove('sun');
    selectThemeSwitcher.firstElementChild.classList.add('moon');
    selectChangeTheme.forEach((tag) => {
      tag.classList.remove('light');
      tag.classList.add('dark');
    });
    btn.forEach(
      (button) => {
        button.classList.remove('button-black-light');
        button.classList.add('button-black-dark');
      });
  }
  localStorage.setItem('themeType', theme);
}



function getSwitchTheme(event){
  if (event.target.classList.contains('moon')) {
    doSwitchThemeTo('moon');
  }else{
    doSwitchThemeTo('sun');
  }
}


const selectThemeSwitcher = document.querySelector('.theme-switcher');
selectThemeSwitcher.addEventListener('click', getSwitchTheme);

const selectChangeTheme = document.querySelectorAll('.change-theme');

function doRestoreThemeType(){
  const theme = localStorage.getItem('themeType');
  doSwitchThemeTo(!!theme?theme:'moon');
}

function doRestoreLanguagePage(){
  const language = localStorage.getItem('languagePage');
  doTranslate(!!language?language:'en');
}

doRestoreThemeType();
doRestoreLanguagePage();
//###########################################################
// Add specially effects for buttons
//###########################################################
//select list of button object to transform style
const coolButton = document.querySelectorAll('.ripple');

//for each item in selected buttons addition self listener
coolButton.forEach(item => item.addEventListener('click', function (e) {
  //coordinates of mouse-click on brawser window start 
  const x = e.clientX
  const y = e.clientY

  //calculate coordinates of button element on brawser window
  const buttonPositionShell = e.target.getBoundingClientRect();
  //read coordinates of button element on brawser window
  const buttonTop = buttonPositionShell.y;
  const buttonLeft = buttonPositionShell.x;

  //calculate relative coordinate to create new object cirkle
  const xInside = x - buttonLeft;
  const yInside = y - buttonTop;
  //create cirkle and add self property
  const circle = document.createElement('span');
  circle.classList.add('circle');
  circle.style.top = yInside + 'px';
  circle.style.left = xInside + 'px';

  //draw element
  this.appendChild(circle);
  //remove this circle element after timeout
  setTimeout(() => circle.remove(), 500);
})
);



/*

console.log(`Доброго времени суток!!!\n
\tTotal score [+85 / +85]\n
\t В случае наличия значительных замечаний, прошу связаться со мной: discord: dyexplde   ;) 

    Вёрстка соответствует макету. Ширина экрана 768px +48
[x] блок <header> +6
[x] секция hero +6
[x] (элементы (блоки с изоображением и текстом) расположенные с правой стороны
    на 5px не совпадают с макетом располагаясь левее,
     не выравнивал, т.к. считаю что это из-за кривизны макета, к томуже находится в пределах допуска +/- 10px) секция skills +6
[x] секция portfolio +6
[x] секция video +6
[x] секция price +6
[x] секция contacts +6
[x] блок <footer> +6

    Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
[x] нет полосы прокрутки при ширине страницы от 1440рх до 768рх +5
[x] нет полосы прокрутки при ширине страницы от 768рх до 480рх +5
[x] нет полосы прокрутки при ширине страницы от 480рх до 320рх +5

    На ширине экрана 768рх и меньше реализовано адаптивное меню +22
[x] при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2
[x] при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4
[x] высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4
[x] при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4
[x] бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2
[x] ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2
[x] при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4`);
*/
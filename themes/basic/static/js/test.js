const btn = document.querySelector('.button');
  btn.addEventListener('click', () => {
    document.body.textContent = 'Hello World!';
  });
  if (document.querySelector('#slots')) {
    fetch('/slots/index.json')
      .then((response) => response.json())
      .then((slots) => {
        localStorage.setItem('slots', JSON.stringify(slots.data));
      });

    let container = document.querySelector('#slots');
    let loadMoreBtn = document.querySelector('.load-more-js');

    let initialItems = 28;
    let loadItems = 10;

    function loadInitialItems() {
      let slots = JSON.parse(localStorage.getItem('slots'));
      // console.log(books);
      let out = '';
      let counter = 0;
      for (let slot of slots) {
        if (counter < initialItems) {
          out += `
        <div class="slot-item">
      <a href="${slot.permalink}" class="item-head">
        <span class="item-logo">
          <amp-img  src="${slot.image}"
            src="${slot.image}" title="${slot.name}" alt="${slot.name}"
            width="162" height="126" data-loaded="true"></amp-img>
        </span>
        <span class="item-title">${slot.name}</span>
      </a>
      <div class="item-params">
        <div class="param-row">
          <div class="param-name">${slot.linesTitle}:</div>
          <div class="param-value">${slot.lines}</div>
        </div>
        <div class="param-row">
          <div class="param-name">${slot.reelsTitle}:</div>
          <div class="param-value">${slot.reels}</div>
        </div>
        <div class="param-row">
          <div class="param-name">${slot.freeSpinTitle}:</div>
          <div class="param-value">${slot.freeSpin}</div>
        </div>
      </div>
    </div>
        `;
        }
        counter++;
      }

      container.insertAdjacentHTML('afterbegin', out);
    }

    loadInitialItems();

    loadMoreBtn.addEventListener('click', loadData);

    function loadData() {
      let slots = JSON.parse(localStorage.getItem('slots'));
      let currentDisplayedItems = document.querySelectorAll('.slot-item').length;
      let out = '';
      let counter = 0;
      for (let slot of slots) {
        if (counter >= currentDisplayedItems && counter < loadItems + currentDisplayedItems) {
          out += `
        <div class="slot-item">
      <a href="${slot.permalink}" class="item-head">
        <span class="item-logo">
          <amp-img  src="${slot.image}"
            src="${slot.image}" title="${slot.name}" alt="${slot.name}"
            width="162" height="126" data-loaded="true"></amp-img>
        </span>
        <span class="item-title">${slot.name}</span>
      </a>
      <div class="item-params">
        <div class="param-row">
          <div class="param-name">${slot.linesTitle}:</div>
          <div class="param-value">${slot.lines}</div>
        </div>
        <div class="param-row">
          <div class="param-name">${slot.reelsTitle}:</div>
          <div class="param-value">${slot.reels}</div>
        </div>
        <div class="param-row">
          <div class="param-name">${slot.freeSpinTitle}:</div>
          <div class="param-value">${slot.freeSpin}</div>
        </div>
      </div>
    </div>
        `;
        }
        counter++;
      }
      container.insertAdjacentHTML('beforeend', out);
      container.style.opacity = 0;

      if (document.querySelectorAll('.slot-item').length == slots.length) {
        loadMoreBtn.style.display = 'none';
      }

      fadeIn(container);
    }

    function fadeIn(out) {
      let opacity = 0;
      let interval = setInterval(function () {
        if (opacity <= 1) {
          opacity = opacity + 0.1;
          out.style.opacity = opacity;
        } else {
          clearInterval(interval);
        }
      }, 30);
    }
  }

   const tpl = `<ol class="toc-list">
  {contents}
</ol>`;
let contents = '';
const elHeaders = document.querySelectorAll('h2');
elHeaders.forEach((el, index) => {
if (!el.id) {
el.id = `id-${index}`;
}
const url = `${location.href.split('#')[0]}#${el.id}`;
contents += `<li><span data-anchor="#${el.id}">
    <amp-img alt="✅" class="menu_emoji" width="16" height="16" src="/images/ficons/icons/svg/1828/1828614.svg">
    </amp-img>${el.textContent}
  </span></li>`;
});
if (document.querySelector('#page-navigation')) {
document
.querySelector('#page-navigation')
.insertAdjacentHTML('afterbegin', tpl.replace('{contents}', contents));
} 
const tpl = `<ol class="toc-list">
  {{contents}}
</ol>`;
let contents = '';
const elHeaders = document.querySelectorAll('h2');
elHeaders.forEach((el, index) => {
  if (!el.id) {
    el.id = `id-${index}`;
  }
  const url = `${location.href.split('#')[0]}#${el.id}`;
  contents += `<li><span data-anchor="#${el.id}"><img alt="✅" class="menu_emoji" width="16" height="16"
  data-src="/images/ficons/icons/svg/1828/1828614.svg">${el.textContent}</span></li>`;
});
if (document.querySelector('#page-navigation')) {
  document
    .querySelector('#page-navigation')
    .insertAdjacentHTML('afterbegin', tpl.replace('{{contents}}', contents));
}

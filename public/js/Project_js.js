function changeImage() {
  let images = ['1.JPG', '2.JPG'];
  let element = document.getElementById('avatar');
  let path = element.src.split('/');
  let name = path[path.length - 1];
  let index = images.indexOf(name);
  index = index == 0 ? 1 : 0;
  let root = 'img/';
  element.src = root + images[index];
}
const findLoadTime = function () {
  document.getElementsByClassName('page-loaded-result')[0].innerText =
    (window.performance.timing.loadEventStart -
      window.performance.timing.navigationStart) /
    1000;
};
window.addEventListener('load', (event) => {
  findLoadTime();
});
window.addEventListener('load', function (event) {
  var href = window.location.href;
  var links = document.getElementsByClassName('footer-link');
  for (var i = 0; i < links.length; i++) {
    var linkHref = links[i].href;
    if (linkHref == href) {
      links[i].style.textDecoration = 'underline';
    }
  }
});

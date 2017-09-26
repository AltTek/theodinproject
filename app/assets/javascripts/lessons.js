var markerClasses = [
  'primary',
  'coffee',
  'whitish-grey',
  'light-grey',
  'greyish-brown'
];

function getElements(selector) {
  return document.querySelectorAll(selector);
}

function kebabCase(text) {
  return text.toLowerCase().match(/\w+/g).join('-');
}

function setTargetForExternalLinks() {
  getElements('.lesson-content a[href^=http]').forEach(function (externalLink) {
    externalLink.setAttribute('target', '_blank');
  });
}

function navigationElement(markerClass, headingText) {
  return (
    '<div class="lesson-navigation__item">' +
    '<div class="lesson-navigation__line lesson-navigation__line--' + markerClass + '"></div>' +
    '<div class="line"></div>' +
    '<div class="lesson-navigation__title">' +
    '<a class="grey" href="#' + kebabCase(headingText) + '" data-turbolinks="false">' + headingText +
    '</a></div></div>'
  );
}

function lessonNavigationLinks(headings) {
  return headings.map(function (heading, index) {
    var markerClass = markerClasses[index % markerClasses.length];
    return navigationElement(markerClass, heading);
  }).join('');
}

function constructLessonNavigation() {
  var headingElements = getElements('.lesson-content h3');
  var headings = Array.prototype.slice.call(headingElements).map(function(heading) {
    return heading.innerText;
  });

  var lessonNavigationLinksHTML = lessonNavigationLinks(headings);
  var lessonNavigation = document.querySelector('.lesson-navigation');
  lessonNavigation.innerHTML = lessonNavigationLinksHTML;
  Stickyfill.add(lessonNavigation);

}

function lessonPage() {
  return document.querySelector('.lesson') !== null;
}

document.addEventListener('turbolinks:load', function() {
  if (!lessonPage()) return;

  setTargetForExternalLinks();
  constructLessonNavigation();
});

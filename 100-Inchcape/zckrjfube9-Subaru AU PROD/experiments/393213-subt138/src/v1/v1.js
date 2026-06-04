/* eslint-disable import/extensions */
/* eslint-disable max-len */
import kamSubt138Config from '../assets/kamSubt138Config.js';
import kamSubt138InsertMarkup from '../assets/kamSubt138InsertMarkup.js';
import kamSubt138InitCarousel from '../assets/kamSubt138InitCarousel.js';

function kamSubt138Init([searchBarContent]) {
    document.body.classList.add('kamSubt138');

    kamSubt138InsertMarkup(searchBarContent);
    kamSubt138InitCarousel();
}

Kameleoon.API.Core.runWhenElementPresent(
    kamSubt138Config.selectors.searchBarContent,
    kamSubt138Init
);

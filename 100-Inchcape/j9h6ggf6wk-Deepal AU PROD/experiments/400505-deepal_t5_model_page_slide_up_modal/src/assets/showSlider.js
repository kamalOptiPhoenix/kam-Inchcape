import { generateSliderHTML } from './config.js';
import kamT5DeepalProcessGoal from './kamT5DeepalProcessGoal.js';

export default function showSlider(model) {
    if (sessionStorage.getItem('t5ModalShown') === null) {
        const sliderHTML = generateSliderHTML(model);
        document.body.insertAdjacentHTML('beforeend', sliderHTML);

        setTimeout(() => {
            document.body.classList.add('t5-slide-up-animation');
            sessionStorage.setItem('t5ModalShown', true);
        }, 500);

        console.log('*** Modal_pageviews goal triggered for T5 ***');
        kamT5DeepalProcessGoal('Modal pageviews T5');
    }
}

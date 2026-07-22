export default function kamT69InitCarSelection() {
    const headline = document.querySelector('h1.header.q-headline.q-rte-container');
    const row = headline ? headline.closest('.row') : null;

    if (row) {
        row.classList.add('pcat69-flex-row');
        row.style.display = 'flex';
    }

    const carBoxes = document.querySelectorAll(
        '.row .small-12.medium-3.columns'
    );

    let selectedCar = null;

    carBoxes.forEach((box) => {
        const cb = box.querySelector('.pcat69-checkbox');
        if (cb) {
            cb.checked = false;
            box.classList.remove('pcat69-selected');
        }
    });

    carBoxes.forEach((box) => {
        if (box.dataset.pcatInit) return;
        box.dataset.pcatInit = 'true';

        box.classList.add('pcat69-car-box');
        box.style.cursor = 'pointer';

        const ctaBtn = box.querySelector(
            'a.q-button.button.primary.q-mod.q-mod-button-link.stat-button-link.center.analytics'
        );

        const teaserBottom = box.querySelector('.q-teaser-bottom');

        if (!ctaBtn || !teaserBottom) return;

        const checkboxWrap = document.createElement('label');
        checkboxWrap.className = 'pcat69-checkbox-wrap';
        checkboxWrap.innerHTML = `
            <input type="checkbox" class="pcat69-checkbox">
            <span class="pcat69-checkbox-custom">
                <svg class="pcat69-checkmark" width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.06223 8.07869C3.96094 8.18052 3.82281 8.2374 3.67927 8.2374C3.53573 8.2374 3.3976 8.18052 3.29631 8.07869L0.238063 5.0199C-0.0793542 4.70248 -0.0793542 4.1879 0.238063 3.87102L0.621021 3.48806C0.938438 3.17065 1.45248 3.17065 1.7699 3.48806L3.67927 5.39744L8.83865 0.238063C9.15606 -0.0793542 9.67065 -0.0793542 9.98752 0.238063L10.3705 0.621021C10.6879 0.938438 10.6879 1.45302 10.3705 1.7699L4.06223 8.07869Z" fill="white"/>
                </svg>
            </span>
            <span class="pcat69-checkbox-label">Download</span>
        `;

        teaserBottom.insertAdjacentElement('afterend', checkboxWrap);

        const checkbox = checkboxWrap.querySelector('.pcat69-checkbox');

        function deselectAll() {
            document.querySelectorAll('.pcat69-car-box').forEach((b) => {
                b.classList.remove('pcat69-selected');
                const boxCheckbox = b.querySelector('.pcat69-checkbox');
                if (boxCheckbox) boxCheckbox.checked = false;
            });
            selectedCar = null;
        }

        function selectCar() {
            deselectAll();
            box.classList.add('pcat69-selected');
            checkbox.checked = true;
            selectedCar = box;
        }

        function deselectCar() {
            box.classList.remove('pcat69-selected');
            checkbox.checked = false;
            selectedCar = null;
        }

        function fakeClickCTA() {
            const modalSubmitted = sessionStorage.getItem('T56ModalSubmitter') === 'true';

            if (modalSubmitted) {
                ctaBtn.click();
            } else {
                const syntheticClick = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                ctaBtn.dispatchEvent(syntheticClick);
            }
        }

        Kameleoon.API.Utils.addEventListener(box, 'click', (e) => {
            if (e.target.closest('a.q-button')) return;

            if (e.target.matches('input')) {
                e.preventDefault();
            }

            if (selectedCar === box) {
                deselectCar();
                return;
            }

            selectCar();
            fakeClickCTA();
        });
    });

    const cars = document.querySelectorAll(
        '.q-grid-container.grid-bg-transparent.q-margin-large.grid-full-width:last-child .row .small-12.medium-3.columns.pcat69-car-box:last-child'
    );

    const lastCar = cars[cars.length - 1];

    if (lastCar) {
        lastCar.style.opacity = '0';
        lastCar.style.visibility = 'hidden';
    }
}

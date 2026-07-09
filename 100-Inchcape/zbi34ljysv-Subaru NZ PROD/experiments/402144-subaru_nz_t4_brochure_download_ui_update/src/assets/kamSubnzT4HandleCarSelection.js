export default function kamSubnzT4HandleCarSelection() {
    const form = document.querySelector('form.webform-submission-form');
    if (!form) return;

    const placeholder = form.querySelector('.step-2-placeholder');
    const step2Form = form.querySelector('.step-2-form');
    const step2Container = form.querySelector('.step-2-container');
    const brochureCards = form.querySelectorAll('.brochure-card');
    const cardCheckboxes = form.querySelectorAll('.brochure-checkbox');
    const selectionInstruction = form.querySelector('.brochure-selection-instruction');
    const readyInstruction = form.querySelector('.brochure-ready-instruction');

    function hasSelectedCars() {
        return Array.from(cardCheckboxes).some((checkbox) => {
            const isCountryBrochure = checkbox.dataset.isCountryBrochure === 'true';
            return checkbox.checked && !isCountryBrochure;
        });
    }

    function isCountryBrochureSelected() {
        return Array.from(cardCheckboxes).some((checkbox) => {
            const isCountryBrochure = checkbox.dataset.isCountryBrochure === 'true';
            return checkbox.checked && isCountryBrochure;
        });
    }

    function downloadCountryBrochure(card) {
        const pdfLink = card.dataset.pdfLink;
        if (pdfLink) {
            const link = document.createElement('a');
            link.href = pdfLink;
            link.download = '';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    function hasAnySelection() {
        return Array.from(cardCheckboxes).some((checkbox) => checkbox.checked);
    }

    function updateFormVisibility() {
        const hasCarsSelected = hasSelectedCars();
        const hasAny = hasAnySelection();

        if (hasCarsSelected) {
            if (placeholder) {
                placeholder.classList.add('subnzt4-hidden');
            }
            if (step2Form) {
                step2Form.classList.remove('subnzt4-hidden');
            }
        } else {
            if (placeholder) {
                placeholder.classList.remove('subnzt4-hidden');
            }
            if (step2Form) {
                step2Form.classList.add('subnzt4-hidden');
            }
        }

        if (selectionInstruction) {
            if (hasAny) {
                selectionInstruction.classList.add('subnzt4-hidden');
            } else {
                selectionInstruction.classList.remove('subnzt4-hidden');
            }
        }

        if (readyInstruction) {
            if (hasCarsSelected) {
                readyInstruction.classList.remove('subnzt4-hidden');
            } else {
                readyInstruction.classList.add('subnzt4-hidden');
            }
        }

        if (step2Container) {
            if (hasCarsSelected) {
                step2Container.classList.remove('subnzt4-mobile-hidden');
            } else {
                step2Container.classList.add('subnzt4-mobile-hidden');
            }
        }
    }

    function syncWithFormCheckbox(cardCheckbox) {
        const modelId = cardCheckbox.dataset.modelId;
        if (modelId) {
            const formCheckbox = form.querySelector(`#edit-select-models-${modelId}`);
            if (formCheckbox) {
                formCheckbox.checked = cardCheckbox.checked;
                formCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    }

    function updateCardState(card, isSelected) {
        if (isSelected) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    }

    brochureCards.forEach((card) => {
        const checkbox = card.querySelector('.brochure-checkbox');
        if (!checkbox) return;

        const isCountryBrochure = card.dataset.isCountryBrochure === 'true';

        Kameleoon.API.Utils.addEventListener(card, 'click', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
                return;
            }

            checkbox.checked = !checkbox.checked;
            updateCardState(card, checkbox.checked);

            if (isCountryBrochure && checkbox.checked) {
                downloadCountryBrochure(card);
            }

            if (!isCountryBrochure) {
                syncWithFormCheckbox(checkbox);
            }

            updateFormVisibility();
        });

        Kameleoon.API.Utils.addEventListener(checkbox, 'change', (e) => {
            updateCardState(card, e.target.checked);

            if (isCountryBrochure && e.target.checked) {
                downloadCountryBrochure(card);
            }

            if (!isCountryBrochure) {
                syncWithFormCheckbox(checkbox);
            }

            updateFormVisibility();
        });

        if (checkbox.checked) {
            updateCardState(card, true);
        }
    });

    updateFormVisibility();
}

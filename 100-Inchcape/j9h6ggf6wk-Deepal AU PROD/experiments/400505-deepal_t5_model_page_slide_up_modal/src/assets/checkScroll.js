import showSlider from './showSlider.js';

function detectCarModel() {
    const designElement = document.getElementById('tecnologiaVehiculos_Design');
    const interiorElement = document.getElementById('tecnologiaVehiculos_Interior');

    if (designElement) return { element: designElement, model: 'S07' };
    if (interiorElement) return { element: interiorElement, model: 'E07' };

    return null;
}

export default function checkScroll() {
    const result = detectCarModel();

    if (result) {
        const rect = result.element.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
            showSlider(result.model);
            window.removeEventListener('scroll', checkScroll);
        }
    } else {
        console.log('Neither Design nor Interior section found on this page.');
    }
}

export default function kamSubnzT7ModalHtml() {
    const leadCaptureModal = `<div class="lead-capture-overlay" id="leadCaptureModal">
<div class="lead-capture-modal">
<div class="lead-capture-modal-img">
<img src="//cdn.optimizely.com/img/15841360337/d5a100adb2c646e398a44aa9f0025f1e.png" alt="car-img" />
</div>
  <div class="lead-capture-modal-form">
  <div class="lead-capture-modal-form-content">
    <h2>Lets get some details</h2>
    <p class="desktop-only">Enter your first name and email address to receive Subaru news, special offers and promotions direct to your inbox.</p>
    <p class="mob-only">Please enter your first name and email address to receive Subaru news, special offers and promotions direct to your inbox.</p>
    <div id="leadCaptureForm">
    
    <div class="form-actions">
      <button type="button" id="skipButton">Skip</button>
      <button id="lead-capture-SubmitButton">Submit</button>
    </div>
    </div>
  <div id="skipConfirmation" class="skip-confirm hidden">
    <div class="skip-message">
      <p>Don't miss out! Enter your details to receive Subaru news, special offers and promotions.</p>
      <button id="skipAnyway">Skip Anyway</button>
    </div>
  </div>
  </div>
</div>

</div>
</div>`;

    document.querySelectorAll('#leadCaptureModal').forEach((el) => el.remove());
    document.body.insertAdjacentHTML('afterbegin', leadCaptureModal);
}

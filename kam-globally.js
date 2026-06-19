console.log('*** Kameleoon Global Code ***');

const KameleoonglobalGoals = {
  'Configurator Completions': 420077,
  // 'Contact Details Captured': 420078,
};

function push_API_only(eventName) {
  window.optimizely = window.optimizely || [];

  console.log(
    '%c *** Optimizely Event Fired ***',
    'background:#fff;color:#000',
    eventName
  );

  window.optimizely.push({
    type: 'event',
    eventName,
  });
}

function processGoal(goalName) {
  const goalId = KameleoonglobalGoals[goalName];

  if (
    goalId &&
    typeof Kameleoon !== 'undefined' &&
    Kameleoon.API?.Goals?.processConversion
  ) {
    Kameleoon.API.Goals.processConversion(goalId);

    console.log(
      '%c *** Kameleoon Goal Processed ***',
      'background:#fff;color:#000',
      goalName,
      goalId
    );
  } 
}

(function configuratorTracking() {
  function initGoalsConfigurator() {
    if (window.__subaruConfiguratorTrackingBound) return;

    window.__subaruConfiguratorTrackingBound = true;

    console.log('*** Kameleoon Configurator Tracking Code ***');

    let summaryFlag = true;
    let contactDetailsCaptured = true;

    window.addEventListener('scroll', () => {
     

      const summarySection = document.querySelector('#customise_summary');

     
      if (!summarySection) return;

      setTimeout(() => {
        const rect = summarySection.getBoundingClientRect();

        const headerOnScreen =
          rect.top < window.innerHeight &&
          rect.bottom >= 0;

        

        if (headerOnScreen) {
          if (summaryFlag) {
            summaryFlag = false;


            processGoal('Configurator Completions');
            push_API_only('OPTI_Configurator_Completions');
          }

          if (
            contactDetailsCaptured &&
            sessionStorage.getItem('T37EmailCollected') !== null
          ) {
            contactDetailsCaptured = false;

            

            // processGoal('Contact Details Captured');
            push_API_only('Contact_Details_Captured');
          }
        }
      }, 3000);
    });

    document.addEventListener(
      'click',
      (event) => {
        const checkoutButton = event.target.closest(
          'button[data-test="customise:summary:continuetocheckoutv4"]'
        );

        if (!checkoutButton) return;

       

        processGoal('Configurator Completions');
        push_API_only('OPTI_Configurator_Completions');

        if (
          sessionStorage.getItem('T37EmailCollected') !== null
        ) {
          

          // processGoal('Contact Details Captured');
          push_API_only('Contact_Details_Captured');
        }
      },
      true
    );
  }

  if (
    window.location.pathname.includes('/configure') &&
    typeof Kameleoon !== 'undefined'
  ) {
    Kameleoon.API.Core.runWhenConditionTrue(
      () => typeof window.jQuery === 'function',
      () => {
      
        initGoalsConfigurator();
      }
    );
  }
})();


	

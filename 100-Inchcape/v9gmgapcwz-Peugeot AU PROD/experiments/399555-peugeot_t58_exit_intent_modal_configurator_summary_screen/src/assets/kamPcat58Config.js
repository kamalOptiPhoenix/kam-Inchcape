/* eslint-disable no-console */
import { goals } from '../../goals.js';
import kamPcat58DealerUrls from './kamPcat58DealerUrls.js';

function kamPcat58ProcessGoal(goalName) {
    const goalId = goals[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}

function kamPcat58NormalizeDealerName(name) {
    return name.toLowerCase()
        .replace(/\binchcape\b/g, '')
        .replace(/\bpeugeot\b/g, '')
        .replace(/\bcitroen\b/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function kamPcat58ResolveDealerKey(rawDealerName) {
    if (!rawDealerName) {
        return null;
    }

    const trimmed = rawDealerName.trim();
    if (!trimmed || trimmed === 'DEALER NAME') {
        return null;
    }

    if (kamPcat58DealerUrls[trimmed]) {
        return trimmed;
    }

    const normalizedRaw = kamPcat58NormalizeDealerName(trimmed);
    const mappedDealerNames = Object.keys(kamPcat58DealerUrls);

    for (let i = 0; i < mappedDealerNames.length; i += 1) {
        const mappedDealerName = mappedDealerNames[i];
        const normalizedKey = kamPcat58NormalizeDealerName(mappedDealerName);
        if (normalizedRaw === normalizedKey) {
            return mappedDealerName;
        }
    }

    for (let i = 0; i < mappedDealerNames.length; i += 1) {
        const mappedDealerName = mappedDealerNames[i];
        if (trimmed.includes(mappedDealerName) || mappedDealerName.includes(trimmed)) {
            return mappedDealerName;
        }
    }

    for (let i = 0; i < mappedDealerNames.length; i += 1) {
        const mappedDealerName = mappedDealerNames[i];
        const normalizedKey = kamPcat58NormalizeDealerName(mappedDealerName);
        if (normalizedRaw.includes(normalizedKey) || normalizedKey.includes(normalizedRaw)) {
            return mappedDealerName;
        }
    }

    return null;
}

const kamPcat58Config = {
    dealerUrls: kamPcat58DealerUrls,

    getDealerName: () => {
        const dealerNameElement = document.querySelector('.dealerDetails h3.trimDetailsTitle span#js-dealerName');
        if (dealerNameElement) {
            const dealerName = dealerNameElement.textContent.trim();
            const resolvedKey = kamPcat58ResolveDealerKey(dealerName);
            if (resolvedKey) {
                return resolvedKey;
            }
            return dealerName;
        }
        return 'DEALER NAME';
    },

    getModelName: () => {
        const modelElement = document.querySelector('.trimDetailsSecondaryColumn .trimDetailsTitle');
        if (modelElement) {
            let modelName = modelElement.textContent.trim();
            if (modelName.toLowerCase().startsWith('your ')) {
                modelName = modelName.substring(5);
            }
            return modelName;
        }
        return 'model name';
    },

    getDealerContactInfo: () => {
        const phoneElement = document.querySelector('#js-dealerPhone');
        const addressElement = document.querySelector('#js-dealerAddress');
        const hoursElement = document.querySelector('#js-dealerSalesWeekdayTitle');

        return {
            phone: phoneElement ? phoneElement.textContent.trim() : '',
            address: addressElement ? addressElement.textContent.trim() : '',
            hours: hoursElement ? hoursElement.innerHTML.trim() : '',
        };
    },

    modalHtml: () => `
        <div class="PCAT58_customModal">
            <div class="PCAT58_backdrop"></div>
            <div class="PCAT58_modalBody">
                <div class="PCAT58_closeBtn">
                    <img src="//cdn.optimizely.com/img/15841360337/5b9e42997d3644e29dae58c356f5fde5.svg" alt="Close" class="PCAT58_closeIcon" />
                </div>
                <div class="PCAT58_modalContent">
                    <div class="PCAT58_contentLeft">
                        <h2 class="PCAT58_title">ANYTHING <span class="PCAT58_dealerName">DEALER NAME</span> CAN HELP YOU WITH?</h2>
                        <p class="PCAT58_subtitle">Have any specific questions about the <span class="PCAT58_modelName">model name</span> you would like to know?</p>
                        <div class="PCAT58_contactInfo"></div>
                        <div class="PCAT58_buttons">
                            <a href="https://www.peugeot.com.au/tools/enquiry.html" target="_blank" class="PCAT58_primaryBtn">I'VE GOT A QUESTION</a>
                        </div>
                    </div>
                    <div class="PCAT58_contentRight"></div>
                </div>
            </div>
        </div>
    `,

    modalCloseEvent: () => {
        window.jQuery(document).on('click', '.PCAT58_backdrop', () => {
            kamPcat58Config.closeModal();
        });

        window.jQuery(document).on('click', '.PCAT58_closeBtn', () => {
            kamPcat58Config.closeModal();
        });

        window.jQuery(document).on('keydown', (event) => {
            if (event.key === 'Escape' && window.jQuery('.PCAT58_customModal').hasClass('PCAT58_Show')) {
                kamPcat58Config.closeModal();
            }
        });

        window.jQuery(document).on('click', '.PCAT58_primaryBtn', () => {
            kamPcat58ProcessGoal('Primary CTA click T58');
            kamPcat58Config.closeModal();
        });

        window.jQuery(document).on('click', '.PCAT58_secondaryBtn', () => {
            kamPcat58ProcessGoal('Check Stock Availability CTA clicks T58');
        });
    },

    displayModalTriggerEvents: () => {
        if (window.innerWidth < 768) {
            kamPcat58Config.mobileScrollEvent();
        } else {
            document.addEventListener('mouseout', (event) => {
                if (!event.relatedTarget && !event.toElement && event.clientY <= 10) {
                    kamPcat58Config.viewModal();
                }
            });
        }
    },

    mobileScrollEvent: () => {
        window.onscroll = function kamPcat58OnScroll() {
            if (sessionStorage.getItem('scrolledHalfDoc') === null) {
                sessionStorage.setItem('scrolledHalfDoc', 'false');
            }

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight,
            );

            if (this.oldScroll > this.scrollY) {
                if (sessionStorage.getItem('scrolledHalfDoc') === 'true') {
                    kamPcat58Config.viewModal();
                }
            } else if (scrollTop > documentHeight / 2) {
                sessionStorage.setItem('scrolledHalfDoc', 'true');
            }
            this.oldScroll = this.scrollY;
        };
    },

    viewModal: () => {
        if (sessionStorage.getItem('PCAT58_PopupOpen') === null) {
            kamPcat58Config.updateModalContent();
            window.jQuery('.PCAT58_customModal').addClass('PCAT58_Show');
            window.jQuery('body').addClass('PCAT58_modalShowNoScroll');
            sessionStorage.setItem('PCAT58_PopupOpen', 'true');
            kamPcat58Config.hidePodiumBubble();
            console.log('*** T58 Modal Appearances goal triggered');
            kamPcat58ProcessGoal('Modal Appearances T58');
        }
    },

    updateModalContent: () => {
        const dealerName = kamPcat58Config.getDealerName();
        const modelName = kamPcat58Config.getModelName();
        const dealerData = kamPcat58Config.dealerUrls[dealerName];
        const stockUrl = dealerData ? dealerData.url : null;
        const mapImage = dealerData ? dealerData.mapImage : '';
        const hasStockUrl = stockUrl !== null;
        const contactInfo = kamPcat58Config.getDealerContactInfo();

        window.jQuery('.PCAT58_dealerName').text(dealerName);
        window.jQuery('.PCAT58_modelName').text(modelName);

        const contactInfoContainer = window.jQuery('.PCAT58_contactInfo');
        contactInfoContainer.empty();

        if (contactInfo.phone) {
            contactInfoContainer.append(`
                <div class="PCAT58_contactItem">
                    <div class="PCAT58_icon">
                        <svg aria-hidden="true" class="iconSvg iconSvgPhone">
                            <use xlink:href="#icon-phone"></use>
                        </svg>
                    </div>
                    <div class="PCAT58_contactText">
                         ${contactInfo.phone}
                    </div>
                </div>
            `);
        }

        if (contactInfo.address) {
            contactInfoContainer.append(`
                <div class="PCAT58_contactItem">
                    <div class="PCAT58_icon">
                        <svg aria-hidden="true" class="iconSvg iconSvgLocation">
                            <use xlink:href="#icon-location"></use>
                        </svg>
                    </div>
                    <div class="PCAT58_contactText">
                        ${contactInfo.address}
                    </div>
                </div>
            `);
        }

        if (contactInfo.hours) {
            contactInfoContainer.append(`
                <div class="PCAT58_contactItem">
                    <div class="PCAT58_icon">
                        <svg aria-hidden="true" class="iconSvg iconSvgHours">
                            <use xlink:href="#icon-build-sm-hours"></use>
                        </svg>
                    </div>
                    <div class="PCAT58_contactText">
                         ${contactInfo.hours}
                    </div>
                </div>
            `);
        }

        const buttonsContainer = window.jQuery('.PCAT58_buttons');
        const primaryBtn = buttonsContainer.find('.PCAT58_primaryBtn');

        buttonsContainer.find('.PCAT58_secondaryBtn').remove();

        if (hasStockUrl) {
            primaryBtn.after(`<a href="${stockUrl}" target="_blank" class="PCAT58_secondaryBtn">CHECK STOCK AVAILABILITY</a>`);
        }

        const rightContentArea = window.jQuery('.PCAT58_contentRight');
        if (mapImage) {
            rightContentArea.html(`
                <div class="PCAT58_map">
                    <img src="${mapImage}" alt="${dealerName} Location Map" class="PCAT58_mapImage" />
                </div>
            `);
        } else {
            rightContentArea.empty();
        }
    },

    closeModal: () => {
        window.jQuery('.PCAT58_customModal').removeClass('PCAT58_Show');
        window.jQuery('body').removeClass('PCAT58_modalShowNoScroll');
        kamPcat58Config.showPodiumBubble();
    },

    hidePodiumBubble: () => {
        const podiumBubble = document.querySelector('#podium-bubble');
        if (podiumBubble) {
            podiumBubble.classList.add('PCAT58_hidePodium');
        }
    },

    showPodiumBubble: () => {
        const podiumBubble = document.querySelector('#podium-bubble');
        if (podiumBubble) {
            podiumBubble.classList.remove('PCAT58_hidePodium');
        }
    },
};

export default kamPcat58Config;

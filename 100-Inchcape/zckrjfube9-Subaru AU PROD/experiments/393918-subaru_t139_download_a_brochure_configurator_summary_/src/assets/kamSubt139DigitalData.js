import kamSubt139GetModelName from './kamSubt139GetModelName.js';

function kamSubt139GetVehicleSelected() {
    return {
        make: 'subaru',
        model: kamSubt139GetModelName().toLowerCase(),
    };
}

function kamSubt139PushDigitalDataEvent(eventData) {
    if (window.digitalData?.events?.pushAndUpdate) {
        window.digitalData.events.pushAndUpdate(eventData);
    }
}

function kamSubt139HashEmail(email) {
    const normalizedEmail = email.trim().toLowerCase();

    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalizedEmail))
        .then((hashBuffer) => Array.from(new Uint8Array(hashBuffer))
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join(''));
}

export function kamSubt139FireBrochureCtaStartEvent() {
    kamSubt139PushDigitalDataEvent({
        event: '_formNavigate',
        form: {
            name: 'download a brochure',
            stage: 'start',
            details: {
                vehicleSelected: [kamSubt139GetVehicleSelected()],
            },
        },
    });
}

export function kamSubt139FireBrochureDownloadSubmittedEvent() {
    kamSubt139PushDigitalDataEvent({
        event: '_formNavigate',
        form: {
            name: 'download a brochure',
            stage: 'submitted',
            details: {
                vehicleSelected: [kamSubt139GetVehicleSelected()],
            },
        },
    });
}

export function kamSubt139FireEmailBrochureSubmittedEvent(email) {
    return kamSubt139HashEmail(email).then((emailHashed) => {
        kamSubt139PushDigitalDataEvent({
            event: '_formNavigate',
            form: {
                name: 'email brochure',
                stage: 'submitted',
                details: {
                    dealerContact: false,
                    vehicleSelected: [kamSubt139GetVehicleSelected()],
                },
            },
            user: {
                emailHashed,
            },
        });
    });
}

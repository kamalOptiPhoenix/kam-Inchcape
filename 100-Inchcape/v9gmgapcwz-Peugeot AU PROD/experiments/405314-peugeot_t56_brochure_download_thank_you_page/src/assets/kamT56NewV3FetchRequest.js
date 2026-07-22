/* eslint-disable max-len */
import kamT56ProcessGoal from './kamT56ProcessGoal.js';

export default function kamT56NewV3FetchRequest(email, addDataWithCookie, dataLayerEvent, modelName, retryCount = 3) {
    const fetchData = (count) => {
        fetch('https://peugeotforms.pcaconnect.com.au/FormLoader.ashx?id=74&FormType=Lead&LType=Marketing&EType=Request+a+Brochure&Campaign=BAU&Src=peugeot.com.au')
            .then(res => res.text())
            .then((data) => {
                const token = data.split('\'hidden\\\' name = \\\'_requesttoken\\\' value = \\\'')[1].split('\\')[0];
                const formData = new FormData();
                formData.append('FirstName', 'NoName');
                formData.append('LastName', 'NoName');
                formData.append('Email', email);
                formData.append('{CHECKBOX}', 'ON');
                formData.append('_requesttoken', token);
                formData.append('Model', window.targetModalCode);
                formData.append('DealerDepartment', 'New Vehicle Sales');
                formData.append('LeadTemperature', 'Warm');
                formData.append('LeadForm', 'Brochure Request');
                formData.append('Make', 'Peugeot');

                return fetch('https://peugeotforms.pcaconnect.com.au/WebService.ashx?ccsForm=LeadForm&id=74&FormType=Lead&LType=Marketing&EType=Request+a+Brochure&Campaign=BAU&Src=peugeot.com.au', {
                    referrer: 'https://peugeotforms.pcaconnect.com.au/Pages/peugeot.com.au%20-%20Request%20a%20Brochure%20Email.html',
                    referrerPolicy: 'strict-origin-when-cross-origin',
                    body: formData,
                    method: 'POST',
                    credentials: 'omit'
                })
                    .then((res) => {
                        if ((res.status === 524 || res.status === 503) && count > 0) {
                            console.log(`Retrying fetch due to status code ${res.status}...`);
                            return fetchData(count - 1);
                        }
                        return res.json();
                    })
                    .then((data) => {
                        console.log('**** t56 Email Request Sent Successfully ****');
                        const TrackingCode = data.TrackingCode;
                        const id = TrackingCode.split('"formsLeadID": "')[1].split('"')[0];
                        sessionStorage.setItem('t56EmailCollected', email);
                        sessionStorage.setItem('T56ModalSubmitted', 'true');
                        addDataWithCookie('t56EmailCollected', email);
                        dataLayerEvent(modelName, id, email);
                        kamT56ProcessGoal('Email_Addresses_Collected');
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
                if (count > 0) {
                    console.log('Retrying fetch...');
                    return fetchData(count - 1);
                }
            });
    };

    fetchData(retryCount);
}

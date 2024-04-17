console.log('Content script executed');

function waitForField(selector, callback) {
    const field = document.querySelector(selector);
    if (field) {
        callback(field);
    } else {
        setTimeout(function() {
            waitForField(selector, callback);
        }, 100);
    }
}

function dispatchInputEvent(field, value) {
    field.value = value;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
}

function fillFormDetails() {
    // Fill email field
    waitForField('input[name="email"]', function(email) {
        console.log('Email field found');
        dispatchInputEvent(email, 'test@test.com');

        // Fill card number field
        waitForField('input[name="cardNumber"]', function(cardNumber) {
            console.log('Card number field found');
            dispatchInputEvent(cardNumber, '4242424242424242');

            // Fill card expiry field
            waitForField('input[name="cardExpiry"]', function(cardExpiry) {
                console.log('Card expiry field found');
                dispatchInputEvent(cardExpiry, '04/25');

                // Fill card CVC field
                waitForField('input[name="cardCvc"]', function(cardCvc) {
                    console.log('Card CVC field found');
                    dispatchInputEvent(cardCvc, '444');

                    // Fill cardholder name field
                    waitForField('input[name="billingName"]', function(billingName) {
                        console.log('Billing name field found');
                        dispatchInputEvent(billingName, 'tester');

                        // Fill zip code field
                        waitForField('input[name="billingPostalCode"]', function(billingPostalCode) {
                            console.log('Billing postal code field found');
                            dispatchInputEvent(billingPostalCode, '94109');

                            // Uncheck the save info checkbox
                            waitForField('#enableStripePass', function(enableStripePass) {
                                console.log('Save info checkbox found');
                                // Get the checkbox element
                                const checkbox = document.getElementById('enableStripePass');
                                checkbox.click();
                                // enableStripePass.checked = !enableStripePass.checked; // Toggle the checkbox state
                                // enableStripePass.dispatchEvent(new MouseEvent('click', { bubbles: true })); // Dispatch a click event

                                // Click the start trial button
                                waitForField('.SubmitButton', function(submitButton) {
                                    console.log('Submit button found');
                                    submitButton.click();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

fillFormDetails();
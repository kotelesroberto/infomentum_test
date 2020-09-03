// ==========================================================================
// Newsletter subscription handler
// ==========================================================================


export default class Newsletter {

    /* Constructor */
    constructor() {
        var _this = this;
    }

    //
    // Handle unsubscription request
    // --------------------------------------------------------------------------
    submitUnsubscription(email) {
        log('unsubscribed: ' + email);
        document.getElementById('newsletter_result').classList.add('success');
        alert('Unsubscription is done! TODO: call an API service that removes email from database');

        //
        // TODO
        //
        // => call an API for this task
    }

    //
    // Handle unsubscription request
    // --------------------------------------------------------------------------
    submitSubscription(email) {
        log('subscribed to newsletter with: ' + email);
        document.getElementById('newsletter_result').classList.add('success');
        alert('Subscription is done! TODO: call an API service that adds email to database');

        //
        // TODO
        //
        // => call an API for this task
    }
  
}
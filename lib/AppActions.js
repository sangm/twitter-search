'use strict'
import AppConstants from './AppConstants.js'
import AppDispatcher from './AppDispatcher.js'

class AppActions {
    search(tweet) {
        console.log("Dispatching SEARCH");
        AppDispatcher.dispatch({
            actionType: AppConstants.SEARCH,
            tweet: tweet
        });
    }

    getTweets() {
        console.log(AppDispatcher);
        console.log("Dispatching GET TWEETS");
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_TWEETS,
        });
    }
}
export default new AppActions;

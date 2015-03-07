'use strict';

import EventEmitter from 'events';
import AppDispatcher from '../AppDispatcher';
import AppConstants from '../AppConstants';

function _getTweets() {
    return "Here are tweets from store!";
}

class AppStore extends EventEmitter {
    constructor() {
        super();
        this._dispatchToken = AppDispatcher.register(action => {
            console.log(action);
            switch(action.actionType) {
                this.emit(AppConstants.CHANGE_EVENT);
            }
        });
    }
}

'use strict';

import EventEmitter from 'events'
import AppDispatcher from '../AppDispatcher'
import AppConstants from '../AppConstants'
import Immutable from 'immutable'
import elasticsearch from 'elasticsearch'

import Firebase from 'firebase';


var firebase = new Firebase("http://blazing-heat-4762.firebaseio.com")

let _flights = false;

class TweetStore extends EventEmitter {
    constructor() {
        this._dispatchToken = AppDispatcher.register(action => {
            switch (action.type) {
            case AppConstants.SEARCH:
                this._getFlights();
                break;
            default:
                return console.error(`Invalid Type: ${action.type}`)
            }
        })
    }
    
    addChangeListener(callback) {
        this.on(AppConstants.SEARCH_FINISHED, callback);
    }

    removeChangeListener(callback) {
        this.on(AppConstants.SEARCH_FINISHED, callback);
    }
    
    _getFlights() {
        firebase.on('value', (snapshot) => {
            _flights = snapshot.val();
            this.emit(AppConstants.SEARCH_FINISHED);
        })
        
    }
    
    getFlights() {
        return _flights;
    }
}

export default new TweetStore();

'use strict';

import EventEmitter from 'events'
import AppDispatcher from '../AppDispatcher'
import AppConstants from '../AppConstants'
import Immutable from 'immutable'
import elasticsearch from 'elasticsearch'
import TweetResource from './TweetResource'

let client = new elasticsearch.Client({host: TweetResource.ElasticServer})
let _tweets = Immutable.Map({});

class TweetStore extends EventEmitter {
    constructor() {
        this._dispatchToken = AppDispatcher.register(action => {
            switch (action.type) {
            case AppConstants.GET_TWEETS:
                this._getTweets();
                break;
            case AppConstants.SEARCH_TWEETS:
                this._searchTweets(action.payload);
                break;
            default:
                return console.error(`Invalid Type: ${action.type}`)
            }
        })
    }
    
    addChangeListener(callback) {
        this.on(AppConstants.GET_TWEETS_FINISHED, callback);
    }

    removeChangeListener(callback) {
        this.on(AppConstants.GET_TWEETS_FINISHED, callback);
    }
    
    _searchTweets(payload) {
        client.search({
            index: TweetResource.ElasticIndex,
            type: TweetResource.ElasticType,
            size: TweetResource.searchSize,
            body: TweetResource.searchQuery(payload)
        }).then(response => {
            _tweets = TweetResource.destructResponse(response);
            this.emit(AppConstants.GET_TWEETS_FINISHED);
        })
    }
    
    _getTweets() {
        client.search({
            index: TweetResource.ElasticIndex,
            type: TweetResource.ElasticType,
            size: TweetResource.searchSize,
            body: TweetResource.tweetsQuery()
        }).then(response => {
            _tweets = TweetResource.destructResponse(response);
            this.emit(AppConstants.GET_TWEETS_FINISHED);
        })
    }

    getTweets() {
        return _tweets;
    }
}

export default new TweetStore();

'use strict';
import EventEmitter from 'events'
import AppDispatcher from '../AppDispatcher'
import AppConstants from '../AppConstants'
import Immutable from 'immutable'
import elasticsearch from 'elasticsearch'

let client = new elasticsearch.Client({
    host: 'localhost:9200',
})
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
        console.log(payload);
        client.search({
            index: 'my_twitter_river',
            type: 'status',
            size: 100,
            body: {
                query: {
                    match: {
                        text: {
                            type: "phrase_prefix",
                            query: payload.query,
                            slop: 5,
                            max_expansions: 20
                        }
                    }
                }
            }
        }).then(response => {
            _tweets = Immutable.List(response.hits.hits.map(tweet => {
                return Immutable.Map(tweet);
            }));
            this.emit(AppConstants.GET_TWEETS_FINISHED);
        }, error => {
            console.trace(error.message);
        })
    }
    
    _getTweets() {
        client.search({
            index: 'my_twitter_river',
            type: 'status',
            size: 100,
            body: {
                query: {
                    match_all: {}
                }
            }
        }).then(response => {
            _tweets = Immutable.List(response.hits.hits.map(tweet => {
                return Immutable.Map(tweet);
            }));
            this.emit(AppConstants.GET_TWEETS_FINISHED);
        })
    }

    getTweets() {
        return _tweets;
    }
}

export default new TweetStore();

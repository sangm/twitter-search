'use strict';
import EventEmitter from 'events'
import AppDispatcher from '../AppDispatcher'
import AppConstants from '../AppConstants'
import Immutable from 'immutable'

let _tweets = Immutable.Map({ });

function _getTweets() {
    let tweets = [
        {
            "_index": "my_twitter_river",
            "_type": "status",
            "_id": "574153585358934017",
            "_score": 5.3434515,
            "_source": {
                "text": "RT @Doityourself_ag: make a cool notebook cover http://t.co/UrpRrd3LYe #DIY #doityourself",
                "created_at": "2015-03-07T10:24:16.000Z",
                "source": "<a href=\"https://roundteam.co\" rel=\"nofollow\">RoundTeam</a>",
                "truncated": false,
                "language": "en",
                "mention": [
                    {
                        "id": 2298062076,
                        "name": "Do It Yourself agent",
                        "screen_name": "Doityourself_ag",
                        "start": 3,
                        "end": 19
                    }
                ],
                "retweet_count": 0,
                "retweet": {
                    "id": 574152604625866750,
                    "user_id": 2298062076,
                    "user_screen_name": "Doityourself_ag",
                    "retweet_count": 1
                },
                "hashtag": [
                    {
                        "text": "DIY",
                        "start": 71,
                        "end": 75
                    }
                    ,
                    {
                        "text": "doityourself",
                        "start": 76,
                        "end": 89
                    }
                ],
                "link": [
                    {
                        "url": "http://t.co/UrpRrd3LYe",
                        "display_url": "ift.tt/1Fp0anD",
                        "expand_url": "http://ift.tt/1Fp0anD",
                        "start": 48,
                        "end": 70
                    }
                ],
                "user": {
                    "id": 2863719964,
                    "name": "Home & Garden #MGWV",
                    "screen_name": "HomeAndGarden15",
                    "location": "United States & United Kingdom",
                    "description": "Finding the best Home, Garden & DIY deals in the US and UK. Get some gr8 DIY deals @ http://dld.bz/d25ge We Follow #MGWV #TeamFollowBack",
                    "profile_image_url": "http://pbs.twimg.com/profile_images/532123770115207168/naaT_SkM_normal.jpeg",
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/532123770115207168/naaT_SkM_normal.jpeg"
                }
            }
        }
        ,
        {
            "_index": "my_twitter_river",
            "_type": "status",
            "_id": "574095632639655936",
            "_score": 4.7229886,
            "_source": {
                "text": "Dont u just hate that feeling when u wanna tell someone how u feel about them so bad but you dont & u just keep it bottled up inside... Yea.",
                "created_at": "2015-03-07T06:33:59.000Z",
                "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
                "truncated": false,
                "language": "en",
                "mention": [ ],
                "retweet_count": 0,
                "hashtag": [ ],
                "link": [ ],
                "user": {
                    "id": 343138389,
                    "name": "CD✌",
                    "screen_name": "LiveLoveRIDE420",
                    "location": "United States",
                    "description": "Lets sit under the stars & talk about how fuckin crazy life is. #ModernDayHippie #420 #1LoVe #PA✈️ #CO just moved to Ft. Collins, Colorado ✌️",
                    "profile_image_url": "http://pbs.twimg.com/profile_images/533751133186310144/7QKJRnkd_normal.jpeg",
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/533751133186310144/7QKJRnkd_normal.jpeg"
                }
            }
        }
        ,
        {
            "_index": "my_twitter_river",
            "_type": "status",
            "_id": "574097033545453569",
            "_score": 4.7229886,
            "_source": {
                "text": "#Acne #IndVsWI Earn money with Clickbank on autopilot without a website, using Clickbank RSS feeds. http://t.co/HPk5dEIryW",
                "created_at": "2015-03-07T06:39:33.000Z",
                "source": "<a href=\"http://twitterfeed.com\" rel=\"nofollow\">twitterfeed</a>",
                "truncated": false,
                "language": "en",
                "mention": [ ],
                "retweet_count": 0,
                "hashtag": [
                    {
                        "text": "Acne",
                        "start": 0,
                        "end": 5
                    }
                    ,
                    {
                        "text": "IndVsWI",
                        "start": 6,
                        "end": 14
                    }
                ],
                "link": [
                    {
                        "url": "http://t.co/HPk5dEIryW",
                        "display_url": "j.mp/Acne-No-More-Pr",
                        "expand_url": "http://j.mp/Acne-No-More-Pr",
                        "start": 101,
                        "end": 123
                    }
                ],
                "user": {
                    "id": 2518421011,
                    "name": "Diet Health Fitness",
                    "screen_name": "diethealthfit",
                    "location": "United States",
                    "description": null,
                    "profile_image_url": "http://pbs.twimg.com/profile_images/472668609865478144/mH0I4bZJ_normal.jpeg",
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/472668609865478144/mH0I4bZJ_normal.jpeg"
                }
            }
        }
    ]
    return Immutable.List(tweets.map(function(tweet) {
        return Immutable.Map(tweet);
    }));
}

class TweetStore extends EventEmitter {
    constructor() {
        this._dispatchToken = AppDispatcher.register(action => {
            switch (action.type) {
            case AppConstants.GET_TWEETS:
                _tweets = _getTweets();
                this.emit(AppConstants.CHANGE_EVENT);
                break;
            default:
                return console.error('Invalid Type: ${action.type}')
            }
        })
    }
    
    addChangeListener(callback) {
        this.on(AppConstants.CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.on(AppConstants.CHANGE_EVENT, callback);
    }
    
    getTweets() {
        return _tweets;
    }
}

export default new TweetStore();

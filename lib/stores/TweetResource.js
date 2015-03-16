import Immutable from 'immutable'

class TweetResource {
    constructor() {
        this.searchSize = 100;
        this.ElasticServer = "localhost:9200";
        this.ElasticIndex = "my_twitter_river";
        this.ElasticType = "status";
    }
    destructTweet(tweet) {
        let {_id, _source: {text, user } } = tweet;
        return {id: _id, text: text, user: user};
    }
    destructResponse(response) {
        let results = response.hits.hits;
        return Immutable.List(
            results.map(tweet => Immutable.Map(this.destructTweet(tweet)))
        );
    }
    searchQuery(payload) {
        return {
            query: {
                filtered: {
                    query: {
                        match: {
                            text: {
                                type: "phrase_prefix",
                                query: payload.query,
                                slop: 3,
                                max_expansions: 20
                            }
                        }
                    },
                    filter: { term: { language: "en" } }
                }
            }
        }
    }
    tweetsQuery() {
        return {
            query: {
                filtered: {
                    filter: {
                        term: {
                            language: "en"
                        }
                    }
                }
            }
        }
    }
}

export default new TweetResource();

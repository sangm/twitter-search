import Immutable from 'immutable'
import {stopWords} from '../StopWords'
import _ from 'lodash'

const TweetConstants = {
    facets: {
        user: "user",
        keyword: "keywords"
    },
    results: {
        users: null,
        keywords: null
    }
}
const facets = {};
facets[TweetConstants.facets.user] = {
    terms: {
        field: "user.screen_name",
        exclude: stopWords
    }
}
facets[TweetConstants.facets.keyword] = {
    terms: {
        field: 'hashtag.text',
        exclude: stopWords
    }
};

class TweetResource {
    constructor() {
        this.searchSize = 250;
        this.ElasticServer = "localhost:9200";
        this.ElasticIndex = "my_twitter_river";
        this.ElasticType = "status";
    }
    destructTweet(tweet) {
        let {_id, _source: {text, user } } = tweet;
        return {id: _id, text: text, user: user};
    }
    destructFacet(facet) {
        return Immutable.List(
            facet.terms.map((value, index) => {
                let {count, term} = value;
                return {index, count, term}
            })
        )
    }
    destructResponse(response) {
        /* Extracting statuses */
        let results = response.hits.hits;
        let tweets = Immutable.List(
            results.map(tweet => Immutable.Map(this.destructTweet(tweet)))
        );
        /* Extracting facets */
        let facets = {}
        Object.keys(response.facets).map(key => facets[key] = this.destructFacet(response.facets[key]))
        return {tweets, facets};
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
            },
            facets
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
            },
            facets
        }
    }
}

export default new TweetResource();
export {TweetConstants};

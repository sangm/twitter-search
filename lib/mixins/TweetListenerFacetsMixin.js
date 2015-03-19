import TweetStore from '../stores/TweetStore'

let TweetListenerFacetsMixin = {
    getState() {
        return { facets: TweetStore.getFacets() }
    },
    getInitialState() {
        return this.getState();
    },
    componentDidMount() {
        if (this.isMounted()) 
            TweetStore.addChangeListener(this.loadTweets);
    },
    componentWillUnmount() {
        TweetStore.removeChangeListener(this.loadTweets);
    },
    loadTweets() {
        this.setState(this.getState());
    }
};

export default TweetListenerFacetsMixin; 

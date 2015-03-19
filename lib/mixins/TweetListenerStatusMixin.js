import TweetStore from '../stores/TweetStore'

let TweetListenerStatusMixin = {
    getState() {
        return { tweets: TweetStore.getTweets() }
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
    },
};

export default TweetListenerStatusMixin;

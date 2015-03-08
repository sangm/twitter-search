'use strict';

import React from 'react'
import {FlatButton, Paper, Tabs, Tab} from 'material-ui'
import ActionCreator from '../ActionCreators'
import AppConstants from '../AppConstants'
import TweetStore from '../stores/TweetStore'
import SideFacet from './SideFacetComp.jsx'

export default React.createClass({
    getState() {
        return { tweets: TweetStore.getTweets() }
    },
    getInitialState() {
        ActionCreator.fire(AppConstants.GET_TWEETS, {});
        return this.getState();
    }, 
    componentDidMount() {
        TweetStore.addChangeListener(this.fetchTweets);
    },
    componentWillUnmount() {
        TweetStore.addChangeListener(this.fetchTweets);
    },
    onActive(tab) {
        ActionCreator.fire(tab.props.action, {});
    },
    fetchTweets() {
        this.setState(this.getState());
    },
    tweetLabel() {
        return "# of Tweets " + this.state.tweets.size;
    },

    render() {
        let paperStyle = { marginTop: '1em' };
        return (
            <Paper style={paperStyle} 
                   className="middle" 
                   zDepth={0}>
                <Tabs className="text-center">
                    <Tab label="Tweets"
                         onActive={this.onActive}
                         action={AppConstants.GET_TWEETS} >
                        <ul className="list-inline text-center">
                            <li><FlatButton label={this.tweetLabel()} primary={true} /></li>
                            <li><SideFacet label="Faceted Search" /></li>
                        </ul>
                    </Tab>
                    <Tab label="Word Frequency"
                         onActive={this.onActive}
                         action={AppConstants.GET_TWEETS} ><p className="text-center" >3</p>
                    </Tab>
                </Tabs>
            </Paper>
        )
            
    }
})

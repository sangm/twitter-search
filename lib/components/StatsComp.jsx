'use strict';

import React from 'react'
import {FlatButton, Paper, Tabs, Tab} from 'material-ui'
import AppActions from '../AppActions.js'
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
        TweetStore.addChangeListener(this.onChange);
    },
    componentWillUnmount() {
        TweetStore.addChangeListener(this.onChange);
    },
    onActive(tab) {
        ActionCreator.fire(tab.props.action, {});
    },
    onChange() {
        this.setState(this.getState());
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
                            <li><FlatButton label={"# of Tweets " + this.state.tweets.size} primary={true} /></li>
                            <li><SideFacet label="Faceted Search" /></li>
                        </ul>
                    </Tab>
                    <Tab label="Word Frequency"
                         onActive={this.onActive}
                         action={AppConstants.GET_TWEETS} ><p className="text-center" >{this.state.tweets.size}</p>
                    </Tab>
                </Tabs>
            </Paper>
        )
            
    }
})

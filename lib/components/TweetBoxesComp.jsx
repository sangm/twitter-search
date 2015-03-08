'use strict';

import React from 'react'
import AppConstants from '../AppConstants'
import TweetStore from '../stores/TweetStore'
import {Paper} from 'material-ui'

let TweetBox = React.createClass({
    getInitialState() {
        return {
            _source: this.props.tweet.get('_source'),
            _user: this.props.tweet.get('_source').user
        }
    },
    render() {
        let imageStyle = { marginTop: '1em' };
        let headerStyle = { padding: 0 };
        let boxStyle = { padding: '1em' };
        return (
            <Paper className="middle" 
                   zDepth={1}>
                <div className="row">
                    <div className="text-center col-xs-4 col-md-2">
                        <img style={imageStyle} src={this.state._user.profile_image_url} className="img-circle" />
                    </div>
                    <div style={boxStyle} className="col-xs-8 col-md-10">
                        <h4 style={headerStyle} className="list-group-item-heading">{this.state._user.name} <small>@{this.state._user.screen_name}</small></h4>
                        <p className="list-group-item-text">{this.state._source.text}</p>
                    </div>
                </div>
            </Paper>
        )
    }
})

    export default React.createClass({
        getState() {
            return { tweets: TweetStore.getTweets() }
        },
        getInitialState() {
            return this.getState();
        },
        componentDidMount() {
            TweetStore.addChangeListener(this.loadTweets);
        },
        componentWillUnmount() {
            TweetStore.removeChangeListener(this.loadTweets);
        },
        loadTweets() {
            this.setState(this.getState());
        },
        getTweetBoxes() {
            if (this.state.tweets.size === 0)
                return "Loading Tweets";
            else {
                return this.state.tweets.toArray().map(tweet => {
                    return <li><TweetBox tweet={tweet} /></li>
                })
            }
        },

        render() {
            return (
                <ul className="list-unstyled">{this.getTweetBoxes()}</ul>
            )
        }
})

'use strict';
import React from 'react';
import TweetStore from '../stores/TweetStore'
import {FlatButton, LeftNav, MenuItem} from 'material-ui';
import {TweetConstants} from '../stores/TweetResource'

let TweetListenerFacetsMixin = {
    getState() {
        return { facets: TweetStore.getFacets() }
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
    }
};

let TweetListenerStatusMixin = {
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
};


export default React.createClass({
    mixins: [TweetListenerFacetsMixin],

    getInitialState() {
        return { isDocked: false}
    },
    _toggleDockedLeftNavClick() {
        this.refs.dockedLeftNav.toggle();
        this.setState({
            isDocked: !this.state.isDocked
        });
    },
    onChange(event, selectedIndex, menuItem) {
        console.log(event, selectedIndex, menuItem);
    },

    render() {
        let users = this.state.facets[TweetConstants.facets.user];
        let words = this.state.facets[TweetConstants.facets.keyword];
        let userItems = [];
        let wordItems = [];
       
        if (users) {
            let header = { type: MenuItem.Types.NESTED, text: "Top Tweeters", items: []}
            header.items.push({type: MenuItem.Types.SUBHEADER, text: 'Top Tweeters'})
            for (let user of users.values()) {
                header.items.push({payload: user.index, text: '@' + user.term, number: String(user.count)});
            }
            userItems.push(header);
        }
        if (words) {
            let header = { type: MenuItem.Types.NESTED, text: "Top Queries", items: []}
            header.items.push({type: MenuItem.Types.SUBHEADER, text: 'Top Queries'})
            for (let word of words.values()) {
                header.items.push({payload: word.index, text: word.term, number: String(word.count)});
            }
            wordItems.push(header);
        }
        let menuItems = [...wordItems, ...userItems];
        return (
            <div>
                <FlatButton label={this.props.label} 
                            onTouchTap={this._toggleDockedLeftNavClick} 
                            secondary={true} />
                <LeftNav ref="dockedLeftNav" 
                         docked={this.state.isDocked} 
                         menuItems={menuItems} 
                         onChange={this.onChange} />
            </div>
        )
    }
})

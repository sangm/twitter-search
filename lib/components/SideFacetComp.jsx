'use strict';
import React from 'react';
import TweetStore from '../stores/TweetStore'
import {FlatButton, LeftNav, MenuItem} from 'material-ui'
import {TweetConstants} from '../stores/TweetResource'
import AppCreators from '../ActionCreators'
import AppConstants from '../AppConstants'

export default React.createClass({
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
        let query = menuItem.text.slice(1) // get rid of @
        AppCreators.fire(AppConstants.SEARCH_TWEETS, {query: query});
    },
    getItems(label, facets, user) {
        if (facets) {
            let menuItems = [];
            let header = { type: MenuItem.Types.NESTED, text: label, items: []}
            header.items.push({type: MenuItem.Types.SUBHEADER, text: label})
                for (let facet of facets.values()) {
                    let text = user ? '@' + facet.term : facet.term
                    header.items.push({payload: facet.index, text: text, number: String(facet.count)});
                }
            menuItems.push(header);
            return menuItems;
        }
        return [];
    },

    render() {
        let facets = this.props.facets;
        let menuItems = [];
        if (facets.size !== 0) {
            for (let [key, value] of facets.entries()) {
                let user = (key === TweetConstants.facets.user)
                let items = this.getItems(TweetConstants.label[key], value, user);
                menuItems.push(...items);
            }
        }
        
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

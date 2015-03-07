'use strict';
import React from 'react';
import {RaisedButton, LeftNav, MenuItem} from 'material-ui';

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

    render() {
        let menuItems = [
            { route: 'get-started', text: 'Get Started' },
            { route: 'css-framework', text: 'CSS Framework' },
            { route: 'components', text: 'Components' },
            { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
            { 
                type: MenuItem.Types.LINK, 
                payload: 'https://github.com/callemall/material-ui', 
                text: 'GitHub' 
            },
        ];
        return (
            <div>
                <RaisedButton label="Toggle Docked Left Nav" onTouchTap={this._toggleDockedLeftNavClick} /><br/><br/>
                <LeftNav ref="dockedLeftNav" docked={this.state.isDocked} menuItems={menuItems} />
            </div>
        )
    }
})

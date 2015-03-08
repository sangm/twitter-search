'use strict';

import React from 'react'
import {Paper} from 'material-ui'
import AppConstants from '../AppConstants'
import AppCreators from '../ActionCreators'

export default React.createClass({
    handleChange(event) {
        if (event.target.value.length !== 0) {
            AppCreators.fire(AppConstants.SEARCH_TWEETS, {query: event.target.value});
        }
        
    },
    handleSubmit(event) {
        event.preventDefault();
    },
    render() {
        let formStyle = {padding: '1.6em' };
        let searchbarStyle = {borderRadius: '17px' };
        return (
            <Paper className="middle" 
                   zDepth={0}>
                <form className="form-inline text-center" 
                      style={formStyle}
                      onSubmit={this.handleSubmit}>
                    <div className="form-group has-feedback">
                        <i className="glyphicon glyphicon-search form-control-feedback"></i>
                        <input type="text" 
                               style={searchbarStyle} 
                               className="form-control" 
                               placeholder="Search Twitter"
                               onChange={this.handleChange} />
                    </div>
                </form>
            </Paper>
        )
    }
})

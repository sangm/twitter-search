'use strict';

import React from 'react'
import {Paper} from 'material-ui'

export default React.createClass({
    handleChange(event) {
        console.log(event);
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

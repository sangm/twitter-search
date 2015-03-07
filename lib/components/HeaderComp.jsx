'use strict';

import React from 'react';
import mui from 'material-ui'

var RaisedButton = mui.RaisedButton;

export default React.createClass({

    render() {
        let twitterStyle = { color: '#3498db' };
        let headerStyle = { borderBottom: '1px solid #eee' };
        return (
            <div>
                <header className="container-fluid text-center"
                        style={headerStyle}>
                    <i style={twitterStyle} className="fa fa-twitter fa-3x"></i>
                </header>
            </div>
        );
    }

});

'use strict';

import React from 'react';
import mui from 'material-ui'

var RaisedButton = mui.RaisedButton;

export default React.createClass({

    render() {
        let twitterStyle = { color: '#3498db' };
        let headerStyle = { borderBottom: '1px solid #eee' };
        let imageStyle = { width: '17%'}
        return (
            <div>
                <header className="container-fluid"
                        style={headerStyle}>
                    <img style={imageStyle}
                         src={'/assets/images/EEA2.png'} />
                </header>
            </div>
        );
    }

});

'use strict';

import React from 'react';
import mui from 'material-ui'

var RaisedButton = mui.RaisedButton;

export default React.createClass({

  render() {
    let twitterStyle = { color: '#3498db' };
    return (
        <div className="container-fluid">
            <header className="text-center">
                <i style={twitterStyle} className="fa fa-twitter fa-3x"></i>
            </header>
            <hr/>
        </div>
    );
  }

});

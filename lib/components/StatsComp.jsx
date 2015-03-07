'use strict';

import React from 'react'
import {Paper, Tabs, Tab} from 'material-ui';

export default React.createClass({
    render() {
        let paperStyle = { marginTop: '1em' };
        return (
            <Paper style={paperStyle} 
                   className="middle" 
                   zDepth={0}>
                <Tabs className="text-center">
                    <Tab label="Tweets"><p className="text-center">2000</p></Tab>
                    <Tab label="Tweets"><p className="text-center">3000</p></Tab>
                    <Tab label="Tweets"><p className="text-center">4000</p></Tab>
                </Tabs>
            </Paper>
        )
            
    }
})

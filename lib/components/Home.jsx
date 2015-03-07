'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';
import Header from './HeaderComp.jsx';
import Stats from './StatsComp.jsx';
import Searchbar from './SearchbarComp.jsx';
import SideFacet from './SideFacetComp.jsx';
import Footer from './FooterComp.jsx';

export default React.createClass({

    render() {
        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-offset-2 col-md-8 col-xs-12">
                            <Stats />
                            <Searchbar />
                            <SideFacet />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

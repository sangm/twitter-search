'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';
import Header from './HeaderComp.jsx';
import DateList from './DateComp.jsx';
import LocationList from './LocationComp.jsx';
import FlightList from './FlightComp.jsx';
import ContactForm from './ContactComp.jsx';
import CardForm from './CardComp.jsx';
import SubmitButton from './SubmitComp.jsx';

export default React.createClass({
    render() {
        let divStyle = { width: '80%', margin: '0 auto', marginTop: '5%' }
        return (
            <div>
                <Header/>
                <div className="container-fluid" style={divStyle}>
                    <div className="row">
                        <div className="col-md-12">
                            <FlightList />
                            <ContactForm />
                            <CardForm />
                            <SubmitButton />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

import React from 'react'
import _ from 'lodash'
import {stopWords} from '../StopWords'
import d3 from 'd3'


let destructTweets = (tweets) => {
    return _.difference(
        tweets.toArray()
              .map(t => t.get('text'))
              .reduce((result, current) => result.concat(current))
              .split(/\s+/),
        stopWords);
}

let createChart = (dom, props) => {
    d3.select(dom)
      .append('svg')
      .attr('width', 100)
      .attr('height', 100)
     .append('circle');
}

export default React.createClass({
    componentDidMount() {
        console.log(this.props);
        let dom = this.getDOMNode();
        createChart(dom, this.props);
    },
    render() {
        return <div></div>
    }
})

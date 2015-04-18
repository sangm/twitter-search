import React from 'react'
import _ from 'lodash'
import {stopWords} from '../StopWords'
import d3 from 'd3'
import d3Cloud from '../d3.layout.cloud'
 
let destructTweets = (tweets) => {
    return tweets.toArray()
                 .map(t => t.get('text'))
                 .reduce((result, current) => result.concat(current))
                 .split(/\s+/)
}

let createChart = (dom, props) => {
    let tweets = destructTweets(props.tweets);
    let fill = d3.scale.category20();
    let draw = (words) => {
        d3.select(dom).append('svg')
          .attr('width', 300)
          .attr('height', 300)
          .append('g')
            .attr('transform', 'translate(150, 150)')
          .selectAll('text')
            .data(words)
          .enter().append('text')
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return fill(i); })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });
    }
    d3Cloud().size([300, 300])
        .words(tweets.map(word => {
            return {text: word, size: 10 + Math.random() * 90}
        }))
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .font('Impact')
        .fontSize(d => d.size)
        .on('end', draw)
        .start();
}

export default React.createClass({
    componentDidMount() {
        let dom = this.getDOMNode();
        createChart(dom, this.props);
    },
    render() {
        return <div className="middle"></div>
    }
})

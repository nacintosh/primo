import React from 'react';
import ReactDOM from 'react-dom';

class YouTube extends React.Component {

    static get BASE_URL() {
        return 'https://www.youtube.com/embed/';
    };

    static get QUERY() {
        return '?autoplay=1&playsinline=1&rel=0&controls=0&disablekb=1';
    };

    constructor(props) {
        super(props);
    }

    render() {
        const src = YouTube.BASE_URL + this.props.videoid + YouTube.QUERY;
        return (
          <div>
              <iframe className={this.props.className} ref='player' type="text/html" src={src} frameBorder="0" />
          </div>
      );
    }
}

YouTube.propTypes = {
  videoid: React.PropTypes.string.isRequired
}

export default YouTube;

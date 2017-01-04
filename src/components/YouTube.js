import React from 'react';
import ReactDOM from 'react-dom';

class YouTube extends React.Component {

    static get BASE_URL() {
        return 'https://www.youtube.com/embed/';
    }

    static get DEFAULT_QUERY() {
        return '?autoplay=1&playsinline=1&rel=0&controls=2&disablekb=1&loop=1';
    }

    constructor(props) {
        super(props);
    }

    render() {
        let src = YouTube.BASE_URL + this.props.videoid + YouTube.DEFAULT_QUERY;
        if (this.props.playlist.length > 0) {
            src = src + '&playlist=' + this.props.playlist;
        }
        return (
          <div>
              <iframe className={this.props.className} ref='player' type="text/html" src={src} frameBorder="0" />
          </div>
        );
    }
}

YouTube.propTypes = {
    videoid: React.PropTypes.string.isRequired,
    playlist: React.PropTypes.string
}

export default YouTube;

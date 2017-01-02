import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    }

    render() {
        const src = 'https://www.youtube.com/embed/' + this.props.videos[this.state.index].VideoID + '?autoplay=1';
        return (
            <div className="App" onKeyDown={this.handleOnKeyDown}>
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to Primo</h2>
              </div>
              <p className="App-intro"></p>
              <iframe id="player" type="text/html" width="640" height="390" src={src} frameBorder="0"/>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleOnKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleOnKeyDown);
    };

    handleOnKeyDown(event) {
        switch (event.key) {
            case 'ArrowRight':
                this.next();
                break;
            case 'ArrowLeft':
                this.prev();
                break;
            default:
                break;
        }
    }

    next() {
        console.log(this.props.videos.length);
        if (this.state.index + 1 >= this.props.videos.length) {
            this.setState({index: 0});
            return;
        }
        this.setState((prevState) => {
            return {indexr: prevState.index++};
        });
        return;
    }

    prev() {
        if (this.state.index - 1 < 0) {
            this.setState({index: this.props.videos.length - 1});
            return;
        }
        this.setState((prevState) => {
            return {indexr: prevState.index--};
        });
        return;
    }
}

App.propTypes = {
  videos: React.PropTypes.array.isRequired
};

App.defaultProps = {videos: []};

export default App;

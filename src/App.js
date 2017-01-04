import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import YouTube from './components/YouTube'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            playlist: this.createPlaylist(0)
        };
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    };

    render() {
        return (
            <div className='App'>
              <div className='App-header'>
                <img src={logo} className='App-logo' alt='logo'/>
                <h2>Welcome to Primo</h2>
              </div>
              <input type='text' ref='inputText' defaultValue='Please add a VideoID' />
              <button onClick={this.onChangeText}>add</button>
              <YouTube className="App-youtube" ref='youtube' videoid={this.props.videos[this.state.index].videoid} playlist={this.state.playlist}/>
            </div>
        );
    };

    onChangeText(e) {
        const id = ReactDOM.findDOMNode(this.refs.inputText).value.trim();
        fetch('/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            videoid: `${id}`
          })
        });
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleOnKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleOnKeyDown);
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

    createPlaylist(currentIndex) {
      let playlist = []
      for (let index in this.props.videos) {
          if (parseInt(index) === currentIndex) {
            continue;
          }
          playlist.push(this.props.videos[index].videoid);
      }
      return playlist.join(',');
    }

    next() {
        if (this.state.index + 1 >= this.props.videos.length) {
            this.setState({
                index: 0,
                playlist: this.createPlaylist(0)
            });
            return;
        }

        this.setState((prevState) => {
            return {
                index: prevState.index + 1,
                playlist: this.createPlaylist(prevState.index + 1)
            };
        });
    }

    prev() {
        if (this.state.index - 1 < 0) {
            this.setState({
                index: this.props.videos.length - 1,
                playlist: this.createPlaylist(this.props.videos.length - 1)
            });
            return;
        }

        this.setState((prevState) => {
            return {
                index: prevState.index - 1,
                playlist: this.createPlaylist(prevState.index - 1)
            };
        });
    }
}

App.propTypes = {
  videos: React.PropTypes.array.isRequired
};

App.defaultProps = {videos: []};

export default App;

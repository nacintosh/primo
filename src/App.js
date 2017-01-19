import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import YouTube from './components/YouTube'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: this.createPlaylist(),
            textValue: this.props.defaultText
        };

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    };

    createPlaylist() {
        let playlist = []
        for (let index in this.props.videos) {
            playlist.push(this.props.videos[index].videoid);
        }
        return playlist;
    }

    render() {
        return (
            <div className='App'>
                <div className='App-header'>
                    <img src={logo} className='App-logo' alt='logo'/>
                    <h2>Welcome to Primo</h2>
                </div>
                <input type='text' ref='inputText' value={this.state.textValue}
                       onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                <button onClick={this.onClick}>add</button>
                <YouTube className="App-youtube" ref='youtube' playlist={this.state.playlist}/>
                <div className="App-youtube-mask"/>
            </div>
        );
    };

    onChange(e) {
        this.setState({textValue: e.target.value});
    }

    onBlur(e) {
        if (e.target.value === '') {
          this.setState({textValue: this.props.defaultText});
        } else {
          this.setState({textValue: e.target.value});
        }
    }

    onFocus(e) {
        if(e.target.value === this.props.defaultText) {
          this.setState({textValue: ''});
        } else {
          this.setState({textValue: e.target.value});
        }
    }

    onClick(e) {
        const id = ReactDOM.findDOMNode(this.refs.inputText).value.trim();
        fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({videoid: `${id}`})
        });
        this.setState({textValue: ''});
    };
}

App.propTypes = {
    videos: React.PropTypes.array.isRequired,
    defaultText: React.PropTypes.string.isRequired
};

App.defaultProps = {
    videos: [],
    defaultText: 'Please add a VideoID'
};

export default App;

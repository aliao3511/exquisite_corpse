import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import NavBar from '../navbar/navbar';
import { getCorpse } from '../../modules/canvas';
import './home.scss';

// const socket = io('http://localhost:5000'); // dev socket
// const socket = io(); // prod socket

const msp = state => ({
    images: Object.values(state.canvas.images),
});

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            x: 0,
            y: 0,
        };

        this.makeCorpse = this.makeCorpse.bind(this);
        // this.handleMouseDown = this.handleMouseDown.bind(this);
        // this.handleMouseMove = this.handleMouseMove.bind(this);
        // this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount() {
        this.props.getCorpse();

        // window.addEventListener('mousemove', this.handleMouseMove);
        // window.addEventListener('mousedown', this.handleMouseDown);
        // window.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        // window.removeEventListener('mousemove', this.handleMouseMove);
        // window.removeEventListener('mousedown', this.handleMouseDown);
        // window.removeEventListener('mouseup', this.handleMouseUp);
    }

    // handleMouseDown(e) {
    //     console.log(e.pageX);
    //     console.log(e.pageY);
    //     this.setState({ clicked: true, x: e.pageX, y: e.pageY });
    // }

    // handleMouseMove(e) {
    //     if (this.state.clicked) {
    //         this.setState({ x: e.pageX, y: e.pageY }, () => window.scrollTo(this.state.x, this.state.y));
    //     }
    // }

    // handleMouseUp(e) {
    //     this.setState({ clicked: false, x:e.pageX, y: e.pageY });
    // }

    makeCorpse() {
        const rows = [];
        let rowCounter = 0;
        let row = [];
        for (let i = 0; i < this.props.images.length; i++) {
            let image = this.props.images[i];
            if (image.zone[0] === rowCounter) {
                row.push(<img key={image._id} className={`zone ${image.zone.join(',')}`} src={image.url} alt=''></img>);
            } else {
                rowCounter++;
                rows.push(row);
                row = [<img key={image._id} className={`zone ${image.zone.join(',')}`} src={image.url} alt=''></img>];
            }
        }
        rows.push(row);
        return rows;
    }

    render() {
        return (
            <div className='corpse-container'>
                <NavBar />
                <div className='corpse'>
                    {this.makeCorpse().map((row, idx) => <div key={idx} className={`row-${idx}`}>{row}</div>)}
                </div>
                {/* <button onClick={() => {
                    socket.emit('test', 'heyo!!!');
                }}>heyo</button> */}
                <Link to='/draw'>draw</Link>
            </div>
        )
    }
}

export default connect(msp, { getCorpse })(Home);
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

        this.makeCorpse = this.makeCorpse.bind(this);
    }

    componentDidMount() {
        this.props.getCorpse();
    }

    makeCorpse() {
        const rows = [];
        let rowCounter = 0;
        let row = [];
        for (let i = 0; i < this.props.images.length; i++) {
            debugger
            let image = this.props.images[i];
            if (image.zone[0] === rowCounter) {
                debugger
                row.push(<img key={image._id} className={`zone ${image.zone.join(',')}`} src={image.url} alt=''></img>);
                debugger
            } else {
                debugger
                rowCounter++;
                rows.push(row);
                row = [<img key={image._id} className={`zone ${image.zone.join(',')}`} src={image.url} alt=''></img>];
            }
        }
        rows.push(row);
        debugger
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
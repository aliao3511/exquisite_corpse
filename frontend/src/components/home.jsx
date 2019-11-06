import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import NavBar from '../components/navbar';

const socket = io('http://localhost:5000'); // dev socket
// const socket = io(); // prod socket

class Home extends React.Component {

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <NavBar />
                {/* <button onClick={() => {
                    socket.emit('test', 'heyo!!!');
                }}>heyo</button> */}
                <Link to='/draw'>draw</Link>
            </div>
        )
    }
}

export default Home;
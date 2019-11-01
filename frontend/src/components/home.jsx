import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
const socket = io('http://localhost:5000'); // dev socket
// const socket = io(); // prod socket

class Home extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => {
                    console.log('heyo');
                    socket.emit('test', 'heyo!!!');
                }}>heyo</button>
            </div>
        )
    }
}

export default Home;
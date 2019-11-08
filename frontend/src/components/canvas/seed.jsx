import React from 'react';
import { connect } from 'react-redux';

import { seedImage, getBase } from '../../modules/canvas';
import './canvas.scss';

const msp = state => ({
    image: state.canvas.image,
});

class Seed extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drawing: false,
            erasing: false,
            lines: [],
            currentLine: [],
            img: null
        };

        this.canvas = React.createRef('canvas');
        this.frame = React.createRef('frame');

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.relativeCoordinates = this.relativeCoordinates.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.seed = this.seed.bind(this);
        this.startErasing = this.startErasing.bind(this);
        this.stopErasing = this.stopErasing.bind(this);
    }

    componentDidMount() {
        const canvas = this.canvas.current;
        canvas.width = 600;
        canvas.height = 500;

    }

    handleMouseDown(e) {
        if (e.button !== 0) return;
        const point = this.relativeCoordinates(e);
        this.setState({ 
            drawing: true,
            currentLine: this.state.currentLine.concat(point)
        });
    }

    handleMouseMove(e) {
        if (!this.state.drawing) return;
        const start = this.state.currentLine[this.state.currentLine.length - 1];
        const end = this.relativeCoordinates(e);
        this.setState({
            currentLine: this.state.currentLine.concat(end)
        }, () => {
            const coords = {
                x_start: start.x,
                y_start: start.y,
                x_end: end.x,
                y_end: end.y
            };
            this.drawLine(coords);
        });
    }

    handleMouseUp(e) {
        this.setState({
            drawing: false,
            lines: this.state.lines.concat(this.state.currentLine),
            currentLine: []
        });
    }

    relativeCoordinates(e) {
        const canvas = this.canvas.current;
        const rect = canvas.getBoundingClientRect();
    
        return {
            x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }

    drawLine({ x_start, y_start, x_end, y_end }) {
        const context = this.canvas.current.getContext('2d');
        context.beginPath();
        context.moveTo(x_start, y_start);
        context.lineTo(x_end, y_end);
        if (this.state.erasing) {
            context.globalCompositeOperation = 'destination-out';
            context.strokeStyle='rgba(255,255,255,1)';
            context.lineWidth = 5;
        } else {
            context.globalCompositeOperation = 'source-over';
            context.strokeStyle = '#000000';
            context.lineWidth = 0.5;
        }
        context.stroke();
        context.closePath();
    }

    seed() {
        this.canvas.current.toBlob(async imageBlob => {
            const imageData = new FormData();
            imageData.append('image', imageBlob);
            await this.props.seedImage(imageData);
            this.props.history.push('/');
        });
    }

    startErasing(e) {
        e.preventDefault();
        this.setState({ erasing: true }, () => console.log(this.state));
    }

    stopErasing(e) {
        e.preventDefault();
        this.setState({ erasing: false }, () => console.log(this.state));
    }

    render() {

        return (
            <>
                <div className='canvas-container'>
                    <canvas className='drawing' ref={this.canvas}
                        onMouseDown={this.handleMouseDown} 
                        onMouseMove={this.handleMouseMove} 
                        onMouseUp={this.handleMouseUp}
                    />
                </div>
                <button onClick={this.startErasing} disabled={this.state.erasing}>erase</button>
                <button onClick={this.stopErasing} disabled={!this.state.erasing}>draw</button>
                <button onClick={this.seed}>seed me</button>
                <button onClick={() => this.props.history.push('/')}>cancel</button>
                {this.props.image && <img src={this.props.image.url} alt=''></img>}
            </>
        )
    }

}

export default connect(msp, { seedImage, getBase })(Seed);
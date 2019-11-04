import React from 'react';
import { connect } from 'react-redux';

import { saveImage, getImage } from '../../modules/canvas';

const msp = state => ({
    image: state.canvas.image,
});

class Canvas extends React.Component {

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

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.relativeCoordinates = this.relativeCoordinates.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.save = this.save.bind(this);
        this.startErasing = this.startErasing.bind(this);
        this.stopErasing = this.stopErasing.bind(this);
    }

    componentDidMount() {
        const canvas = this.canvas.current;
        canvas.width = 500;
        canvas.height = 500;
    }

    handleMouseDown(e) {
        if (e.button !== 0) return;
        const point = this.relativeCoordinates(e);
        this.setState({ 
            drawing: true,
            currentLine: this.state.currentLine.concat(point)
        }, () => console.log(this.state));
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
            console.log(this.state);
        });
    }

    handleMouseUp(e) {
        this.setState({
            drawing: false,
            lines: this.state.lines.concat(this.state.currentLine),
            currentLine: []
        }, () => console.log(this.state));
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

    save() {
        this.canvas.current.toBlob(imageBlob => {
            const imageData = new FormData();
            imageData.append('image', imageBlob);
            this.props.saveImage(imageData);
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
        const style = {
            boxSizing: 'border-box',
            border: 'solid',
        };

        return (
            <div>
                <button onClick={this.startErasing} disabled={this.state.erasing}>erase</button>
                <button onClick={this.stopErasing} disabled={!this.state.erasing}>draw</button>
                <canvas ref={this.canvas}
                    onMouseDown={this.handleMouseDown} 
                    onMouseMove={this.handleMouseMove} 
                    onMouseUp={this.handleMouseUp}
                    style={style}
                />
                <button onClick={this.save}>save me</button>
                {this.props.image && <img src={this.props.image.url} alt=''></img>}
            </div>
        )
    }

}

export default connect(msp, { saveImage, getImage })(Canvas);
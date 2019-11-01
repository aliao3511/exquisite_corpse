import React from 'react';
// import Immutable from 'immutable';

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drawing: false,
            lines: [],
        };

        this.canvas = React.createRef('canvas');

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.relativeCoordinates = this.relativeCoordinates.bind(this);
        this.drawLine = this.drawLine.bind(this);
    }

    handleMouseDown(e) {
        if (e.button !== 0) return;
        const point = this.relativeCoordinates(e);
        this.setState({ 
            drawing: true,
            lines: this.state.lines.concat(point)
        });
    }

    handleMouseMove(e) {
        if (!this.state.drawing) return;
        const start = this.state.lines[this.state.lines.length - 1];
        const end = this.relativeCoordinates(e);
        this.setState({
            lines: this.state.lines.concat(end)
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
        const point = this.relativeCoordinates(e);
        this.setState({
            drawing: false,
            lines: this.state.lines.concat(point)
        });
    }

    relativeCoordinates(e) {
        debugger
        const rect = this.canvas.current.getBoundingClientRect();
        
        // return {
        //     x: e.clientX - rect.left,
        //     y: e.clientY - rect.top,
        // };
        return {
            x: (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.current.width,
            y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.current.height
        };
    }

    drawLine({ x_start, y_start, x_end, y_end }) {
        debugger
        const context = this.canvas.current.getContext('2d');
        context.beginPath();
        context.moveTo(x_start, y_start);
        context.lineTo(x_end, y_end);
        context.strokeStyle = '#000000';
        context.lineWidth = 0.5;
        context.stroke();
        context.closePath();
    }

    render() {
        const style = {
            border: 'solid',
        };

        return (
            <div>
                <canvas ref={this.canvas}
                    onMouseDown={this.handleMouseDown} 
                    onMouseMove={this.handleMouseMove} 
                    onMouseUp={this.handleMouseUp}
                    style={style}
                />
            </div>
        )
    }

}

export default Canvas;
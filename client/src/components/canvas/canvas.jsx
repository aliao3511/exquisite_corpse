import React from 'react';
import { connect } from 'react-redux';

import { saveImage, getImage, getBase } from '../../modules/canvas';

const msp = state => ({
    base: state.canvas.base
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

        // this.throttle = this.throttle.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        // this.handleMouseMove = this.throttle(this.handleMouseMove.bind(this));
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.relativeCoordinates = this.relativeCoordinates.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.save = this.save.bind(this);
        this.startErasing = this.startErasing.bind(this);
        this.stopErasing = this.stopErasing.bind(this);
        this.makeSideBorder = this.makeSideBorder.bind(this);
        this.makeBorder = this.makeBorder.bind(this);
    }

    componentDidMount() {
        const canvas = this.canvas.current;
        canvas.width = 600;
        canvas.height = 500;

        this.props.getBase();
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

    save() {
        this.canvas.current.toBlob(async imageBlob => {
            const imageData = new FormData();
            imageData.append('baseId', this.props.base._id);
            imageData.append('image', imageBlob);
            await this.props.saveImage(imageData);
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

    makeSideBorder(side) {
        return this.props.base[side] && this.props.base[side].url ? <img className={side} src={this.props.base[side].url} /> : <div className={side}></div>;
    }

    makeBorder(side) {
        return this.props.base[side] && this.props.base[side].url ? <img className={side} src={this.props.base[side].url} /> : null;
    }

    // throttle(cb) {
    //     let tooSoon = false;
    //     return () => {
    //         if (!tooSoon) {
    //             setTimeout(() => tooSoon = false, 1500);
    //             cb.apply(this, arguments);
    //         }
    //     };
    // }

    render() {
        return (
            <div className='canvas-component'>
                <div className='canvas-buttons'>
                    <button onClick={this.startErasing} disabled={this.state.erasing} className={this.state.erasing ? 'disabled' : ''}>erase</button>
                    <button onClick={this.stopErasing} disabled={!this.state.erasing} className={!this.state.erasing ? 'disabled' : ''}>draw</button>
                </div>
                <div className='canvas-container'>
                    <div className='canvas'>
                        <div className='top'>
                            {this.props.base && this.makeBorder('top')}
                        </div>
                        <div className='side'>
                            {this.props.base && this.makeSideBorder('left')}
                            <canvas ref={this.canvas}
                                onMouseDown={this.handleMouseDown} 
                                onMouseMove={this.handleMouseMove} 
                                onMouseUp={this.handleMouseUp}
                            />
                            {this.props.base && this.makeSideBorder('right')}
                        </div>
                        <div className='bottom'>
                            {this.props.base && this.makeBorder('bottom')}
                        </div>
                    </div>
                    {/* {this.props.base.top && <img src={this.props.base.top.url} alt='' ></img>}
                    {this.props.base.right && <img src={this.props.base.right.url} alt=''></img>}
                    {this.props.base.left && <img src={this.props.base.left.url} alt=''></img>}
                    {this.props.base.bottom && <img src={this.props.base.bottom.url} alt=''></img>} */}
                </div>
                <div className='canvas-buttons'>
                    <button onClick={this.save}>save me</button>
                    <button onClick={() => this.props.history.push('/')}>cancel</button>
                </div>
            </div>
        )
    }

}

export default connect(msp, { saveImage, getImage, getBase })(Canvas);
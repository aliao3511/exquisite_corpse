import React from 'react';

function Scroll() {

    const myRef = React.useRef({
        x: 0,
        y: 0,
        mousedown: false
    });

    const handleMouseDown = e => {
        myRef.current.mousedown = true;
        myRef.current.x = e.clientX;
        myRef.current.y = e.clientY;
    };

    const handleMouseUp = e => {
        myRef.current.mousedown = false;
    };

    const handleMouseMove = e => {
        if (!myRef.current.mousedown) return;
        myRef.current.scrollLeft = myRef.current.scrollLeft + (e.clientX - myRef.current.x);
        myRef.current.scrollTop = myRef.current.scrollTop + (e.clientY - myRef.current.y);
    };

    const style = {
        width: '100vh',
        height: '100vh',
        backgroundColor: 'orange',
        overflow: 'hidden',
    };

    return (<div ref={myRef} 
                style={style}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div style={{backgroundColor: 'blue', width: '200vh', height: 100}}>long</div>
                <br></br>
                <div style={{backgroundColor: 'blue', height: '300vh', width: 100}}>tall</div>
            </div>);
}

export default Scroll;
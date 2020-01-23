import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Zoom() {

    const [image, setImage] = useState(null);

    useEffect(() => {
        async function fetchImg() {
            const response = await axios(`/api/images/5dcec05174b66687f9de0734`);
            setImage(response.data.image)
        }
        fetchImg()
    }, []);

    function zoomIn() {
        const oldScale = document.body.style.transform.split('.');
        let num = parseInt(oldScale[0][oldScale[0].length - 1]);
        let decimal = parseInt(oldScale[1]);
        debugger
        if (decimal > 9) {
            decimal = 0;
            num += 1
        }
        document.body.style.transform = `scale(${num}.${decimal})`
    }

    function zoomOut() {
        const body = document.querySelector('body');
        debugger
        body.style.width = (body.clientWidth - 50) + 'px';
    }

    return image ? (
        <div>
            <img src={image.url}></img>
            <div onClick={zoomIn}>zoom in</div>
            <div onClick={zoomOut}>zoom out</div>
        </div>
    ) : null;
}

export default Zoom;
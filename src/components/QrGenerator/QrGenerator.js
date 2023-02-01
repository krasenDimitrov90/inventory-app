import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import favicon from './favicon.ico';

import './QrGenerator.styles.scss';

const QrGenerator = ({ value, link }) => {

    const linkRef = React.useRef('');
    const [message, setMessage] = React.useState('Click to copy');
    const [isHovering, setIsHovering] = React.useState(false);
    const [buttonHasHovered, setbuttonHasHovered] = React.useState(false);

    React.useEffect(() => {
        if (message === 'Copied') {
            let timeOut = setTimeout(() => {
                setMessage('Click to copy');
            }, 1200);

            return () => clearTimeout(timeOut);
        }
    },[message]);

    const handleMouseOver = () => {
        if (!buttonHasHovered) {
            setbuttonHasHovered(true);
        }
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };


    const onCopyHandler = () => {
        navigator.clipboard.writeText(linkRef.current.textContent);
        setMessage('Copied');
    };

    return (
        <div className="qr-code-wrapper">
            <h3 className='qr-title-scan'>Scan</h3>
            <QRCode
                value={value}
                logoImage={favicon}
            />
            <h3 className='qr-title-copy'>Or copy this text</h3>
            <div className={`box ${buttonHasHovered ? isHovering  ? 'meassege-active' : 'meassege-hide' : ''}`} >
                <p>{message}</p>
            </div>
            <div className='link-wrapper'>
                <div ref={linkRef} className='qr-link'>{link}</div>
                <div onClick={onCopyHandler} className='qr-link-copy-btn' >
                    <i className="fa-regular fa-copy"
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}>
                    </i>
                </div>
            </div>

        </div>
    );
};

export default QrGenerator;
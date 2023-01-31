import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import favicon from './favicon.ico';

import './QrGenerator.styles.scss';

const QrGenerator = ({ value, link }) => {


    return (
        <div className="qr-code-wrapper">
            <h3 className='qr-title-scan'>Scan</h3>
            <QRCode
                value={value}
                logoImage={favicon}
            />
            <h3 className='qr-title-copy'>Or copy this text</h3>
            <div className='qr-link'>{link}</div>
        </div>
    );
};

export default QrGenerator;
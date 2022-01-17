import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {globalStyleSheet} from '../../styles/globalStyleSheet';
import {useNavigate} from 'react-router-dom';
import {Typography} from '@mui/material';

export const ScannerResponse = () => {
  const navigate = useNavigate();
  const classes = styles();
  const globalStyle = globalStyleSheet();
  const [timer, setTimer] = useState(10);

  const [responseText, setResponsText] = useState('Bienvenue');
  const [scanStatus, setScanStatus] = useState('Scan terminé');
  const [scanIcon, setScanIcon] = useState(scanSuccess);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0) {
        clearInterval(interval);
        navigate('/');
      } else {
        setTimer(timer - 1);
      }
    }, 1000);
  }, [timer]);

  return (
    <div className={classes.container}>
      <div className={classes.responseDiv}>
        <div className={globalStyle.column}>
          <div className={classes.icon}>{scanIcon}</div>
          <Typography className={`${globalStyle.textBold} ${classes.text}`}>
            {scanStatus}
          </Typography>
          <Typography className={`${globalStyle.textBold} ${classes.text}`}>
            {responseText}
          </Typography>
        </div>
      </div>
      <div className={classes.responseDiv}>
        <Typography className={`${globalStyle.textBold} ${classes.text}`}>
          Redirect : {timer}
        </Typography>
      </div>
    </div>
  );
};

const scanSuccess = (
  <svg
    width="188"
    height="163"
    viewBox="0 0 188 163"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_111_50)">
      <path
        d="M5.33526 87.1858L21.1409 69.3229L63.2675 116.892L64.0022 116.242L64.753 116.906L64.7533 116.905L64.7654 116.892L166.859 1.50906L182.665 19.3716L80.3956 134.966L64.004 153.491L5.33526 87.1858Z"
        fill="#EAF5F8"
        stroke="#79DD95"
        stroke-width="2"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_111_50"
        x="0"
        y="0"
        width="188"
        height="163"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_111_50"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_111_50"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
const scanError = (
  <svg
    width="180"
    height="180"
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M135 101H137V99V81V79H135H45H43V81V99V101H45H135ZM2 90C2 41.4246 41.4246 2 90 2C138.575 2 178 41.4246 178 90C178 138.575 138.575 178 90 178C41.4246 178 2 138.575 2 90Z"
      fill="#EAF5F8"
      stroke="#FF0000"
      stroke-width="4"
    />
  </svg>
);

import React, { useEffect, useState } from 'react';
import { styles } from './style';
import { globalStyleSheet } from '../../styles/globalStyleSheet';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

export const ScannerResponse = () => {
  const router = useRouter();
  const classes = styles();
  const globalStyle = globalStyleSheet();
  const [timer, setTimer] = useState(10);

  const scanSuccess = require('./img/success.svg');
  const scanError = require('./img/error.svg');

  const [responseText, setResponsText] = useState('Bienvenue');
  const [scanStatus, setScanStatus] = useState('Scan terminé');
  const [scanIcon, setScanIcon] = useState(scanSuccess);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0) {
        clearInterval(interval);
        router.push('/');
      } else {
        setTimer(timer - 1);
      }
    }, 1000);
  }, [timer]);

  return (
    <div className={classes.container}>
      <div className={classes.responseDiv}>
        <div className={globalStyle.column}>
          <div className={classes.icon}>
            <Image src={scanIcon} />
          </div>
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

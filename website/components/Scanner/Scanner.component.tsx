import React, { useState } from 'react';
import { styles } from './style';
import {
  buttonStyle,
  globalStyleSheet,
  inputStyle,
} from '../../styles/globalStyleSheet';
import dynamic from 'next/dynamic';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
});

export const Scanner = () => {
  const router = useRouter();
  const classes = styles();
  const globalStyle = globalStyleSheet();
  const button = buttonStyle();
  const input = inputStyle();
  const [useCode, setUseCode] = useState(false);

  const { time } = router.query;

  const onCancel = () => {
    router.push('/');
  };

  const handleScan = () => {};
  const handleError = () => {};

  const validate = () => {
    router.push({
      pathname: '/scan/response',
    });
  };

  return (
    <div className={classes.container}>
      {useCode ? (
        <>
          <div className={globalStyle.row}>
            <TextField
              variant="standard"
              className={input.root}
              placeholder={'Votre code'}
            />
            <Button className={button.primary} onClick={validate}>
              Valider
            </Button>
          </div>

          <div className={globalStyle.row}>
            <Button className={button.primary} onClick={onCancel}>
              Annuler
            </Button>
            <Button
              className={button.secondary}
              onClick={() => setUseCode(!useCode)}
            >
              Utilisez LE SCAN
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={classes.scanner}>
            <QrReader
              facingMode={'user'}
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
          </div>
          <div className={globalStyle.row}>
            <Button className={button.primary} onClick={onCancel}>
              Annuler
            </Button>
            <Button
              className={button.secondary}
              onClick={() => setUseCode(!useCode)}
            >
              Utilisez LE CODE
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

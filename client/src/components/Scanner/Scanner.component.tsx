import React, { useState } from 'react';
import { styles } from './style';
import {
  buttonStyle,
  globalStyleSheet,
  inputStyle,
} from '../../styles/globalStyleSheet';
import { Button, TextField } from '@mui/material';
import QrReader from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routeConstants';

export const Scanner = () => {
  const navigate = useNavigate();
  const classes = styles();
  const globalStyle = globalStyleSheet();
  const button = buttonStyle();
  const input = inputStyle();
  const [useCode, setUseCode] = useState(false);

  const onCancel = () => {
    navigate(PATHS.HOME);
  };

  const handleScan = () => {};
  const handleError = () => {};

  const validate = () => {
    navigate(PATHS.SCAN_RESPONSE);
  };

  console.log('ici');

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

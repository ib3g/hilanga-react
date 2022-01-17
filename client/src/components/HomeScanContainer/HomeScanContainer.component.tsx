import React from 'react';
import {styles} from './style';
import {ScanButton} from '../ScanButton/ScanButton.component';

export const HomeScanContainer = () => {
  const classes = styles();
  return (
    <div className={classes.container}>
      <ScanButton name="Début" time="start" />
      <ScanButton name="Début Pause" time="startBreak" />
      <ScanButton name="Fin Pause" time="endBreak" />
      <ScanButton name="Fin" time="end" />
    </div>
  );
};

import React from 'react';
import {useNavigate} from 'react-router-dom';
import {styles} from './style';
import Button from '@mui/material/Button';

type Props = {
  name: string;
  time: string;
};

export const ScanButton = (props: Props) => {
  const navigate = useNavigate();
  const { name, time } = props;
  const classes = styles();

  const onClickButton = (time: string) => {
    navigate('/Scan/' + time);
  };

  return (
    <Button className={classes.buttonStyle} onClick={() => onClickButton(time)}>
      {name}
    </Button>
  );
};

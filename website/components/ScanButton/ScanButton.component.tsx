import React from 'react';
import { styles } from './style';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

type Props = {
  name: string;
  time: string;
};

export const ScanButton = (props: Props) => {
  const router = useRouter();
  const { name, time } = props;
  const classes = styles();

  const onClickButton = (time: string) => {
    router.push({
      pathname: '/scan',
      query: { time: time },
    });
  };

  return (
    <Button className={classes.buttonStyle} onClick={() => onClickButton(time)}>
      {name}
    </Button>
  );
};

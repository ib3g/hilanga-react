import React from 'react';
import {styles} from './style';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const Container = (props: Props) => {
  const { children } = props;
  const classes = styles();

  return <div className={classes.container}>{children}</div>;
};

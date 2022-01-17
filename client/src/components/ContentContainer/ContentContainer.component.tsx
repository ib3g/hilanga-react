import React from 'react';
import { styles } from './style';

type Props = {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
};

export const ContentContainer = (props: Props) => {
  const { children } = props;
  const classes = styles();
  return <div className={classes.container}>{children}</div>;
};

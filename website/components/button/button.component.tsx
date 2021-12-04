import * as React from 'react';
import { ReactNode } from 'react';
import { Button as NativeButton } from '@mui/material';
import { buttonStyle } from './button.style';

type Props = {
  type: 'primary' | 'secondary';
  className?: string;
  children: ReactNode | string;
  style?: React.CSSProperties;
};

export const Button = (props: Props) => {
  const { children, style, className, type } = props;
  let colorStyle = buttonStyle.primary;

  switch (type) {
    case 'primary':
      colorStyle = buttonStyle.primary;
      break;
    case 'secondary':
      colorStyle = buttonStyle.secondary;
      break;
    default:
      colorStyle = buttonStyle.primary;
  }

  return <NativeButton style={colorStyle}>{children}</NativeButton>;
};

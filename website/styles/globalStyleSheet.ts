import { makeStyles } from '@mui/styles';
import Colors from './Colors';

const _button = {
  margin: '8px',
  padding: '8px',
  borderRadius: '16px',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '36px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
};

const _boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.25)';

export const globalStyleSheet = makeStyles(() => {
  return {
    container: {
      backgroundColor: Colors.palette.gray,
    },
  };
});

export const buttonPrimaryStyle = makeStyles({
  // @ts-ignore
  root: {
    ..._button,
    color: Colors.palette.white,
    background: Colors.palette.blackTransparent,
    boxShadow: _boxShadow,
    '&:hover': {
      color: Colors.palette.black,
      background: Colors.palette.blueGreenTransparent,
    },
  },
});

export const buttonSecondaryStyle = makeStyles({
  // @ts-ignore
  root: {
    ..._button,
    color: Colors.palette.black,
    background: Colors.palette.blueGreenTransparent,
    boxShadow: _boxShadow,
    '&:hover': {
      color: Colors.palette.white,
      background: Colors.palette.blackTransparent,
    },
  },
});

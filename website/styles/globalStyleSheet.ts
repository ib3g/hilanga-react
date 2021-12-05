import { makeStyles } from '@mui/styles';
import Colors from './Colors';

const _button = {
  margin: '8px',
  padding: '8px',
  borderRadius: '16px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '36px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
};

export const _boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.25)';

export const globalStyleSheet = makeStyles(() => {
  return {
    container: {
      backgroundColor: Colors.palette.gray,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    textBold: {
      fontFamily: 'Poppins',
      fontSize: '24px',
      fontWeight: 'bold',
      fontStyle: 'normal',
      lineHeight: '36px',
    },
  };
});

export const inputStyle = makeStyles({
  root: {
    fontFamily: 'Poppins',
    boxShadow: _boxShadow,
    borderRadius: '16px',
    padding: '8px',
    '& ::before': {
      border: 'none',
    },
    '& .MuiInput-root:hover:not(.Mui-disabled):before': {
      border: 'none',
    },
    '& .MuiInput-root:hover:not(.Mui-disabled):after': {
      border: 'none',
    },
    '& .MuiInput-root::after': {
      border: 'none',
    },
  },
});

export const buttonStyle = makeStyles({
  // @ts-ignore
  primary: {
    ..._button,
    color: Colors.palette.white,
    background: Colors.palette.blackTransparent,
    boxShadow: _boxShadow,
    '&:hover': {
      color: Colors.palette.black,
      background: Colors.palette.blueGreenTransparent,
    },
  },
  // @ts-ignore
  secondary: {
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

import { makeStyles } from '@mui/styles';
import Colors from './Colors';

const _button = {
  margin: '8px !important',
  padding: '8px !important',
  borderRadius: '16px !important',
  fontFamily: 'Poppins !important',
  fontStyle: 'normal !important',
  fontWeight: 'bold !important',
  fontSize: '16px !important',
  lineHeight: '36px !important',
  display: 'flex !important',
  alignItems: 'center !important',
  textAlign: 'center',
};

export const _boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.25) !important';

export const globalStyleSheet = makeStyles({
  container: {
    backgroundColor: Colors.palette.gray,
  },
  row: {
    display: 'flex !important',
    flexDirection: 'row',
    alignContent: 'center !important',
    alignItems: 'center !important',
  },
  column: {
    display: 'flex !important',
    flexDirection: 'column',
    justifyContent: 'center !important',
    alignContent: 'center !important',
    alignItems: 'center !important',
  },
  textBold: {
    fontFamily: 'Poppins !important',
    fontSize: '24px !important',
    fontWeight: 'bold !important',
    fontStyle: 'normal !important',
    lineHeight: '36px !important',
  },
});

export const inputStyle = makeStyles({
  root: {
    fontFamily: 'Poppins !important',
    boxShadow: _boxShadow,
    borderRadius: '16px !important',
    padding: '8px !important',
    '& ::before': {
      border: 'none !important',
    },
    '& .MuiInput-root:hover:not(.Mui-disabled):before': {
      border: 'none !important',
    },
    '& .MuiInput-root:hover:not(.Mui-disabled):after': {
      border: 'none !important',
    },
    '& .MuiInput-root::after': {
      border: 'none !important',
    },
  },
});

export const buttonStyle = makeStyles({
  // @ts-ignore
  primary: {
    ..._button,
    color: Colors.palette.white + '!important',
    background: Colors.palette.blackTransparent + '!important',
    boxShadow: _boxShadow,
    '&:hover': {
      color: Colors.palette.black + '!important',
      background: Colors.palette.blueGreenTransparent + '!important',
    },
  },
  // @ts-ignore
  secondary: {
    ..._button,
    color: Colors.palette.black + '!important',
    background: Colors.palette.blueGreenTransparent + '!important',
    boxShadow: _boxShadow,
    '&:hover': {
      color: Colors.palette.white + '!important',
      background: Colors.palette.blackTransparent + '!important',
    },
  },
});

import { makeStyles } from '@mui/styles';
import Colors from '../../styles/Colors';
import { _boxShadow } from '../../styles/globalStyleSheet';

export const styles = makeStyles({
  buttonStyle: {
    width: '192px !important',
    margin: '16px !important',
    padding: '66px 33px !important',
    borderRadius: '16px !important',
    fontFamily: 'Poppins !important',
    fontStyle: 'normal !important',
    fontWeight: 'bold !important',
    fontSize: '18px !important',
    lineHeight: '27px !important',
    display: 'flex !important',
    alignItems: 'center !important',
    textAlign: 'center',
    color: Colors.palette.black + ' !important',
    background: Colors.palette.blueGreenTransparent + ' !important',
    boxShadow: _boxShadow,
  },
});

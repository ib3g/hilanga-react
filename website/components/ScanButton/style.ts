import { makeStyles } from '@mui/styles';
import Colors from '../../styles/Colors';
import { _boxShadow } from '../../styles/globalStyleSheet';

export const styles = makeStyles({
  buttonStyle: {
    width: '192px',
    margin: '16px',
    padding: '66px 33px',
    borderRadius: '16px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '27px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: Colors.palette.black,
    background: Colors.palette.blueGreenTransparent,
    boxShadow: _boxShadow,
  },
});

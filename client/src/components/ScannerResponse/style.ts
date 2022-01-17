import {makeStyles} from '@mui/styles';
import Colors from '../../styles/Colors';
import {_boxShadow} from '../../styles/globalStyleSheet';

export const styles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 'auto',
    height: 'auto',
    color: Colors.palette.blueGreen,
    borderColor: Colors.palette.black,
    marginBottom: '16px',
  },
  text: {
    margin: '8px',
    textAlign: 'center',
  },
  responseDiv: {
    margin: '32px',
    padding: '8px 32px',
    color: Colors.palette.black,
    backgroundColor: Colors.palette.blueGreenTransparent,
    boxShadow: _boxShadow,
    borderRadius: '16px',
  },
});

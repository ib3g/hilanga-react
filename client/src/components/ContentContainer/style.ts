import Colors from '../../styles/Colors';
import { _boxShadow } from '../../styles/globalStyleSheet';
import { makeStyles } from '@mui/styles';

export const styles = makeStyles({
  container: {
    padding: '32px',
    color: Colors.palette.black,
    background: Colors.palette.blueGreenTransparent,
    boxShadow: _boxShadow,
    borderRadius: '16px',
  },
});

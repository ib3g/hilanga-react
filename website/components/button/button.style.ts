import Colors from '../../styles/Colors';

export const buttonStyle = {
  primary: {
    fontWeight: 600,
    padding: '12px',
    color: Colors.primary,
    background: Colors.background,
    border: 0,
    boxShadow: `0px 0px 30px 1px ${Colors.palette.shadow}`,
    borderRadius: '8px',
  },
  secondary: {
    fontWeight: 600,
    padding: '12px',
    background: Colors.primary,
    color: Colors.background,
    border: 0,
    boxShadow: `0px 0px 10px 2px ${Colors.palette.shadow}`,
    borderRadius: '8px',
  },
};

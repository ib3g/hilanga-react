import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { VerifiedUser } from '@mui/icons-material';
import { Container } from '../Container/Container.component';
import { styles } from './style';
import {
  buttonPrimaryStyle,
  buttonSecondaryStyle,
} from '../../styles/globalStyleSheet';

export default function Header() {
  const classes = styles();
  const buttonPrimary = buttonPrimaryStyle();
  const buttonSecondary = buttonSecondaryStyle();
  return (
    <Container>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          className={classes.logo}
          sx={{ flexGrow: 1 }}
        >
          Hilanga
        </Typography>
        <Button className={buttonPrimary.root} color="inherit">
          <VerifiedUser />
        </Button>
        <Button className={buttonPrimary.root} color="inherit">
          Login
        </Button>
        <Button className={buttonPrimary.root} color="inherit">
          Login
        </Button>
        <Button className={buttonSecondary.root} color="inherit">
          Login
        </Button>
      </Toolbar>
    </Container>
  );
}

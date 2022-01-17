import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ListIcon from '@mui/icons-material/List';
import {Container} from '../Container/Container.component';
import {styles} from './style';
import {buttonStyle} from '../../styles/globalStyleSheet';
import {useRouter} from 'next/router';

export default function Header() {
  const router = useRouter();
  const classes = styles();
  const button = buttonStyle();

  return (
    <Container>
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" className={classes.logo}>
          <a href="/">Logo !</a>
        </Typography>
        <Button className={button.secondary} color="inherit">
          <ListIcon fontSize={'large'} />
        </Button>
        <Button className={button.secondary} color="inherit">
          <LeaderboardIcon fontSize={'large'} />
        </Button>
        <Button className={button.secondary} color="inherit">
          <SettingsIcon fontSize={'large'} />
        </Button>
      </Toolbar>
    </Container>
  );
}

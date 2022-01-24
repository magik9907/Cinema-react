import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './header.module.scss';
import TicketContext from '../../providers/TicketProviders';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { TicketContextAction } from '../../providers/TicketProviders';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Ticket } from '../../data/Ticket';
import { Refresh } from '@mui/icons-material';

type props = {
  isNavVisible: boolean;
  setIsNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ setIsNavVisible, isNavVisible }: props) {
  const [open, setOpen] = useState<boolean>(false);
  const { state, dispatch } = useContext(TicketContext);
  const setNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <div>
      <header>
        <Box>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                onClick={setNavVisibility}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" component="h1">
                Kino
              </Typography>
              <div className={styles.shop} onClick={() => setOpen(!open)}>
                <ShoppingCartIcon></ShoppingCartIcon> {state.length}
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </header>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Koszyk</DialogTitle>
        <DialogContent>
          <ul>
            {state.map((x: Ticket) => (
              <li key={`${x.seans._id}-${x.seatNo}`}>
                {`${x.name} ${x.surname} - ${x.seans.film.title} - ${x.seans.date.date} ${x.seans.date.time} - siedzenie nr: ${x.seatNo}`}
                <Button
                  className={styles.delete}
                  variant="outlined"
                  onClick={() => {
                    dispatch({
                      value: x,
                      action: TicketContextAction.REMOVE_TICKET,
                    });
                  }}
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Zamknij</Button>
          <Button
            onClick={() => {
              dispatch({
                action: TicketContextAction.BUY_TICKET,
              });
              window.location.reload();
            }}
          >
            Kup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

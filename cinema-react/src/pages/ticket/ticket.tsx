import { Link as Anchor } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import TicketList from '../../components/List/TicketList';
import styles from './seans.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Ticket() {
    return (
      <div>
        <h1>Bilety</h1>
        <TicketList />
      </div>
    );
  }


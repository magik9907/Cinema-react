import { Link as Anchor } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './hall.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HallList from '../../components/List/HallList';

export default function Hall() {
  return (
    <div>
      <h1>Sale</h1>
      <div className={styles.alignRight}>
        <Anchor component={Link} to="hall/create">
          <AddCircleIcon />
        </Anchor>
      </div>
      <HallList />
    </div>
  );
}

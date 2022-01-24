import { Link as Anchor } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import SeansList from '../../components/List/SeansList';
import styles from './seans.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Seans() {
  return (
    <div>
      <h1>Seanse</h1>
      <div className={styles.alignRight}>
        <Anchor component={Link} to="seans/create">
          <AddCircleIcon />
        </Anchor>
      </div>
      <SeansList />
    </div>
  );
}

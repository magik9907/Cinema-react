import { Link as Anchor } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import FilmsList from '../../components/List/FilmsList';
import styles from './film.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Films() {
  return (
    <div>
      <h1>Filmy</h1>
      <div className={styles.alignRight}>
        <Anchor component={Link} to="films/create">
          <AddCircleIcon />
        </Anchor>
      </div>
      <FilmsList />
    </div>
  );
}

import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import styles from './Element.module.scss';
import Delete from '../../Delete';
import Edit from '../../Edit';

type propsType = {
  content: string;
  address: string;
  api?: string;
  id?: string;
  allowDelete?: boolean;
  rerender: () => void;
  allowEdit?: boolean;
};

export default function Element({
  content,
  address,
  id,
  rerender,
  api,
  allowDelete,
  allowEdit,
}: propsType): JSX.Element {
  return (
    <ListItem
      className={styles.background}
      secondaryAction={
        api && (
          <div>
            {allowEdit && <Edit link={`${address}/edit`} />}
            {allowDelete && <Delete id={id} api={api} rerender={rerender} />}
          </div>
        )
      }
    >
      <ListItemButton component={Link} to={address}>
        <ListItemText primary={content} />
      </ListItemButton>
    </ListItem>
  );
}

Element.defaultProps = { allowDelete: true };

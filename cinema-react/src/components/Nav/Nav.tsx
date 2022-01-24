import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from './Nav.module.scss';
import {
  NAVIGATION_LINKS as links,
  NavigationLink,
} from '../../data/navigationLinks';
import { Collapse, ListItemIcon } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface NavElementProps extends NavigationLink {
  style?: { [key: string]: any };
}

function NavElement({ text, href, Icon, style }: NavElementProps): JSX.Element {
  // const CustomLink = (props: any) => <Link to={href} {...props} />;
  // const CustomLink = React.forwardRef((props, ref) => (
  //   <Link innerRef={ref} {...props} />
  // ));
  return (
  <Link to={href as string}>
      <ListItem sx={style}>
        <ListItemIcon sx={{ color: 'text.secondary' }}>
          {Icon && <Icon />}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ color: 'text.secondary' }} />
      </ListItem>
    </Link>
  );
}

interface NavElementWithChildrenProps extends NavigationLink {
  style?: { [key: string]: any };
}

function NavElementWithChildren({
  text,
  Icon,
  children,
}: NavElementWithChildrenProps): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon sx={{ color: 'text.secondary' }}>
          {Icon && <Icon />}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ color: 'text.secondary' }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {children && <ChildNav children={children} open={open} />}
    </>
  );
}

type ChildNavProps = { children: NavigationLink[]; open: boolean };

function ChildNav({ children, open }: ChildNavProps): JSX.Element {
  return (
    <>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((nav: NavigationLink) => (
            <NavElement {...nav} style={{ pl: 12 }} key={nav.href} />
          ))}
        </List>
      </Collapse>
    </>
  );
}

type NavProps = {
  isNavVisible: boolean;
  setIsNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Nav({ isNavVisible, setIsNavVisible }: NavProps) {
  const closeNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nawigacja"
      subheader={
        <ListSubheader
          sx={{ color: 'text.primary' }}
          component="h3"
          id="nested-list-subheader"
          className={styles.title}
        >
          Kino
          <CancelIcon className={styles.exitIcon} onClick={closeNav} />
        </ListSubheader>
      }
    >
      {links.map((nav: NavigationLink) => (
        <React.Fragment key={`${nav.href}-${nav.text}`}>
          {nav.children ? (
            <NavElementWithChildren {...nav} />
          ) : (
            <NavElement {...nav} />
          )}
        </React.Fragment>
      ))}
    </List>
  );
}

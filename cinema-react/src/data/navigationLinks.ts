import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import React from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import TheatersIcon from '@mui/icons-material/Theaters';
import { LocalPlay } from '@mui/icons-material';

// Link to icons
// https://mui.com/components/material-icons/

export const NAVIGATION_LINKS: NavigationLink[] = [
  {
    text: 'Strona główna',
    Icon: HomeIcon,
    href: '',
  },
  {
    text: 'Filmy',
    Icon: MovieIcon,
    children: [
      { text: 'Lista', Icon: FormatListBulletedIcon, href: '/films' },
      { text: 'Dodaj', Icon: CreateNewFolderIcon, href: '/films/create' },
    ],
  },
  {
    text: 'Sale',
    Icon: MeetingRoomIcon,
    children: [
      { text: 'Lista', Icon: FormatListBulletedIcon, href: '/hall' },
      { text: 'Dodaj', Icon: CreateNewFolderIcon, href: '/hall/create' },
    ],
  },
  {
    text: 'Seanse',
    Icon: TheatersIcon,
    children: [
      { text: 'Lista', Icon: FormatListBulletedIcon, href: '/seans' },
      { text: 'Dodaj', Icon: CreateNewFolderIcon, href: '/seans/create' },
    ],
  },
  {
    text: 'Bilety',
    Icon: LocalPlay,
    href: '/tickets',
  }
];

export interface NavigationLink {
  text: string;
  Icon?: React.ComponentType;
  href?: string;
  children?: NavigationLink[];
}

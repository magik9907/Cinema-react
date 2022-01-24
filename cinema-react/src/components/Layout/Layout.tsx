import React, { useState } from 'react';
import styles from './Layout.module.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from '../../routing/Routing';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import { Box } from '@mui/system';

export default function Layout() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  return (
    <div>
      <Router>
        <Box
          sx={{
            color: 'text.primary',
            bgcolor: 'background.paper',
          }}
          className={`${styles.container} `}
        >
          <Box
            sx={{
              color: 'text.secondary',
              bgcolor: 'background.default',
            }}
            className={`${styles.nav} ${isNavVisible ? styles.hiddenNav : ''}`}
          >
            <Nav
              setIsNavVisible={setIsNavVisible}
              isNavVisible={isNavVisible}
            />
          </Box>
          <div className={`${styles.flex} ${styles.bodyContainer}`}>
            <Header
              setIsNavVisible={setIsNavVisible}
              isNavVisible={isNavVisible}
            />
            <main className={styles.main}>
              <Routing />
            </main>
            <Footer />
          </div>
        </Box>
      </Router>
    </div>
  );
}

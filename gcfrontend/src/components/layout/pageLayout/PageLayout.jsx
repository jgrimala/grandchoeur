// src/components/PageLayout.jsx

import React from 'react';
import { Link } from 'react-router-dom';  // Make sure to install react-router-dom to use Link
import Header from '../header/Header';

/**
 * PageLayout.jsx
 * components\layout\PageLayout.jsx
 */

const PageLayout = ({ children }) => {
  return (
    <div>
      <Header/>
      <main>
        {children}  {/* This will render the child components */}
      </main>
      <footer>
        {/* <Footer /> */}
      </footer>
    </div>
  );
}

export default PageLayout;
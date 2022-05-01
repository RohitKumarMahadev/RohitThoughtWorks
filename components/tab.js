import React from 'react';

import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import utilStyles from '../styles/utils.module.css'

const styles = {
  tabs: {
    width: '800px',
    display: 'inline-block',
    marginRight: '30px',
    verticalAlign: 'top'
  },
  links: {
    margin: 0,
    padding: 0
  },
  tabLink: {
    lineHeight: '30px',
    padding: '0px',
    cursor: 'pointer',
    border: 'none',
    textDecoration:'underline',
    textDecorationColor:'gray',
    // borderBottom: '2px solid transparent',
    display: 'inline-block',
    backgroundColor:'white',
    fontSize:'1.2rem'
  },
  activeLinkStyle: {
    // borderBottom: '2px solid #333'
  },
  visibleTabStyle: {
    display: 'inline-block'
  },
  content: {
    padding: '0 5px'
  },
};

const App = () => (
  <div id="plain-react">
    <Tabs
      activeLinkStyle={styles.activeLinkStyle}
      visibleTabStyle={styles.visibleTabStyle}
      style={styles.tabs}
    >
      <div style={styles.links}>
        <TabLink to="tab1" style={styles.tabLink}>
          Notes
        </TabLink>
        <TabLink to="tab2" default style={styles.tabLink}>
          Books
        </TabLink>
        <TabLink to="tab3" style={styles.tabLink}>
          Now
        </TabLink>
      </div>

      <div style={styles.content}>
        <TabContent for="tab1">
          <p>
            Lorem ipsum dolor sit amet, in vel malorum adipiscing. Duis deleniti
            ei cum, amet graece nec an.
          </p>
          <p>
            Pro vitae percipit no. Per ignota audire no. Ex hinc mutat delicata
            sit, sit eu erant tempor vivendo.
          </p>
        </TabContent>
        <TabContent for="tab2">
          <p>¯\_(ツ)_/¯</p>
        </TabContent>
        <TabContent for="tab3">
          <p>(╯°□°）╯︵ ┻━┻)</p>
        </TabContent>
      </div>
    </Tabs>
  </div>
);

export default App;
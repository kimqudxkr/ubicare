import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { moduleManager } from 'redux/action/modules';
import AuthRoute from '../session/AuthRoute';
import AppHeader from './appHeader/AppHeader';
import AppFooter from './appFooter/AppFooter';
import NotFound from '../error/NotFound';
import MainInfo from './mainInfo/MainInfo';
import { MainContainer } from './Main.css.js';
import './common.css';

const Main = (props) => {
  const dispatch = useDispatch();
  const [ mainTitle, setMainTitle ] = useState('');
  const [ titlePrefix, setTitlePrefix ] = useState('');
  const loginStatus = useSelector(store => store.loginManager.status); // 로그인 데이터
  const modules = useSelector(store => store.modules); // 장치 데이터

  useEffect(() => {
    dispatch(moduleManager("", loginStatus.authIdx));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (modules.status !== 'SUCCESS') {
    return null;
  }

  return (
    <MainContainer>
      <Router>
        <AppHeader mainTitle={mainTitle} titlePrefix={titlePrefix} {...props} />
          <Switch>
            <AuthRoute
                exact path="/"
                render={props => <MainInfo modules={modules} setTitlePrefix={setTitlePrefix} {...props} />}
              />
            <Route render={NotFound} />
          </Switch>
        <AppFooter setMainTitle={setMainTitle} {...props} />
      </Router>
    </MainContainer>
  )
}

export default Main;
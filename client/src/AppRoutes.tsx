import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import {PATHS} from './routeConstants';
import Scan from './pages/scan';
import {Layout} from './components/Layout/Layout.component';
import Response from './pages/scan/response';

export const AppRoutes = () => (
  <Suspense fallback={<div style={{ textAlign: 'center' }}>Loading</div>}>
    <Layout>
      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.SCAN}>
          <Route path=":time" element={<Scan />} />
        </Route>
        <Route path={PATHS.SCAN_RESPONSE} element={<Response />} />
        {/*<PrivateRoute*/}
        {/*  path={PATHS.CUSTOMER_DASHBOARD}*/}
        {/*  component={CustomerDashboard}*/}
        {/*/>*/}
      </Routes>
    </Layout>
  </Suspense>
);

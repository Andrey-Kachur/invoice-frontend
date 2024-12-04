import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import InvoicesHome from './pages/Dashboard/InvoicesHome';
import InvoicesList from './pages/Invoices';

import DefaultLayout from './layout/DefaultLayout';

import store from './store';
import PrivateRoute from './components/PrivateRoutes';

const queryClient = new QueryClient();

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Routes>
          <Route
            index
            element={
              <>
                <PageTitle title="Signin | Invoices App" />
                <SignIn />
              </>
            }
          />
          <Route element={<PrivateRoute />}>
            <Route
              path="/home"
              element={
                <DefaultLayout>
                  <PageTitle title="Invoices App" />
                  <InvoicesHome />
                </DefaultLayout>
              }
            />

            <Route
              path="/invoices"
              element={
                <DefaultLayout>
                  <PageTitle title="Invoices App | All Invoices" />
                  <InvoicesList />
                </DefaultLayout>
              }
            />
          </Route>
        </Routes>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

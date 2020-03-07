import GAListener from 'components/GAListener';
import { MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const LoginPage = React.lazy(() => import('pages/login'));
const SignupPage = React.lazy(() => import('pages/signup'));
const AlertPage = React.lazy(() => import('pages/AlertPage'));
const ForGetPage = React.lazy(() => import('pages/ForgetPassword'));
const ResetPage = React.lazy(() => import('pages/ResetPassword'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/ButtonGroupPage'));
const VendingMachinePage = React.lazy(() => import('pages/VendingMachine'));
const MapPage = React.lazy(() => import('pages/MapPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/DropdownPage'));
const FormPage = React.lazy(() => import('pages/FormPage'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/ModalPage'));
const ProgressPage = React.lazy(() => import('pages/ProgressPage'));
const TablePage = React.lazy(() => import('pages/TablePage'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage'));
const PdfPage = React.lazy(() => import('./pages/PdfPage'));
const Simulator = React.lazy(() => import('./pages/Simulator'));
const Simulator2 = React.lazy(() => import('./pages/Simulator2'));


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            
             <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/check_email" component={ForGetPage} />
                <Route exact path="/reset" component={ResetPage} />
            {/* <MainLayout breakpoint={this.props.breakpoint}> */}
              
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/map" component={MapPage} />
                <Route exact path="/vendingmachine" component={VendingMachinePage} />
                <Route exact path="/typography" component={TypographyPage} />
                <Route exact path="/alerts" component={AlertPage} />
                <Route exact path="/tables" component={TablePage} />
                <Route exact path="/badges" component={BadgePage} />

                <Route
                  exact
                  path="/button-groups"
                  component={ButtonGroupPage}
                />
                <Route exact path="/dropdowns" component={DropdownPage} />
                <Route exact path="/progress" component={ProgressPage} />
                <Route exact path="/modals" component={ModalPage} />
                <Route exact path="/forms" component={FormPage} />
                <Route exact path="/input-groups" component={InputGroupPage} />
                <Route exact path="/charts" component={ChartPage} />
                <Route exact path="/pdf" component={PdfPage} />
                <Route exact path="/simulator" component={Simulator} />
                <Route exact path="/simulator2" component={Simulator2} />

            {/* </MainLayout> */}
            </React.Suspense>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);

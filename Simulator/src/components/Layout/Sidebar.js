import logo200Image from 'assets/img/logo/logosvm.png';
import sidebar14 from 'assets/img/sidebar/sidebar-14.png'
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import React from 'react';
import SourceLink from '../SourceLink.js'
import {
  MdDashboard,
  MdMap,
  MdInbox
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebar14}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


// define sidebar buttons
const navItems = [
  { to: '/dashboard', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/map', name: 'map', exact: false, Icon: MdMap },
  { to: '/addvm', name: 'Add VM', exact: false, Icon: MdInbox }
];

const bem = bn.create('sidebar');

// sidebar class that holds all page buttons
class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white display-6">
                Smart VM
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
           
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;

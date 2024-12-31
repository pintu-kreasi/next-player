import Link from 'next/link';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import MenuItem from '@/components/molecules/menu-item/MenuItem';

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: 'Dashboard',
    icon: 'far fa-caret-square-down nav-icon',
    children: [
      {
        name: 'Player',
        icon: 'fas fa-hammer nav-icon',
        path: '/dashboard/player',
      },

      {
        name: 'Team',
        icon: 'fas fa-cogs nav-icon',
        path: '/dashboard/team',
      },
    ],
  },
];

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(Image)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {

  return (
    <aside className={`main-sidebar elevation-4 sidebar-dark-primary`}>
      <Link href="/" className="brand-link">
        <StyledBrandImage
          src={"/images/player.png"}
          alt="AdminLTE Logo"
          width={33}
          height={33}
          rounded
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <StyledUserImage
              src={"https://www.tutorialrepublic.com/examples/images/avatar/2.jpg"}
              // fallbackSrc="/img/default-profile.png"
              alt="User"
              width={34}
              height={34}
              rounded
            />
          </div>
          <div className="info">
            <Link href={'/profile'} className="d-block">
               admin@mail.com
            </Link>
          </div>
        </div>

        <div className="form-inline">
          {/* <SidebarSearch /> */}
        </div>

        <nav className="mt-2" style={{ overflowY: 'hidden' }}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;

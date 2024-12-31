import React, { useState } from "react";
import { withRouter } from "next/router";
import Link from 'next/link'
// import UserDropdown from '@app/modules/main/header/user-dropdown/UserDropdown';
import UserDropdown from "../modules/main/header/user-dropdown/UserDropdown";


const AdminHeader = (props: any) => {

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <div
        style={{ width: '100%', display: 'flex', alignItems: 'center' }}
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <span
              className="nav-link"
              data-widget="pushmenu"
              aria-label="Menu Hide Bar"
              role="button"
            >
              <i className="fas fa-bars" />
            </span>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link href="/profile" className="nav-link">
              Profile
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <UserDropdown />
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(AdminHeader);

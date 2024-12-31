import { useState } from 'react';
import Link from 'next/link'
import { StyledBigUserImage, StyledSmallUserImage } from '../../../../styles/common';
import { toast, ToastContainer } from 'react-toastify';
import {
  UserBody,
  UserFooter,
  UserHeader,
} from '../../../../styles/dropdown-menus';
import Dropdown from 'react-bootstrap/Dropdown';
import { RemoveCookies } from '@/app/services/CookiesManager';
import { useRouter } from 'next/navigation';

const UserDropdown = () => {
  const router = useRouter()

  const logout = () => {
    RemoveCookies('accessToken')
    toast.error('Logout is succeed!');
    setTimeout(() => {
      router.push('/')
    }, 2000);
  }

  return (
    <Dropdown>
      <ToastContainer />
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <StyledSmallUserImage
          slot="head"
          src={"https://www.tutorialrepublic.com/examples/images/avatar/2.jpg"}
          // fallbackSrc="/img/default-profile.png"
          alt="User"
          width={25}
          height={25}
          rounded
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div slot="body" style={{minWidth: '250px'}}>
          <UserHeader className=" bg-primary">
            <StyledBigUserImage
              src={"https://www.tutorialrepublic.com/examples/images/avatar/2.jpg"}
              // fallbackSrc="/img/default-profile.png"
              alt="User"
              width={90}
              height={90}
              rounded
            />
            <p>
              user@mail.com
              <small>
                <span>Member since </span><br />
                <span>2 Oktober 2024</span>
              </small>
            </p>
          </UserHeader>
          <UserBody>
            <div className="row">
              <div className="col-4 text-center">
                <Link href="/">Clubs</Link>
              </div>
              <div className="col-4 text-center">
                <Link href="/">Players</Link>
              </div>
            </div>
          </UserBody>
          <UserFooter>
            <button
              type="button"
              className="btn btn-default btn-flat"
            >
              Profile
            </button>
            <button
              type="button"
              className="btn btn-default btn-flat float-right"
              onClick={() => logout()}
            >
              Logout
            </button>
          </UserFooter>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;

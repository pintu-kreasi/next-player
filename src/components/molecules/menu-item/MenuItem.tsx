/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { IMenuItem } from '@/components/modules/main/menu-sidebar/MenuSidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation'


const MenuItem = ({ menuItem }: { menuItem: IMenuItem }) => {
  const [isMenuExtended, setIsMenuExtended] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const [isMainActive, setIsMainActive] = useState(false);
  const [isOneOfChildrenActive, setIsOneOfChildrenActive] = useState(false);
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuExtended(!isMenuExtended);
  };

  const handleMainMenuAction = () => {
    if (isExpandable) {
      toggleMenu();
      return;
    }
    router.push(menuItem.path ? menuItem.path : '/')
  };

  useEffect(() => {
    if (!isMainActive && !isOneOfChildrenActive) {
      setIsMenuExtended(false);
    }
  }, [isMainActive, isOneOfChildrenActive]);

  useEffect(() => {
    setIsExpandable(
      Boolean(menuItem && menuItem.children && menuItem.children.length > 0)
    );
  }, [menuItem]);

  return (
    <li className={`nav-item${isMenuExtended ? ' menu-open' : ''}`}>
      <a
        className={`nav-link${
          isMainActive || isOneOfChildrenActive ? ' active' : ''
        }`}
        role="link"
        onClick={handleMainMenuAction}
        style={{ cursor: 'pointer' }}
      >
        <i className={`${menuItem.icon}`} />
        <p>{menuItem.name}</p>
        {isExpandable ? <i className="right fas fa-angle-left" /> : null}
      </a>

      {isExpandable &&
        menuItem &&
        menuItem.children &&
        menuItem.children.map((item) => (
          <ul key={item.name} className="nav nav-treeview">
            <li className="nav-item">
              <Link className="nav-link" href={`${item.path}`}>
                <i className={`${item.icon}`} />
                <p>{item.name}</p>
              </Link>
            </li>
          </ul>
        ))}
    </li>
  );
};

export default MenuItem;

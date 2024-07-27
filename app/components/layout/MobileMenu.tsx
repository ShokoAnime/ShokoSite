import cx from 'classnames';
import { Link, useLocation } from '@remix-run/react';
import { navRoutes } from './Layout.data';
import Button from '../common/Button';
import Icon from '../common/Icon';
import { mdiAlphaX } from '@mdi/js';

type MobileMenuProps = {
    showMenu: boolean;
    onClose: (val: boolean) => void;
}

const MobileMenu = ({ showMenu = false, onClose }: MobileMenuProps) => {
    const { pathname: currentURL } = useLocation();
    return (
        <div className={`${showMenu ? '' : 'hidden'} fixed top-0 right-0 z-40 bg-shoko-bg h-full`}>
            <div className='flex flex-row-reverse'>
                <Button buttonType='text' className='size-16' onClick={_ => onClose(!showMenu)}>
                    <Icon
                        icon={mdiAlphaX}
                    />
                </Button>
            </div>
            <nav className={cx(`flex flex-col items-end justify-center lg:hidden mx-8 mr-[25px]`)}>
                {navRoutes.map(({ route, title, icon }) => {
                    const isExternal = route.startsWith('http');
                    const isActive = isExternal ? false : currentURL.startsWith(route);
                    return <Link key={route} to={route}
                        className={cx(
                            'text-shoko-text-header hover:text-shoko-link-hover flex items-center gap-x-2',
                            isActive && '!text-shoko-link',
                        )}>
                        {icon && icon}
                        <span>{title}</span>
                    </Link>
                })}
            </nav>
        </div>
    )
}

export default MobileMenu;
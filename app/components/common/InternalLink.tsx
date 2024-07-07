import { Link } from "@remix-run/react";
import { InternalLinksProps } from "~/types/layout";
import cx from 'classnames'

export const InternalLink = ({ title, route, isActive }: InternalLinksProps) => (
    <Link
        key={title}
        to={route}
        className={cx(
            'text-shoko-text-header hover:text-shoko-link-hover flex items-center gap-x-2',
            isActive && '!text-shoko-link',
        )}
    >
        {title}
    </Link>
);

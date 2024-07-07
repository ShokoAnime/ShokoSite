import { ExternalLinksProps } from "~/types/layout";

export const ExternalLink = ({ title, url, icon }: ExternalLinksProps) => (
    <a
      key={title}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden text-shoko-text-header hover:text-shoko-link-hover lg:flex lg:items-center gap-x-2"
    >
      {icon}
      <span>{title}</span>
    </a>
  );
  
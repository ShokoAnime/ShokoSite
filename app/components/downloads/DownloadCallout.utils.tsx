import { mdiAlertCircleOutline, mdiLightbulbAlertOutline } from '@mdi/js';

type Message = {
  icon: string;
  content: JSX.Element;
};

type MessageObject = {
  [key: string]: Message;
};

const messages: MessageObject = {
  'shoko-server': {
    icon: mdiLightbulbAlertOutline,
    content: (
      <span className="text-shoko-text text-base">
        Learn how to make your own Shoko application / plugin using our extensive API.{' '}
        <a
          className="text-shoko-link font-medium"
          href="/"
          target="_blank"
          rel="noopener"
        >
          Click Here to learn more!
        </a>
      </span>
    ),
  },
  legacy: {
    icon: mdiAlertCircleOutline,
    content: (
      <span className="text-shoko-text text-base">
        Please be aware, items listed here are for preservation purposes only and are not supported by the Shoko team.
      </span>
    ),
  },
  default: {
    icon: mdiLightbulbAlertOutline,
    content: (
      <span className="text-shoko-text text-base">
        Learn how to make your own Shoko application / plugin using our extensive API.{' '}
        <a
          className="text-shoko-link font-medium"
          href="/"
          target="_blank"
          rel="noopener"
        >
          Click Here to learn more!
        </a>
      </span>
    ),
  },
};

export const downloadMessage = (id: string) => {
  return messages[id] || messages.default;
};

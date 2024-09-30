import { useBackground } from '~/hooks/useBackground';
import PageHero from '~/components/layout/PageHero';
import Divider from '~/components/layout/Divider';
import { useEffect, useState } from 'react';
import HistorySection from '~/components/about/HistorySection';
import { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
  const pageTitle = 'About Shoko';
  const pageDescription = 'Spend some time learning about Shoko\'s development over the years.';
  const pageImage = `https://shokoanime.com/images/banners/banner-8.jpg`;
  const pageURL = 'https://shokoanime.com/about';

  const ogImageUrl = `https://shokoanime.com/api/ogImage?title=${encodeURIComponent(`${pageTitle}`)}&summary=${
    encodeURIComponent(pageDescription)
  }&pageUrl=${encodeURIComponent(pageURL)}&backgroundImage=${encodeURIComponent(`${pageImage}`)}`;

  return [
    { title: pageTitle },
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:type', content: 'article' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: pageTitle },
    { property: 'twitter:description', content: pageDescription },
    { property: 'twitter:image', content: ogImageUrl },
  ];
};

export default function About() {
  const [tab, setTab] = useState('The Early Years');

  const headers = ['The Early Years', 'The JMM Suite', 'Hello Shoko', 'Modern Shoko'];

  return (
    <div className="flex flex-col gap-8 lg:gap-16">
      <PageHero
        title="About Shoko"
        description="Spend some time learning about Shoko’s development over the years."
      />
      <div className="flex flex-col justify-center gap-6 md:flex-row">
        {headers.map((header) => (
          <button
            key={header}
            className={`font-header text-shoko-20 font-semibold lg:text-shoko-24 ${
              tab === header ? 'text-shoko-link' : 'text-shoko-text'
            }`}
            onClick={() => setTab(header)}
          >
            {header}
          </button>
        ))}
      </div>
      <Divider />
      {tab === 'The Early Years' && (
        <HistorySection
          title="The Early Years"
          years="2006 - 2009"
          programs={['Initial Concept', 'AniDB Monitor', 'My Anime 2']}
        >
          <div>
            In July 2006, Iwerndly made his personal AniDB client, AniDB Monitor, available to the public. This handy
            client allowed AniDB members to easily hash their files for comparison, add them to their AniDB Mylist, and
            update their episode watched status with minimal effort. However, after achieving its initial objectives,
            the development of AniDB Monitor slowed down, and it remained inactive until 2008.
          </div>
          <div>
            In the same year, a user on the MediaPortal forums announced the development of an anime plugin called My
            Anime. It generated significant interest among users, as MediaPortal had difficulty properly cataloging
            anime, making such a plugin highly desirable. However, for reasons unknown, the the user abandoned the
            project before a working version was released.
          </div>
          <div>
            Iwerndly, who had been closely following the plugin&apos;s development, stepped in and decided to create his
            own version. Using AniDB Monitor as a base, he began work on his version of the My Anime plugin which became
            available to the public on February 13th, 2008. This marked the beginning of what later evolved into the JMM
            Suite.
          </div>
          <div>
            The plugin&apos;s popularity surged, attracting a growing userbase, along with new feature requests and bug
            reports. Iwerndly consistently worked on updates and improvements, solidifying <strong>My Anime</strong>
            {' '}
            as the go-to plugin for anime-related media. With continuous development, My Anime 2 was eventually launched
            on June 2nd, 2009, bringing significant enhancements and additions to the growing MediaPortal anime
            community.
          </div>
        </HistorySection>
      )}

      {tab === 'The JMM Suite' && (
        <HistorySection
          title="The JMM Suite"
          years="2009 - 2015"
          programs={[
            'JMM Server',
            'JMM Desktop',
            'My Anime 3',
            'JMM On Plex',
            'Nakamori',
            'Anime Buddy',
            'JMM Server Web UI',
          ]}
        >
          <div>
            As My Anime 2 continued to gain popularity, the focus of its development shifted from content consumption to
            collection management as users increasingly desired access to their anime collections outside of
            MediaPortal. However, there was no centralized database at the time, so developing a plugin or standalone
            program would require creating its own database and a method for sharing data between the two. To address
            this issue, it was decided that all server functionality would be moved out of the upcoming My Anime 3 and
            into a new, as yet unnamed program that would act a server to allow any program or plugin access to the
            database.
          </div>
          <div>
            As the project progressed, the need for a new name that would encompass both the My Anime 2 plugin and the
            unnamed server program became apparent. Thus, the name <strong>Otaku Media Manager</strong>{' '}
            was chosen and the development of the standalone server program began.
          </div>
          <div>
            When My Anime 3 was released on April 19th, 2012, users were provided access to early builds of the
            previously mentioned server program, as well as a separate program for managing their collection.
            Development continued on these three items, and with the addition of a Plex plugin, a decision was made to
            change the name of the program to Japanese Media Manager. This name better reflected the direction of the
            programs and ultimately gave birth to the JMM Server and JMM Desktop programs.
          </div>
          <div>
            As the development team expanded and incorporated new features, they created two new plugins: Nakamori for
            Kodi and Anime Buddy for the Windows app store. In addition, the team began to take on more complex tasks
            from their ever-growing to-do list.
          </div>
          <div>
            In parallel to other tasks, the team also launched a project to develop a Web UI for Shoko Server, with EC
            leading the initiative. Avael, a newly onboarded member, was assigned the coding responsibilities for the
            web-based GUI alternative. The team made rapid progress on the Web UI, and within a few weeks, a proof of
            concept was completed.
          </div>
        </HistorySection>
      )}

      {tab === 'Hello Shoko' && (
        <HistorySection
          title="Hello Shoko"
          years="2016 - 2020"
          programs={[
            'Shoko Server',
            'Shoko Server Web UI',
            'Shoko Desktop',
            'Shoko Desktop 2',
            'Nakamori',
            'ShokoMetadata',
          ]}
        >
          <div>
            For personal reasons, lwerndly took on a less active role in the project and passed the leadership torch to
            MaxPiva and EC. With the addition of new members, the JMM team tackled larger issues, including improving
            SQLite speed and providing Linux support.
          </div>
          <div>
            Additionally, the team recognized the need for a new name for the project. The original name was causing
            confusion among users about the program&apos;s capabilities, with many assuming that JMM also supported
            other Japanese media types such as manga or J-drama, which was not the program&apos;s intended purpose.
            Interestingly, the original name of the program was Anime Media Manager, but it was changed to Japanese
            Media Manager when one of the original staff members wanted to include support for manga. Due to personal
            circumstances, that staff member left the project, and the program was never updated to support manga.
          </div>
          <div>
            After a long discussion on name choices, da3dsoul suggested the name Shoko, which ended up being the only
            name the entire staff agreed on. As development moved forward, Linux support became official, and the next
            major goal for the team was optimization. Over the next couple of years, Shoko saw vast improvements in its
            speed, database design, and architecture design. Refactoring the now 12+ year old codebase became a priority
            to better resolve bugs and make Shoko more developer-friendly to encourage contribution.
          </div>
          <div>
            While work continued forward, the team decided that Shoko Desktop would eventually need to be replaced due
            to its aging codebase and problematic design, which prevented making Shoko Desktop a more modern and fast
            Windows application. The team initially decided to begin work on what was being called{' '}
            <strong>Shoko Desktop 2</strong>{' '}
            with EC leading the project and selected the same software stack as Shoko Desktop.
          </div>
        </HistorySection>
      )}

      {tab === 'Modern Shoko' && (
        <HistorySection
          title="Modern Shoko"
          years="2020 - Present"
          programs={['Shoko Server', 'Shoko Server Web UI', 'Nakamori', 'ShokoMetadata', 'Shokofin', 'ShokoRelay']}
        >
          <div>
            Development on Shoko Desktop 2 had come to a near standstill due to issues and a lack of developer time
            needed for the project. The team decided to switch the codebase and use a web stack with Electron as a
            wrapper to still provide a desktop application that would now be cross-platform. Development on Shoko
            Desktop 2 took a backseat as EC and Avael focused on the Server Web UI with development picking up again
            after version 1.00 of the Server Web UI was released.
          </div>
          <div>
            A proof of concept was released and received positively, providing users with minimal collection
            interaction. Development continued with Shoko Desktop 2 seeing multiple design revisions, both public and
            private, for a while. Eventually, the Shoko team, not wanting to support what was essentially two separate
            Web UIs, decided to merge the two projects together into a new Web UI encompassing features from Shoko
            Server and Shoko Desktop.
          </div>
          <div>
            In 2020, the Shoko team welcomed two new members - Mohan and Revam. Mohan was responsible for building the
            current Web UI, as well as starting work on a new plugin to support Jellyfin. Revam also contributed to this
            unnamed plugin and eventually became the primary maintainer, overseeing all development on it. As
            development continued, the team decided to name the plugin Shokofin, and it was released towards the end of
            2021. It quickly became one of the most popular plugins for the Shoko system.
          </div>
          <div>
            In the meantime, the team continued to work on the Web UI, with multiple design revisions made both publicly
            and privately. In mid-2022, a beta version of the new Web UI was publicly released. Development on both the
            plugin and the Web UI continues to this day, with the Shoko team dedicated to improving and enhancing their
            software for their users.
          </div>
        </HistorySection>
      )}
    </div>
  );
}

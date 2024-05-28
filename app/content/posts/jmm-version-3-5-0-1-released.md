---
title: "JMM Version 3.5.0.1 Released"
quick: "Major release with new site layout, localization, and enhancements for Plex and Kodi."
image: "jmm-version-3-5-0-1.webp"
date: "2016-05-19"
anime: "Cyborg 009"
tags: [ "Nakamori", "Shoko Desktop", "Shoko on Plex", "Shoko Server" ]
---

**UPDATE: If JMM Server will not start for you please re-download version 3.5.0.1. The initial upload was missing a .dll
file that has since been added.**

After a very successful beta, JMM version 3.5.0.1 is available for download!

Before I go into the details of what's new, we'd like to thank everyone that participated in the 3.5 beta. We received a
lot of feedback that helped improve JMM with changes made and bugs discovered and fixed as a direct result. As a result,
we'll continue releasing beta builds for future versions, so look forward to that.

JMM version 3.5.0.1 is a major release with many additions, changes, and bug fixes. This post will highlight some of the
bigger additions and changes in 3.5.0.1. For a complete list, check
the [changelog](https://docs.shokoanime.com/changelog).

##### New Site Layout

We've updated the site layout with a more modern and minimalist design that not only loads faster but is also more
responsive. There are still some kinks here and there that we'll be ironing out in the next week or so. If you notice
any issues, please report them on our Discord server.

##### Closing The Forums

We've decided to close the forums. Time constraints have caused them to become neglected, and the popularity forums once
had is slowly dwindling. We encourage everyone to come join us on Discord!

##### JMM Is Now Localized

While initially introduced in an earlier version of JMM, JMM is now fully localized with support for the following
languages:

- English
- English (UK)
- Dutch
- French
- German
- Italian
- Polish
- Russian
- Spanish

With the exception of English and English (UK), the additional languages have been machine translated. This was done in
order for us to include the additional languages without having to wait for proper translations from our community.
However, we would like to include more accurate translations in future versions of JMM and so have provided what we
believe is the best method to allow our community to help provide better translations.

##### Metro View Comes To Series

![JMM Desktop - Collection Simple View](/images/blog/jmm-version-3-5-0-1-simple-view.webp)

You can now toggle the Metro View while viewing your series in the Collections tab!

##### JMM Desktop's Download Functions

Users can once again browse and download from BakaBT and Animebytes thanks to a fix provided by Baine. As requested,
Sukebei Nyaa has also been added to the list of available trackers, and AnimeSuki was removed due to the site having
removed all torrents years ago and no longer providing an index.

##### More Control With Plex and Kodi

One issue that's been brought up before is how long JMM Server takes to initialize your database if you have a big
collection. Users can now enable/disable Plex and Kodi, which should drastically reduce the amount of time it takes to
initialize your database.

##### CrossRef Errors Fixed

If you had manually linked files in a previous database and then switched databases or created a new one, your
previously linked files would end up with an Anime ID of 0 and not link properly, causing issues with JMM reporting
missing files. Thanks to Baine, this issue has been fixed, and you should be able to properly re-link your files.

##### Plex Plugin Updated

Version 3.5.0.1 introduces a lot of new Plex updates, adding the ability to tie Plex users to JMM users, display
additional information such as roles and genres, and better thumbnail support.

##### Don't Forget About Nakamori

Nakamori has gone through a bit of a name change and dropped the plugin part from its name. A lot of work has been put
into the latest version of Nakamori, which has received multiple updates to enhance user experience and make it
compatible with JMM 3.5.0.1. The official Nakamori website has also launched, which you can check out using the
following link: [Nakamori Website](https://shokunin.monogatari.pl/nakamori/). In addition, we will be transitioning the
support and install pages to the official ones on the Nakamori website.

Again, these are just some of the additions and changes in 3.5.0.1. For a complete list, check
the [changelog](https://docs.shokoanime.com/changelog).

##### Contributors

This release was made possible by the following people: Baine, BigRetroMike, and the community testers.

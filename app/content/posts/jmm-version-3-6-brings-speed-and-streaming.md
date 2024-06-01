---
title: "JMM Version 3.6 Brings Speed and Streaming"
quick: "Major update with speed improvements, streaming support, and enhanced UI."
image: "jmm-version-3-6-stable.webp"
date: "2016-09-02"
anime: "High School of the Dead"
tags: [ "My Anime 3", "Nakamori", "Shoko Desktop", "Shoko on Plex", "Shoko Server" ]
devs: [ "Avael", "Baine", "BigRetroMike", "Craige1", "da3dsoul", "ElementalCrisis", "JMediaManager", "MaxPiva", "RandRandom" ]
---

Hello Everyone,

After a very successful beta that helped in identifying previously unknown issues and extended internal testing, we're
pleased to announce that JMM Version 3.6.0.2 is available for download! Version 3.6 is by far the biggest update we've
ever released containing over 40,000 lines of code added, changed, and removed compared to the previous version. While
we generally try to limit the number of new features added in the next version to reduce unforeseen issues, we didn't
want to hold back completed features and decided to do the extra work that was required to release this update.

**Please note, version 3.6.0.2 makes irreversible changes to your database, meaning if you upgrade, your database will
be unusable on older versions of JMM.**

The [changelog](https://docs.shokoanime.com/changelog) contains the full list of changes included in version 3.6.0.2.
Here are some of the highlights we wanted to mention.

#### Collection Caching

Users will now see and experience a significant speed boost when viewing and maintaining their collection. With the
exception of Anime Buddy, every program and plugin has been updated to benefit from the cache addition. These changes
will be most noticeable for users with bigger collections as that’s where the benefits of the collection cache really
shine. However, even users with smaller collections will still benefit from it with the near-instant load times.

Please note, collection caching is a new feature that we're excited to share. While we’ve performed exhaustive testing,
there are bound to be bugs and issues we never encountered. If you happen to encounter any issues, please report them on
GitHub so we can investigate.

#### Streaming

One of the most requested additions to JMM is finally available! Users will now be able to stream their collection to
any JMM supported program or plugin with watched states being updated as normal. Check out
our [streaming documentation](https://shokoanime.com) to get started. As this is a new feature, we’ll continue to make
updates as needed to make sure we cover all issues that might arise.

Please note, streaming is a new feature, and while we’ve performed exhaustive testing, there are bound to be bugs and
issues we never encountered. If you happen to encounter any issues, please report them on GitHub so we can investigate.

#### Series Relation Settings

Users can now specify which types of relations are excluded when they've enabled the option "Automatically place related
series into the same groups" allowing for finer control over group management. By default, when enabled, every relation
will be grouped together so users who already had this setting enabled should take a moment to go through the available
options and select the relations they don't want grouped.

#### Icon Refresh & UI Improvements

Both JMM Desktop and JMM Server have had nearly every icon replaced to give it a more updated look, along with dozens of
UI fixes to improve user experience. We also added more help locations for functionality that may be considered
confusing to some users and direct links within JMM Desktop to both the online documentation and our Discord server.

Make sure to join us on Discord if you need help and post any issues you might encounter on GitHub.

#### Database Backup

JMM will now back up your database when upgrading to a new version. This is an automatic process and requires no
additional input on the user side. Depending on your database type, you can find the backup in the following locations:

|Database Type|Backup Location|
|:----|:----|
|SQLite|JMM Server Install Directory\DatabaseBackup|
|MySQL|JMM Server Install Directory\DatabaseBackup|
|SQL Server|C:\Program Files\Microsoft SQL Server\MSSQL10.MSSQLSERVER\MSSQL\Backup|


The exact location for SQL Server will change depending on what version of SQL Server you are running.

#### Reducing AniDB Bans

We've made some changes to how JMM accesses AniDB to reduce the chance of receiving a temporary AniDB ban while using
JMM. Connection attempts will now be made every 2.5 seconds, which has shown a drastic reduction in the chance of
receiving an AniDB temporary ban. During our tests, we were able to import over 1000 files, hash every file, and
download file and series information without ever receiving a temporary ban. We'll continue to work on improving this
function as well as optimize it for use when importing a low number of files or updating a single series.

**Please note, AniDB tracks your IP, so importing files and either accessing AniDB via your browser or another program
will still result in a temporary ban for excessive connection attempts!**

#### My Anime 3 Update

At the moment, the updated version of My Anime 3 is hosted locally until we can update it on the MediaPortal website.
Also, since the last update, we've had to drop support for a couple of skins as the skins are no longer updated. The
amount of work to update them is more effort than it's worth. At the moment, My Anime 3 only supports the following
skins:

* Default
* Avalon
* StreamedMP
* Titan

If you'd like to see more skin support, feel free to request it or add support for it yourself.

#### Known Issues

* If .NET Framework 4.6.1 is installed during JMM Server install, you might need to restart your computer for the
  install to complete.
* Large databases will take some time to update to the caching system, plan accordingly.
* Video Player Integration for watched states does not work. Our previous method of hacking together this feature has
  become too cumbersome to continue to fix with each update, so we're working on a better solution that gives us more
  control. Until then, you'll need to manually mark each file you watch.

JMM is open source, and we're always looking for more help, not just with coding!

#### New Site Incoming

We've been working on a much-improved site that we'll be debuting here very soon. Until then, the site will not be
updated as we're focusing efforts on the new site. The only exception will be any updates to the JMM suite.

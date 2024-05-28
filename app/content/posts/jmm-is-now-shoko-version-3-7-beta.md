---
title: "JMM is Now Shoko! Version 3.7 Beta"
quick: "JMM is now Shoko, with version 3.7 beta introducing cloud support and a new Web UI."
image: "shoko-version-3-7-beta.webp"
date: "2016-11-07"
anime: "Code Geass"
tags: [ "Beta", "My Anime 3", "Shoko Desktop", "Shoko Server", "Web UI" ]
---

It's been a little over two months since the last blog post and the team has been hard at work on the next version,
version 3.7. However, as you can probably guess, besides continued development on the program, there have been quite a
few other changes that have been made with the biggest being the **new name**.

##### Starting With Version 3.7, JMM Will Now be Known as Shoko.

Over the past couple of months, starting around mid-development of Version 3.6, we started talking about a possible name
change to give the program a unique identity. While you could argue that Japanese Media Manager is a unique identity, it
led to some confusion about what exactly our program did and did not do. The common misconception we noted was that
because of the name, users assumed JMM supported other types of Japanese media such as Manga and/or J-Drama, which was
never the original intended goal. In fact, the original name of the program was Anime Media Manager but was only changed
to Japanese Media Manager when one of the original staff members wanted to include support for manga. Due to personal
circumstances, that staff member was never able to add support for it.

The staff suggested dozens of names, and many arguments for and against these suggestions were made. There were also
multiple times when the staff did agree on a new name only to find out that name was already taken or being used by
another anime-related site. **Shoko**, which had been previously suggested by **da3dsoul**, was brought up again, and
while Shoko.com was taken, [ShokoAnime.com](https://ShokoAnime.com) was not. **Shoko** is the Japanese word for *
*Archive**, which we all agreed describes the program pretty accurately as we archive our collection. We've also changed
our tagline to reflect our new name, **Your Archive, Your Way**. Since our initial beginning as a Media Portal plugin,
we've seen tremendous growth over the years and now offer support for multiple programs and plugins allowing our users
to view and watch their anime collection however they'd like.

While our primary domain for now is still <https://jmediamanager.org>, we suggest updating your bookmarks to our new
domain name <https://ShokoAnime.com> as we'll be making it the primary domain name very soon. Over the next couple of
weeks, we'll be making all the public changes, the underlying code will however **not be** changing at this time as that
alone is a time-consuming process.

##### Our New Look

As you can see, we've updated the look and design of our website.

While most of the changes are either behind the scenes or things you probably won't notice, there have been noticeable
changes. Each program and plugin now has its own landing page complete with information, screenshots, and relevant links
for users. This was done to address one of the main complaints we received regarding the difficulty in finding certain
information on the website. We're also completely **mobile friendly** and **tablet friendly** now, which should please
users viewing our site on those devices. We're still in the process of updating the documentation and various other
parts of the website to reflect the new name, so no need to report pages that still say JMM, unless the page in question
also says Shoko.

Please let us know what you think in the Website Development channel on Discord; we're still making adjustments.

##### Shoko Version 3.7 Beta Available

After a long and extensive alpha period, we're happy to release Version 3.7 beta for everyone to try!

While not as jam-packed as Version 3.6, there have been a lot of additions, changes, fixes, and even some removals in
Version 3.7. Please note that the wording in Server and Desktop has not been updated yet, so it will still say JMM
instead of Shoko.

As usual, we'll cover the big ones below, but we suggest taking a look at the
redesigned [changelog](https://docs.shokoanime.com/changelog) page for all the changes.

##### Cloud Support

Shoko now supports cloud hosting!

Cloud support is the main feature of Version 3.7 and allows users to add an Amazon, Google Drive, or One Drive account,
map some import folders, and use it for hosting their anime collection. Please read the
updated [Configuring Shoko Server](https://docs.shokoanime.com/server/config.html) page for instructions on how to do
this.

##### Web UI Included

Version 3.7 includes support for our Web UI, which we recommend everyone to check out as it will be replacing the
standard Shoko Server UI in the future.

You can access the Web UI by typing **localhost:8111** in your browser after Shoko Server has finished loading. We're
asking our users to play around with it and report back any issues or suggestions you might have in
the [Web UI Repository](https://github.com/ShokoAnime/ShokoServer-WebUI) on GitHub.

##### Administrative Privileges No Longer Needed

Both Shoko Server and Shoko Desktop will now store your settings and files in the ProgramData folder, removing the need
for administrative privileges when running either program. You will need to run both Shoko Server and Shoko Desktop as
an Administrator once to perform the migration if you've previously used Shoko, which the majority of you have.

##### Shoko Server Integrity Check

Users can now run an integrity check comparing their file's current hash to the one stored in the database from when the
file was initially hashed. Using this utility, you'll be able to identify corrupt files and replace them.

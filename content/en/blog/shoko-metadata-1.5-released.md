+++
title = "Shoko Metadata 1.5 Released"
image = "assets/images/blog/Version-401-Banner.jpg"
date = 2020-08-29T00:06:42-07:00
type = "draft"
anime = "Isuca"
category = ["Update"]
tag = ["Shoko Metadata"]
dev = ["Mohan226"]
+++

It has been a whole year since the last release! This release fixes an issue with subdirectories, now you can store your anime in whataver way you want without Plex being stupid and it also adds new features such as single season ordering.

For a complete list of changes, check out the [Changelog](https://docs.shokoanime.com/changelog/shokometadata).

##### Fixing the issue with subdirectories

Plex has a problem with series being stored in subdirectories as it detects everything as a single series. For example, if you have Naruto and Naruto Shippuden in a folder called **Naruto**, Plex would only consider it as one series named **Naruto**. Now you can store it however you want and it would work properly. It was tested with various folder structures.
It was fixed by taking inspiration from the Absolute Series Scanner.

Now that we have talked about this new fix. It is not advisable to store series in subdirectories as it breaks the **Partial Scanning** feature of Plex and it ends up scanning the whole parent folder again. Not a major problem but it does slow down scanning.

##### Single season ordering

In the previous release, the episodes of every show would be divided into seasons according to the TvDB data. Now, an option has been added to the metadata agent called **Single Season Ordering** which, instead of dividing the episodes into different seasons, puts all of the normal episodes into a **Season 1**, specials into **Season 0**, openings/endings into **Season -1**, and trailers into **Season -2**.

##### Updates to the Movie Scanner

There was problem with movies such as **Initial D Legend** where it was technically three movies but grouped into one and because of that, the movie scanner would show two of the movies as duplicates of the third one. With the update to the scanner, now they are scanner properly as three different movies.

##### API v3 and future

As some of you know may know, with the release of Shoko Server 4.0.0, we have many new API v3 endpoints which are generally faster than v2 endpoints currently being used in Shoko Metadata. These old endpoints will be changed to the new v3 endpoints which will result in faster scanning and metadata refreshes. The development of that is on-going and we will soon release it to the public as an unstable release for you to test.

##### Contributors

This release was made possible by the following people.
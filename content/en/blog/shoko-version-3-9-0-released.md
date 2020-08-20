+++
title = "Shoko Version 3.9.0 Released"
image = "assets/images/blog/Version-390-Banner.jpg"
date = 2018-06-21T20:30:32+00:00
type = "post"
anime = "Shakugan No Shana"
category = ["Update"]
tag = ["Shoko Desktop", "Shoko Server"]
+++

After a couple months of extensive testing, the latest version of Shoko has been released!

This release contains a lot of new and updated features and bug fixes making it one of our biggest updates in quite some time. While we initially tried to stay away from big releases, some outside factors such as MAL unexpectedly shutting down their API (more below) and our revamped TvDB Linking System delayed this release.

As usual, we'll cover the big changes below but for a complete list of changes, check out the [Changelog](https://docs.shokoanime.com/changelog.html).

##### New TvDB Linking System

One of the big changes users will see in Desktop 2, our replacement for the current Shoko Desktop, is a fine-tuned Community Sites System providing users with control over every aspect of series linking. While Desktop 2 is still in development, a part of this updated system has been brought into current Desktop, the TvDB Linking System. Previously, TvDB linking worked by selecting the starting point and having Shoko match each entry between AniDB and TvDB in sequential order. This leads to issues with mismatched episodes and specials due to either AniDB or TvDB having the entries listed in a different order leading to additional one-off links needed to correct this. With the new TvDB Linking System, starting points are no longer used and instead each episode and special on AniDB is matched with is corresponding entry on TvDB using the provided air dates.

![Shoko Desktop - TvDB Linking](/assets/images/blog/Version-390-Shoko-Desktop-TvDB-Linking.jpg)

In the screenshot above, the left column shows the episode listing as reported by AniDB and the right side shows the episode listing as reported by TvDB. An entry in the AniDB column is linked horizontally with the entry in the TvDB column. In this case, every episode is linked correctly so it's highlighted green. If the air date did not match, the entry in both columns would be highlighted red which would indicate looking into that entry. Most of the time, the issue lies with an incorrect air date on TvDB, however if this is not the case then please get in contact with us on **Discord**, and we can look into it.

For cases where you need to override a link, you can do it via the **Episodes** tab by clicking the **Override** button and selecting the correct episode/special.

![Shoko Desktop - TvDB Override](/assets/images/blog/Version-390-Shoko-Desktop-TvDB-Override.jpg)

As this is a brand-new system, we'll be making improvement to it, feedback is incredibly important so please let us know if you encounter any issues or have an idea to improve it.

##### Plex Integration Reworked

The Plex login and sever/library selection processes have been completely reworked. Now instead of having to extract small details from the URL's the server will manage that automatically for you!

For example now when you are logged into Plex via Shoko, it will show you what Plex servers you have access to as well as that server's libraries. The login method has been also updated to align more so with the newer versions of the Plex login methods, used by Plex and and Plex Media Server.

##### My Anime 3 Update Coming Soon

As previously announced, we'll be putting My Anime 3 into maintenance mode. Our goal will always be to make sure MA3 works with the latest version of Shoko Server, we have no plans to abandon it. We're working on fixing a few bugs and removing deprecated features to ensure MA3 always works going forward.

For our MA3 users, **you can use the latest version of Shoko Server** with the previously released version of MA3.

##### Shoko Docs Updates

Shoko Docs is getting a huge update to reflect all the recent changes and to address some of the concerns and issues new users have reported. Look forward to seeing this in the next couple of weeks.

##### My Anime List (MAL) Removed

For those who don't know, a couple weeks ago, MAL unexpectedly removed their API and then went down for several days. Shoko, like every other third-party app used that API to allow our users to sync and update their MAL lists within Shoko. With it gone, this is no longer possible and so we removed all functionality related to it. We've discussed it at lengths and have decided that we will only support MAL again if their API is improved and works as intended as the previous one was less than reliable and chalked with issues.

##### Linux Users

Please be aware, that during the install for 3.9.0 the container startup script was moved from `/root/.shoko` to `/home/shoko/.shoko` updating this should be fairly simple if you persisted your settings to disk. Though you will have to update any reference to the old settings directory `settings.json` to the new directory, a few examples of these are:

-   DatabaseBackupDirectory
-   ImagesPath
-   MySqliteDirectory
-   MyListDirectory
-   AnimeXmlDirectory

##### Download Link

[Download Shoko Version 3.9.0](https://shokoanime.com/downloads/)

##### Contributors In Alphabetical Order

This release was made possible by the following people.

**Avael, Baine, Bond, BigRetroMike, Cazzar, Da3dsoul, ElementalCrisis, JonBaby, MaxPiva & Undeadhunter**

---
title: "Shoko Version 4.1.2 Released"
quick: "Future of Shoko Desktop, sneak peek at the new Web UI and Jellyfin 10.8 support."
image: "shoko-version-4-1-2.webp"
date: "2022-06-27"
anime: "Spy x Family"
tags: [ "Shoko Server", "Shoko Desktop", "Shokofin" ]
devs: [ "Baine", "Cazzar", "Da3dsoul", "Mik1ll", "Revam" ]
---

We are pleased to announce another maintenance release! In this release, we have fixed several reported bugs and issues
that arose while working on the Jellyfin plugin, Shokofin, as well as made significant improvements to version 3 of our
API.

For a complete list of changes, check out the [Changelog](https://docs.shokoanime.com/changelog/).

##### Shoko Development

We understand that our lack of frequent updates has been a source of concern, and we have been asked about it numerous
times. To make it easier, we will list the factors that contribute to our update schedule in this blog post.

The main factor affecting our team is simply the lack of free time. As no one is paid to work on Shoko, we cannot force
anyone to work on it. However, it should be noted that Shoko, in its current form, is extremely stable and requires
minimal maintenance.

We are currently working on one of the biggest changes Shoko has ever undergone: the conversion of Shoko Desktop to the
Web UI. This is a slow process as we design, test, redesign, and retest everything. In the coming months, we hope to
start a closed beta for users to test and provide feedback. Here is a sneak peek of what the new Web UI will look like.
Please note that some mockups in this video have changed, and all data you see is simply placeholder data.

[![ShokoWebUI June](/images/blog/shoko-version-4-1-2-video-thumb.webp)](http://shokoanime.com/files/videos/ShokoWebUI-June.mp4)

##### Jellyfin 10.8 Support

Jellyfin 10.8 introduced some changes that broke compatibility with Shokofin. The latest version of ShokoFin, version
2.0.0, resolves this issue and is now available for download. Please note that due to certain changes, older versions of
Jellyfin will not work with Shokofin version 2.0.0. Therefore, only upgrade Shokofin if you have also updated Jellyfin.

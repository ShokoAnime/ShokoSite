+++
title = "Shoko Version 4.1.2 Released"
image = "assets/images/blog/Version-412-Banner.jpg"
date = 2022-06-27T13:16:46-07:00
type = "post"
anime = "Spy x Family"
category = ["Update"]
tag = ["Shoko Server", "Shoko Desktop", "Shokofin"]
dev= ["Baine", "Cazzar", "Da3dsoul", "Mik1ll", "Revam"]
+++

We're back with another maintenance release!

This time fixing a handful of reported bugs, issues that came up while working on the Jellyfin plugin, Shokofin and some major work on version 3 of our API. 

For a complete list of changes, check out the [Changelog](https://docs.shokoanime.com/changelog/).

##### Shoko Development

Our lack of frequent updates is a combination of multiple factors which we've been asked about many, many times. So we figured it would be easier to just use this blog post to list said factors. 

The biggest factor affecting our team, is simply the lack of free time. I know ths reason has been stated many times before, especially on Discord but as no one gets paid to work on Shoko, we can't force anyone to work on it nor would we want to. For those following the commit history on GitHub, its why you'll see a flood of commits within a short period and then nothing. However it should also be noted that Shoko, in it's current form is extremely stable and besides a few issues here and there, does not need regular maintenance like other projects. 

We're currently working on one of the biggest changes Shoko has ever gone through, and that's the conversion of Shoko Desktop to the Web UI. This is a slow process as we design, test, re-design, re-rest just about everything. In the upcoming months we're hoping to start a closed beta for users to test and provide feedback. 

For those who haven't seen, this is what the new Web UI will look like. Please note some of the mockups in this video have changed and all data you see if simply placeholder data.

<video width="100%" height="100%" controls>
  <source src="http://shokoanime.com/files/videos/ShokoWebUI-June.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>


##### Jellyfin 10.8 Support

Jellyfin 10.8 introduced some changes which broke compatibility with Shokofin. The latest version of ShokoFin, version 2.0.0 resolves this issue and is now available to download. Please note, that due to certian changes, older version of Jellyfin will not work with Shokofin version 2.0.0. 

**Only upgrade Shokofin if you've also updated Jellyfin.**

##### Contributors

This release was made possible by the following people.
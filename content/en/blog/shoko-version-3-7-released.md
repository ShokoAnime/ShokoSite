+++
title = "Shoko Version 3.7 Released"
image = "assets/images/blog/Version-37-Released-Banner.jpg"
date = 2016-12-26T18:02:05+00:00
type = "post"
anime = "One Punch Man"
category = ["General", "Website"]
tag = ["My Anime 3", "Shoko Desktop", "Shoko Server", "Web UI"]
+++

Hello Everyone,

While originally scheduled for earlier this month, Shoko Version 3.7 is finally available for download!

Version 3.7 is a big milestone for us for a variety of reasons that all share the same goal, to make Shoko even better for both users and developers. Shoko is open-source for a reason, we want people to contribute, to implement new ideas, fix bugs or even optimize the code. We truly appreciate each and every person that has contributed to the project and want to make it even more easier to do so by addressing some of the issues that have been brought up. While we won't be going into detail about these changes in this blog post, we do want to talk briefly about a few things you can expect from Shoko in 2017.

**Users looking for Version 3.7.1.0 won't find it, we had to "trick" the update system as we used 3.7.0.100-899 for dailies and 3.7.0.900-999 for beta. To address this problem we've introduced a new update channel system which you can read about below.**

##### Shoko Server Cross-Platform Support

We've already begun work on making Shoko Server cross-platform with the introduction of the [Web UI](https://shokoanine.com/blog/introducing-the-jmm-server-webui/) and slowly implementing [Nancy](https://github.com/NancyFx/Nancy), we hope to have Shoko Server cross-compatible in 2017. This in itself will be a lot of work but we feel it's something that we can accomplish. Anyone that would like to help can contact us on Discord for more information.

##### Code Cleanup and Documentation

One of main issues that's been reported from users wanting to contribute is the general lack of code documentation within Shoko. This is something that will be addressed as we continue to implement and migrate to Nancy, we'll also be able to remove depreciated and redundant code which should make the learning process much easier for newer users.

These are the main items we wanted to address but not everything we're working on or planning for Shoko in 2017, you'll have to keep checking back to learn more. Before we get into what's new in Version 3.7, there are a few additional items we like to address.

##### Thank You Beta Testers

We'd like to thank everyone who participated in the 3.7 Beta. Without them this release would not have been possible for at least another month at the minimum. This was our second public beta and like last the time feedback we received helped identify some otherwise hidden bugs and allowed us to make this release even better.

Some users asked if we could start hosting multiple beta's in-between updates instead of towards the end and while the it's a good idea, It's just not feasible for us due to a number of reasons with two of the main reasons being the time and maintenance required for this. However, **Avael** had been looking into automating builds to allow users to try the latest commits which after some trial and error and lots of broken builds, we launched **Daily Builds** in November.

##### Daily Builds

As a thank you to all our users, we now provide the ability for all users to try the latest builds of Shoko Server and Shoko Desktop without having to build them yourself. Our **Daily Builds** are currently setup to build after each commit and can be downloaded by checking the **Daily Build** section on our **Downloads** page. We're pretty active on [GitHub](https://github.com/ShokoAnime/) and if you've been checking our commit logs you've probably noticed the **Build Indicators**after the commit time stamp as shown in the image below. If your unsure if the latest commit has built yet, the **Build Indicator** will tell you. You can also click it to view the build log if you'd like.

![GitHub Daily Build Check](/assets/images/blog/Version-37-GitHub-Daily-Build-Check.jpg)

##### Help Wanted!

We've got a lot of work coming up and are looking for users interested in contributing to Shoko in a variety of different ways. If you'd like to help out please check the updated [Contributing](https://shokoanime.com) page or get in contact with us on Discord. We're looking for users for a number of different roles so just because you can't code doesn't mean you can't help out.

##### Version 3.7

As usual, head on over to the [changelog](https://docs.shokoanime.com/changelog) for a complete listing of all changes made in version 3.7.

##### Cloud Support

Shoko now officially supports cloud hosting meaning you no longer have to map the cloud folder using NetDrive or a similar program. You can now directly add a supported cloud provider and map the actual cloud folder for use with Shoko. We currently support the following cloud providers, we will only be adding additional cloud providers if the demand for them is high. If you'd like to add support for a particular cloud provider, contact us on Discord.

-   Amazon
-   Google Drive
-   One Drive

Please note, not all supported cloud providers offer the same speeds and service. Please read the updated [Configuring Shoko Server](https://docs.shokoanime.com/server/config) page for instructions on how to use a cloud provider.

##### MPV Integration, Zoom Player Support and Video Player Changes

After having to constantly fix the previously supported video players with almost every release due to something we changed or an update to the video player itself **we're no longer offering full integration** for video players that **do not have a Web UI option**. It's a lot of work and testing that can be better used elsewhere, not to mention you needed to run Shoko as an administrator to even be able to use the previous .INI solution. Video Players are now broken into two different groups, **Supported** **Players** and **Limited Payers**, supported players will be able to take advantage of all video player integration while limited players are only guaranteed for file playback.

The following players have full support.

-   Internal MPV
-   MPC
-   Zoom Player

The following players have limited support.

-   VLC
-   Pot Player
-   External MPV
-   Windows Default

Users can now use Shoko Player, our built-in player that's powered by MPV!

MPV is one of the best video players available that lightweight, designed for maximum performance and supports a wide range of file formats. Plex users already know how  this as Plex [hired the main developer of MPV](https://www.plex.tv/blog/introducing-the-plex-media-player/) and used MPV as the base for Plex Media Player. Shoko Player is still being developed and worked on and is only controllable using the 1-9 keys. We're working on adding a GUI and additional features.

While not originally part of the plan, Zoom Player support has also been added thanks to **Netsplite** giving users another media player to use with Shoko.

##### Web UI Included

We want everyone to become familiar with the Web UI as it will be eventually taking the place of the existing Shoko Server UI when Shoko Server is fully cross-compatible. You can access the Web UI by typing in **localhost:8111** in your browser after Shoko Server has finished loading. The login is the Shoko user account which by default is **Default** for the username, there is no password. User feedback is highly encouraged as we'll be making a lot of changes to how it looks and runs as we progress forward.  Please report back issues or suggestions you might have in the [Web UI Repository](https://github.com/ShokoAnime/ShokoServer-WebUI) on GitHub.

##### Administrative Privileges no Longer Needed

Both Soko Server and Shoko Desktop will now keep all related files in the programdata folder. You'll need to run both Shoko Server and Shoko Desktop as an administrator once for everything to be setup properly, existing users will have all their files automatically moved. After the initial run as an administrator you'll be able to run Shoko as a normal user, we've done a lot of testing but everyone's setup is different so if you encounter any problems please contact us on Discord so we can help.

##### Shoko Server Integrity Check

We've added a new utility to Shoko Server that allows users to run an integrity check on their entire collection. If ran, each file is rehashed and has its new hash compared to the hash stored in the database from when the file was originally imported. If the hash is different, Shoko Server will report the file as corrupted allowing users to easily replace corrupted files.

##### Update Channels Added

Users can now check different update channels, Stable and Beta and switch between them with ease. The channel can be selected in the **About** window, with the desired channel selected click the **Check For Updates** button. This was a last minute addition we added due to the confusion some users had during the beta which caused fixed issues to be reported, we'll be fine-tuning as well as looking into adding a daily channel as we go forward.

##### AniDB Dynamic Rate Limiter

As we continue to improve our AniDB ban prevention system, Shoko will now account for user intervention during AniDB requests. As "reported" by some of our users, you could get around our previous ban prevention method by simply pausing the queue and waiting or restarting Shoko Server. This also caused problems for users who paused or cleared the AniDB queue for numerous reasons and even some users who added to their collection piece by piece. The improved system will now track total usage and throttle as required to prevent AniDB bans.

Please note, **there is currently an issue with users receiving an HTTP ban from AniDB** which is different than a UDP ban that our AniDB ban prevention system is for. This is being looked into but from what we can tell, it seems to be on AniDB's side.

##### Log Rotator

We've implemented a Log Rotator that will zip up old log files to reduce the size of the log folder. Currently it's hard-coded to do this every day but we'll be adding options for users to select different frequencies and what to do with older logs. Suggestions on improving this system are welcomed.

##### My Anime 3 and the Future

Version 3.6 was a big change that caused a lot of issues with My Anime 3, with the addition of **Netsplite** to the team we were able to not only get it in working condition again, but fix some longstanding bugs and even add some new features. Version 3.7 has also seen a lot of changes with My Anime 3 where with the exception of a few user specific bugs, we've cleared out all remaining issues related to bugs. While there are some remaining issues regarding feature improvements or additions, we're going to be focusing our resources and time on the other projects in the Shoko suite. This does not mean we are discontinuing My Anime 3 or plan to stop supporting it, it just means we've hit a point where My Anime 3 is pretty much complete. We're currently following development on Media Portal 2 but have nothing to announce at the moment in regards to support for it.

We also wanted to thank [pur\_berger](http://forum.team-mediaportal.com/members/pur_berger.50701/) for allowing us to include his modifications to the Avallanche skin which allows My Anime 3 to work with it.

##### Known Issues

-   Some utilities do not work with files hosted on the cloud.
-   If a video player is already open, there is a chance that video playback will fail when the user presses the play button.

##### Contributors

This release was only made possible by the following people volunteering their time to make Shoko better.

**Avael, Baine, BigRetroMike, da3dsoul, ElementalCrisis, JMediaManager, MaxPiva, Netsplite and pmcleish**

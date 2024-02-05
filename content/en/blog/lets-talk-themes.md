+++
title = "Lets Talk Themes"
quick = "Learn how themes work in the new Web UI with multiple theme examples." 
image = "assets/images/blog/lets-talk-themes.jpg"
date = 2023-08-03
type = "post"
anime = "Lucky Star"
category = ["Update"]
tag = ["Shoko Server", "Web UI"]
+++

One of the oldest feature requests going all the way back to when the program was still called JMM, was the 
implementation of proper theme support for both Server and Desktop. Although it was explored, limitations related to 
[WPF](https://en.wikipedia.org/wiki/Windows_Presentation_Foundation) made this request near impossible and a huge 
time sink for the devs.

With the announcement of Shoko Desktop 2, its change from a C# program to a web application and the eventual 
decision to merge Shoko Desktop features into the Server Web UI. Theme support was once again reevaluated, and we 
decided it would be something added after the release of version 1.0.0, as referenced [here](https://github.com/ShokoAnime/Shoko-WebUI/issues/112).

##### Hello Theme Support

Earlier in the year, we pulled users of varying Shoko experience to gather feedback on the current Web UI design, 
aiming to identify user pain points and areas of improvements. Using the data we gathered, we decided to start a 
complete redesign of the Web UI, internally known as V7 (Version 7) to build a better Web UI for our users. While 
this process was underway, we took a look at our post-version 1.0.0 list and decided to move a couple items up, such 
as user avatar support and, of course, proper theme support.

After multiple discussions, we determined there were two major things required to have theme support within the Web 
UI. The first was zero intervention from our end, meaning once implemented, we would not have to do anything for 
users to add and create themes. The second was the ability to easily create themes requiring the user to only have 
to change some template wording, and the HEX values themselves. As a result, theme support will be fully integrated 
and available from the moment the new Web UI launches.

In fact, our beta users are already enjoying the benefits of theme support and have had the opportunity to create their 
own personalized themes with minimal work. Creating a theme typically takes no more than 5 minutes, with users only 
needing to look up HEX colors to get started.

To provide a glimpse of what's possible with the new theme support feature, we asked some of our beta testers to try 
out the system and share screenshots of their customized dashboards.

Here are a few examples of the themes created by our beta testers. We're planning on doing more posts like this in 
the future to highlight upcoming features, so keep an eye on the blog, or at least the Shoko News widget on the 
Dashboard.

![Example Theme 1](/assets/images/blog/web-ui-theme-01.jpg)
![Example Theme 2](/assets/images/blog/web-ui-theme-02.jpg)
![Example Theme 3](/assets/images/blog/web-ui-theme-03.jpg)
![Example Theme 4](/assets/images/blog/web-ui-theme-04.jpg)
![Example Theme 5](/assets/images/blog/web-ui-theme-05.jpg)

+++
title = "Shoko Docs Updated"
image = "assets/images/blog/Shoko-Docs-Updated-Banner.jpg"
date = 2019-07-21T17:42:46+00:00
type = "post"
version = "NA"
anime = "Sorcerous Stabber Orphen"
category = ["Website"]
tag = ["Shoko Docs"]
+++

If you've been on our Discord server lately you've might of seen us asking for feedback on a new design we've been working on for Shoko Docs. With the feedback & suggestions we received from the community we're happy to launch the latest version of Shoko Docs!

{{% lightbox-image image-url="/assets/images/blog/Shoko-Docs-Updated.jpg" image-alt="Shoko Docs Updated" %}}

In the past to save time, we used a prebuilt template and customized it to our needs. While this worked in the beginning, we found that trying to add or modify the template outside of its designed purpose would cause issues. These limitations were most prevalent when it came to fixing bugs that were usually the result of legacy code being left in the template or compatibility issues between different libraries the template used. We decided that instead of working with someone else's framework, it would be more efficient and beneficial to just create our own.

##### Rebuilt From The Ground Up

Building of some of the design elements of the previous version of Shoko Docs, we entirely rebuilt Shoko Docs giving us a**cleaner codebase** and allowing us to **modify Shoko Docs** however we want going forward. Our CSS & JS files are 1/10th of what they previously and our overall load times have been reduced drastically. We've reduced the load times by 30%-40% and page file size by 50%. However the biggest change we've made was under the hood, the switch to Hugo.

##### Goodbye Jekyll, Hello Hugo

We switched to Jekyll to help automate the building process and while Jekyll has been great, [Hugo](https://gohugo.io/) provides us with a faster build process and is based on the Go programming language. Hugo is also easier to install which solves one of the issues users wishing to contribute were experiencing. While not directly related to the Hugo switch, we also solved the main issue reported by users when it came to contributing to Shoko Docs, the lack of HTML knowledge.

##### Markdown

Shoko Docs has been completely rewritten in Markdown which means if you can type in English, then you can contribute to Shoko Docs. Markdown does have a very small learning curve and we do use a couple custom shortcodes but even then it should only take someone 5-10 minutes to learn as opposed to the multiple hours it might take to learn HTML.

##### Dark Theme

Yes you read that right, Shoko Docs finally has a dark theme.

Clicking the **Dark Theme** link on the right-side of the nav menu will switch your theme. We've also designed it to remember your theme preference so you don't need keep clicking the link each time when visiting the page.

There is one drawback at the moment, while its been added it's color scheme has not been created yet. Its not because we forgot about it, but instead we'd like **the community** to design it! Anyone who wishes to help just jump onto our Discord server and let us know!

##### Coming Up

Its been awhile since the last release and if you check the changelog page you'll see we've got a release tentatively planned for Monday. We'll also have a blog post later this week detailing what we've been working on and what's next for Shoko.

##### Known Issues

-   Various display issues when browsing on mobile.
-   Shoko Desktop - Utilities was not converted to markdown and there are no plans to convert it.
# Getting started

:wave: Hi! Here is how you can add your app to Paquet. Adding a new app
is done by submiting an issue on our [GitHub repo](https://github.com/notangelmario/paquet).

> Verification on apps has been removed, because all apps are checked
> during the listing process.

### Requirements:
* Web app manifest
* Service worker
* Name
* App icons

> Since 3.2.0, requirements are a little bit stricter.

## Preparing your `manifest.json`

You can use your `manifest.json` or `site.webmanifest` to specify the app listing
details.

Here are the keys we use when displaying your app listing on Paquet:

* `name`
* `author`
* `description`
* `categories`
* `icons`
* `screenshots`

You can find more about manifest keys on the [manifest documentation](/docs/manifest.md)

## Preparing your `index.html` (home page)

We also fetch some properties from the index page. Those are:
* `og:image` (for the cover)
* `author`
* `description`

The `og:image` should be a cover image. Preferably 1024x600. Low resolution images will not be accepted!

## Extra

When you submit your app, you specify your app's features. These features include:
mobile optimisation, offline capability and more.

You can also specify an URL to your app's source code.

> In future releases, you will have the ability to display releases from
GitHub or GitLab.

## Updating

Paquet will periodically fetch new content using your manifest so you don't have to
worry about submitting a new issue each time you update your app.

We check for app updates daily, so keep that in mind.

## Issues

In case your app has some issues, it will be temporarily taken down, and you will be contacted
in order to fix the issues.
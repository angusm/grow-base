## Prerequisites

At a minimum, you will need the following tools installed:

1. [Git](http://git-scm.com/)
2. [Grow](https://grow.io)
3. [Typescript](https://www.typescriptlang.org/)

If you do not have Grow, you can install it using:

```
curl https://install.growsdk.org | bash
```

## Running the development server

Prior to starting the development server, you may have to install dependencies
used by your project. The `grow install` command walks you through this and
tries to set up your environment for you.

The `grow run` command starts your development server. You can make changes to
your project files and refresh to see them reflected immediately.

```
grow install
grow run
```

## Building

You can use the `grow build` command to build your whole site to the `build`
directory. This is a good way to test and verify the generated code.

```
grow build
```

## Staging

Once you are ready to share your changes with your team, you can stage your
workspace to an access-controlled web server. Running the below command will
build your site and deploy it, and then provide you with a link to the staging
environment.

```
grow stage
```

## Project structure

The project is laid out in a component-based fashion. So all pages are broken
down into components that are loaded and rendered from the `/components` folder
by the main template (main template located in `/global/main.html`)

A component's folder should contain all the HTML, SASS and TS files necessary
for it to operate properly.

All necessary SASS and TS files should be imported in the `main.ts` file.

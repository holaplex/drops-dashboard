# Rails Starting Template

## Tools you'll need:

You'll need docker and compose installed. Instructions for installing them can be found at:

### Docker

- [Ubuntu (Docker Engine)](https://docs.docker.com/engine/install/ubuntu/)
- [Windows (Docker Desktop)](https://docs.docker.com/desktop/windows/install/)
- [Mac (Docker Desktop)](https://docs.docker.com/desktop/mac/install/)

### Compose V2

Docker Desktop for Mac and for Windows version 3.2.1 and above includes the new Compose command along with the Docker CLI. Therefore, Windows and Mac users do not need to install Compose V2 separately
If you're on Linux, install it per the official documentation:

- [Ubuntu](https://docs.docker.com/compose/cli-command/#install-on-linuxhttps://docs.docker.com/compose/cli-command/#install-on-linux)

## Getting Started

### Fork this Repo

Find instructions here on how to do it [here](https://docs.gitlab.com/ee/user/project/repository/forking_workflow.html).

### Clone the new Repo

Find instructions here on how to do it [here](https://docs.gitlab.com/ee/user/project/repository/forking_workflow.html).
You may also remove the fork relationship right after cloning it.

### Setting up the env file

There's an `.env.example` file that might be used as a starting point.
Copy it to .env and set-up the credentials.

```
cp .env.example .env
```

### Build the container from scratch

```
docker compose up --build
```

## Run development environment

```
docker compose up
```

After that you can go to `localhost:5000` to see the project running.

## Structure of the project

The project follow this Structure:

    /backend
    /frontend

## Backend

The backend is [ruby on rails V5 API only](https://guides.rubyonrails.org/v5.0/api_app.html) project.
It has [devise](https://github.com/heartcombo/devise) and [doorkeeper](https://github.com/doorkeeper-gem/doorkeeper) for authentication and authorization.

## Frontend

The frontend is a React project with [vite](https://vitejs.dev/guide/) as a development tool.

It has [redux](https://redux.js.org/introduction/getting-started) and [redux-toolkit](https://redux-toolkit.js.org/introduction/getting-started), and it follows the ["ducks" architecture](https://github.com/erikras/ducks-modular-redux): a directory for each feature. If you're building new features, you can get started with the pattern found on src/features/User.

It also has some basic styling made with [styled-components](https://styled-components.com/docs).
It can be found on `frontend/src/components` directory, and it follows this patter: each component has his own directory, with his structural part (React component) and styling part (styled component).

For linting we have [esling](https://eslint.org/docs/user-guide/getting-started) & [prettier](https://prettier.io/docs/en/index.html), so you can run `yarn lint` on the frontend to have the project linted. It is recommended to have format on save option enabled, so it automatically runs it every time you save a file.

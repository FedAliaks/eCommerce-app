# rs-commerce

## project description:

### description of the project:
This is the final project for RS-School Frontend course 2023Q3.
It is the Book Store, based on CommerseTools.
This is the team project.
Members of our teams:
- Alexander [@fedaliaks](https://github.com/fedaliaks) - teamlead,
- Darya [@DaryaAniskevich](https://github.com/DaryaAniskevich) - developer,
- Sergio [@sergioivanov008](https://github.com/sergioivanov008) - developer.

Mentor of our team - Dmitry [@Mowgle88](https://github.com/Mowgle88).

You will find the working application [here](https://github.com/FedAliaks/eCommerce-app) (right link will be later)

### purpose of the project:
The goal of this project is to learn to work in a team and create an e-commerce application using CommerseTools.

### using technogies:
- Vite,
- Vitest,
- TypeScript,
- React,
- Commercetools

## scripts:
- `npm run dev` - run development mode, for development;
- `npm run build` - run build mode, for getting project build files in folder `/dist`;
- `npm run preview` - run preview mode;
- `npm run lint` - check project files for correspondence lint rules;
- `npm run lint:fix` - formatting project files according lint rules;
- `npm run format` - formatting project files according prettier rules;
- `npm run test` - run test for project;
- `npm run test:coverage` - run tool for get test coverage for project;

### Install and run the application locally:
- clone the repository.
- install the dependencies with `npm i`.
- Create the project in CommerceTools, setting up the currencies, languages, and other configurations in the Merchant Center.
- Create the API client for CommerceTools, enabling access to the platform's APIs and managing permissions and scopes required for the project.
- Save the API environment variables file `.env` in the root directory of your project.
Save your API environment variables file (.env) in the project directory.
- rename variables in your `.env` file:

`CTP_PROJECT_KEY` to `VITE_CTP_PROJECT_KEY`
`CTP_CLIENT_SECRET` to `VITE_CTP_CLIENT_SECRET`
`CTP_CLIENT_ID` to `VITE_CTP_CLIENT_ID`
`CTP_AUTH_URL` to `VITE_CTP_AUTH_URL`
`CTP_API_URL` to `VITE_CTP_API_URL`
`CTP_SCOPES` to `VITE_CTP_SCOPES`

- start the local server using `npm run dev`

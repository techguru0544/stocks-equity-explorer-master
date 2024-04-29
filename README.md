# Stocks-equity-explorer - Typescript

A drop-in replacement for CRA (Create React App) with simple yet advance setup.

### Equipped with

- Redux ( RTK Query + Redux Toolkit )
- React Router Dom
- Typescript
- TailwindCSS
- MantineUI
- Prettier
- EsLint
- Vite

## Integrated

- Top Gainers and losers data with carousel
- Search bar with the API and navigation to details page
- Details page of company with metadata and performance metrics
- Typescript at respective places
- Alerts for the API failure
- Designings with the tailwindCss and MantineUI

## Tip for stock detail page

- I have utilized the "IBM" symbol to fetch the details data, you can try the same.

`URL: {localhost_base_url}/stock/ibm`

Note: You can replace `API_KEY` inside </src/env.ts> file

## Obstacles/Issues

- Due to an API call limits which was 25 per day and API key didn't work so wasn't able to display more data

> FYI: Do let us know if you need to modify and add more features into this project

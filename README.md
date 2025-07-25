# SciPeaks React views

## Getting Started

First, run the development servers:

```bash
npm run dev-api
npm run dev
```

Open [http://localhost:3000/dev/home](http://localhost:3000/dev/home) with your browser to develop with the home page.

- [pubchem](http://localhost:3000/chemistry/pubchem?smiles=C1%28C%28N2%28C1SC%28C2C%28%3DO%29O%29%28C%29C%29%29%3DO%29%28NC%28CC%3D3%28C%3DCC%3DCC%3D3%29%29%3DO%29)

## Create new views

### Decide the view URL

Before actually creating the view, you need to decide what its URL will be.
Vike will map the `src/pages` directory structure on the disk to the view URL.

For example, a page located at `src/pages/category/subcategory/my-page/+Page.tsx`
will be available at the URL `/category/subcategory/my-page.html`.

### Create the new view

To create a new view, copy `pages/dev/base-page` to the location for the new
view. Then edit it:

- Set the `<title>` tag in `+config.ts`.
- Configure `IframeBridgeProvider`:
  - If the view needs a sample to work, add `requireSample`.
  - If the view can work standalone outside of `on-tabs`, add `allowStandalone`.
- Create a new component to design the page in `components/your/page/index.tsx`,
  and render it as a child of `IframeBridgeProvider`.
- Open the dev home page, select the new view in the top-right box and select a
  demo sample to load the view with it.

### Deploy HEAD to test with "on-tabs"

Go to [the GitHub actions page](https://github.com/zakodium/scipeaks-react/actions/workflows/publish-head.yml)
and select "Run workflow" to make a HEAD test build.

The build is published to https://www.lactame.com/react/views/HEAD/

## Learn More

To learn more about Vike, take a look at the following resources:

- [Vike Documentation](https://vike.dev/) - learn about Vike features and API.

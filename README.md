# C6H6 React views

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/dev/home](http://localhost:3000/dev/home) with your browser to develop with the home page.

- [pubchem](http://localhost:3000/chemistry/pubchem?smiles=C1%28C%28N2%28C1SC%28C2C%28%3DO%29O%29%28C%29C%29%29%3DO%29%28NC%28CC%3D3%28C%3DCC%3DCC%3D3%29%29%3DO%29)

## Create new views

### Decide the view URL

Before actually creating the view, you need to decide what its URL will be.
Next.js will map the `src/pages` directory structure on the disk to the view URL.

For example, a page located at `src/pages/category/subcategory/my-page.tsx` will
be available at the URL `/category/subcategory/my-page.html`.

### Create the new view

To create a new view, copy `pages/dev/base-page.tsx` to the location for the new
view. Then edit it:

- Set the `<title>` tag.
- Configure `IframeBridgeProvider`:
  - If the view needs a sample to work, add `requireSample`.
  - If the view can work standalone outside of `on-tabs`, add `allowStandalone`.
- Create a new component to design the page in `components/YourPageNamePage.tsx`,
  and render it as a child of `IframeBridgeProvider`.
- To be able to develop the view in a context similar to `on-tabs`, add its path
  to the list in `src/home-views.ts`.
- Open the dev home page, select the new view in the top-right box and select a
  demo sample to load the view with it.

## Documentation for the components in `tailwind-ui`

https://zakodium.github.io/components/

### Deploy HEAD to test with "on-tabs"

Go to [the GitHub actions page](https://github.com/zakodium/c6h6-react/actions?query=workflow%3A%22Publish+HEAD%22)
and select "Run workflow" to make a HEAD test build.

The build is published to https://www.lactame.com/react/views/HEAD/

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

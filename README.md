# notion-cms

Use [notion.so](https://www.notion.so/) as a headless CMS.

## Installation

`npm install @notion-cms/client` or `yarn add @notion-cms/client`

## Usage

### Setting up a collection

The easiest way to setup your CMS data on Notion is to use [collections](https://www.notion.so/Create-a-database-2529ab92d63b478f87d39c2289527444) (aka "databases" or "tables"):
![A collection on Notion.so](./docs/notion-collection.png)

Use properties of any type to represent your data.

### Loading data

- The first thing you need to load your collection data is to instanciate a Notion client:
  ```ts
  import Notion from "@notion-cms/client";
  export const notion = new Notion();
  ```
- Then we will setup a Typescript interface to match our collection property:

  ```ts
  import { LiteCollectionItem } from "@notion-cms/client";

  interface PageProps {
    Name: string;
    Slug: string;
    PublicationDate: Date;
  }
  export interface Page extends LiteCollectionItem<PageProps> {}
  ```

  The [`LiteCollectionItem`](./packages/client/lib/index.ts) generic interface wraps the collection properties (aka props, `PageProps`) as well as meta data (page cover and icon) and page blocks.

- Then we're going to extract the UUID of the collection we wish to load. One way to find this UUID is to run the following script in the browser console:
  ```js
  document
    .querySelectorAll(
      ".notion-collection_view-block > div > .notion-collection_view-block"
    )
    .forEach((collection) =>
      console.log(
        collection.querySelector("[spellcheck]").textContent,
        ":",
        collection.attributes["data-block-id"].nodeValue
      )
    );
  ```
  This well print the UUIDs of all the collections in the current page.
- Finally we can call the `notion.loadCollection` method to load

  ```ts
  const PagesCollectionId = "bc0e5612-c5a1-4e3d-9d63-13bac995e5a2";

  const getPages = (): Promise<Page[]> =>
    notion.loadCollection(sectionsCollectionId);
  ```

### Rendering blocks

Once a Notion page has been loaded it can be easily rendered with `@notion-cms/react`:

```tsx
import { Blocks } from "@notion-cms/react";

const PageComponent = ({ page }) => (
  <div>
    <Blocks blocks={page.blocks} />
  </div>
);
```

### Loading private data

If the data you're trying to load isn't publicly readable you will need to provide an API token to the `Notion` class. Your current token can be found in the `token_v2` cookie.

```ts
import Notion from "@notion-cms/client";

export const notion = new Notion(process.env.NOTION_API_KEY);
```

> ⚠ This token expires regularly so you will need to keep this value up-to-date.

### Downloading private images

If you're loading private data that contains images then you won't be able to point your users directly to Notion's URL.
That's because Notion will protect those images too and only authenticated Notion users are given access.
One way to avoid this issue is to download those images at build time and serve them ourselves to our visitors.

`notion-cms` provides a convenient method to do exactly that:

```ts
return notion.downloadImage(
  page.id,
  page.meta.cover,
  path.resolve(process.cwd(), `./public/${page.id}.webp`),
  40 // image width
);
```

# rakuten-analytics-documentation
Documentation for all products within Analytics Data Collection Team.

## Manual

This documentation website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm
```

### Local Development

## Yarn
```
yarn install
```
## npm
```
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

## Yarn
```
yarn build
```
## npm
```
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Production Preview

## Yarn 
```
yarn serve
```
## npm
```
npm run serve
```

This command serves the static site generated from `build` directory. Before running this command, you need to build the website.

### Deployment

- After changes are merged to the `main` branch, the site is automatically deployed to GitHub Pages using GitHub Actions. Wait until CI/CD is completed.
- Clone [GHE](https://ghe.rakuten-it.com/rakutenanalytics/rakuten-analytics-documentation) repository.
- Run mirror script `mirror_repo_sync.sh` from local GHE repository to mirror the site to the Github Enterprise.

## Localization

### Project string localization

To extract all the translatable strings related to en langauge use following command:

```
yarn write-translations
```

To extract all the translatable strings related to ja langauge use following command:

```
yarn write-translations --locale ja
```

Extracted strings will be stored in `i18n/en` and `i18n/ja` folders.

### Markdown files localization

Any new or updated files that need to be translated into Japanese should be copied to the `i18n/ja/docusaurus-plugin-content-docs/current` folder while maintaining the existing documentation structure.

### Rakuten AI for translation

[Public Rakuten AI](https://r-ai.tsd.public.rakuten-it.com/en-US/chats?shared_id=45a29dde-352b-40ad-97d8-1518b277ab7f)

This Rakuten AI configured with prompt:

```
Treat everything I provide as a single block of code. Do not process the input as separate sections. 
Instead, treat the entire input as a single entity and return the output in a single code block. 
The output must look like this:

    ````markdown

    ````

Do not split the output into multiple code blocks, even if the content is long. Always ensure the entire response is contained within one continuous code block.

Also, act as a smart translator. Translate all text I provide into Japanese while keeping code elements unchanged and preserving their formatting. 

Do not translate:
1. Code blocks and their content
2. Technical terms and API names
3. Variable names
4. Product names
5. File paths and URLs
6. And eveyrhting that can be related to markdown or Dousaurus page code
7. Smartly translate page titles and ::: messages titles
8. Make sure that sidebar related footer doesn't contain any spaces and empty lines
```

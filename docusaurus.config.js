// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const path = require('path');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Rakuten Analytics',
  tagline: '', // Removed because of config file is static and text cannot be translated
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://rakutenanalytics.github.io/',

  // for GHE
  baseUrl: '/rakuten-analytics-public-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rakutenanalytics', // Usually your GitHub org/user name.
  projectName: 'rakuten-analytics-public-docs', // Usually your repo name.
  deploymentBranch: "gh-pages",

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:undefined,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: '56KYHD3I32',
        apiKey: '474f9fc61ce3a7bd742c31c396e90e2b',
        indexName: 'Docusaurus Crawler',
        contextualSearch: true,
        externalUrlRegex: 'external\\.com|domain\\.com',
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },
        searchParameters: {},
        searchPagePath: 'search',
        insights: true,
      },
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      metadata: [
        {
          name: 'algolia-site-verification',
          content: 'BC995083B3CF2E30',
        },
      ],
      navbar: {
        title: '',
        logo: {
          alt: 'Rakuten Logo',
          src: 'img/rakuten-analytics-logo.svg',
          height: 25,
          width: 175
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docSidebar',
            position: 'left',
            label: 'Products',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'User Guide',
                to: '/docs/overview',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discourse',
                href: 'https://discourse.tech.rakuten-it.com/c/guilds/mobile-dev/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'FAQ',
                href: 'https://confluence.rakuten-it.com/confluence/x/mQ6ia',
              },
              {
                label: 'RAT Analytics Platform',
                href: 'https://rat.intra.rakuten-it.com/analytics/',
              },
              {
                label: 'GitHub',
                href: 'https://ghe.rakuten-it.com/rakutenanalytics',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Rakuten Group, Inc.`,
      },
      prism: {
        additionalLanguages: ['java', 'kotlin', 'swift', 'diff'],
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  plugins: [
    function customWebpackPlugin() {
      return {
        name: 'custom-webpack-alias',
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              alias: {
                '@components': path.resolve(__dirname, './src/components'),
                '@static': path.resolve(__dirname, './static'),
              },
            },
          };
        },
      };
    },
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-81FVRG5RZZ', 
        anonymizeIP: false,
      },
    ],
  ],
};

export default config;

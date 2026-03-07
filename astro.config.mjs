import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import arkosTheme from './src/themes/arkos-shiki.json';

export default defineConfig({
  site: 'https://arkos.divyekant.com',
  integrations: [
    react(),
    starlight({
      title: 'Arkos',
      expressiveCode: {
        themes: [arkosTheme],
        useStarlightDarkModeSwitch: false,
        useStarlightUiThemeColors: false,
      },
      logo: {
        src: './src/assets/arkos-logo.svg',
        replacesTitle: true,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/divyekant/arkos' },
      ],
      sidebar: [
        {
          label: 'Tools',
          items: [
            { label: 'Overview', slug: 'tools' },
            {
              label: 'Infrastructure',
              items: [
                { slug: 'tools/memories' },
                { slug: 'tools/carto' },
                { slug: 'tools/swarm-engine' },
                { slug: 'tools/deck' },
              ],
            },
            {
              label: 'Dev Workflow',
              items: [
                { slug: 'tools/conductor' },
                { slug: 'tools/apollo' },
                { slug: 'tools/argos' },
                { slug: 'tools/delphi' },
                { slug: 'tools/hermes' },
                { slug: 'tools/kalos' },
                { slug: 'tools/learning-skill' },
                { slug: 'tools/pencil-prototyping' },
              ],
            },
            {
              label: 'Agent Frameworks',
              items: [
                { slug: 'tools/persona-smith' },
              ],
            },
            {
              label: 'Utilities',
              items: [
                { slug: 'tools/pheme' },
              ],
            },
          ],
        },
        {
          label: 'Ecosystem',
          autogenerate: { directory: 'ecosystem' },
        },
        {
          label: 'About',
          autogenerate: { directory: 'about' },
        },
      ],
      customCss: [
        './src/styles/custom.css',
        './src/styles/aurora.css',
        './src/styles/grain.css',
        './src/styles/animations.css',
      ],
    }),
  ],
});

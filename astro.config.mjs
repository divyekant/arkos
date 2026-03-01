import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import arkosTheme from './src/themes/arkos-shiki.json';

export default defineConfig({
  site: 'https://arkos.divyekant.com',
  integrations: [
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
                { slug: 'tools/delphi' },
                { slug: 'tools/hermes' },
                { slug: 'tools/learning-skill' },
              ],
            },
            {
              label: 'Agent Frameworks',
              items: [
                { slug: 'tools/persona-smith' },
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

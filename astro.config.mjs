import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://arkos.divyekant.com',
  integrations: [
    starlight({
      title: 'Arkos',
      logo: {
        src: './src/assets/arkos-logo.svg',
        replacesTitle: true,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/niceguy135' },
      ],
      sidebar: [
        {
          label: 'Tools',
          items: [
            { label: 'Overview', slug: 'tools/index' },
            {
              label: 'Infrastructure',
              items: [
                { slug: 'tools/memories/index' },
                { slug: 'tools/carto/index' },
                { slug: 'tools/swarm-engine/index' },
              ],
            },
            {
              label: 'Dev Workflow',
              items: [
                { slug: 'tools/conductor/index' },
                { slug: 'tools/apollo/index' },
                { slug: 'tools/delphi/index' },
                { slug: 'tools/hermes/index' },
                { slug: 'tools/learning-skill/index' },
              ],
            },
            {
              label: 'Agent Frameworks',
              items: [
                { slug: 'tools/persona-smith/index' },
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

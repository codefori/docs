import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rpgleLang from './src/syntaxes/rpgle.tmLanguage.json';
import clLang from './src/syntaxes/cl.tmLanguage.json';

// https://astro.build/config
export default defineConfig({
	site: 'https://codefori.github.io',
	base: '/docs',
	trailingSlash: 'always',	
	integrations: [
		starlight({
			title: 'Code for IBM i Docs',
			logo: {
				src: './public/icon.png',
				replacesTitle: true,
			},
			favicon: './icon.png',
			social: {
				github: 'https://github.com/codefori/vscode-ibmi',
			},
			editLink: {
				baseUrl: 'https://github.com/codefori/docs/edit/main/'
			},
			customCss: [
				'./src/styles/custom.css',	
			],
			sidebar: [
				{
					label: 'Login',
					link: 'login',
					badge: {
						variant: 'note',
						text: 'Start Here!'
					}
				},
				{
					label: 'Developing',
					items: [
						{
							label: 'Editing and compiling',
							link: 'developing/editing-compiling/',
						},
						{
							label: 'Source Dates',
							link: 'developing/sourcedates',
						},
						{
							label: 'Actions',
							autogenerate: { directory: 'developing/actions/' },
							collapsed: true,
						},
						{
							label: 'Debugging',
							link: 'developing/debug/',
						},
						{
							label: 'ILEDocs',
							link: 'developing/iledocs/',
						},
						{
							label: 'Local Development',
							autogenerate: { directory: 'developing/local/' },
							collapsed: true,
						},
					],
					collapsed: false,
				},
				{
					label: 'Browsers',
					autogenerate: { directory: 'browsers/' },
					collapsed: false,
				},
				{
					label: 'Tips',
					autogenerate: { directory: 'tips/' },
					badge: {
						variant: 'tip',
						text: '& Tricks',
					},
					collapsed: false,
				},
				{
					label: 'Settings',
					autogenerate: { directory: 'settings/' },
					collapsed: false,
				},
				{
					label: 'Extensions',
					items: [
						{
							label: 'Db2 for i',
							link: 'extensions/db2i/', 
						},
						{
							label: 'RPGLE',
							autogenerate: { directory: 'extensions/rpgle/' }, 
							collapsed: true,
						},
					],
					collapsed: false,
				},
				{
					label: 'Extension Development',
					autogenerate: { directory: 'dev/'},
					collapsed: false,
				}
					
			],
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
				da: {
					label: 'Dansk',
					lang: 'da',
				},
				fr: {
					label: 'Français',
					lang: 'fr',
				},
			},
		}),
	],
	markdown: {
		shikiConfig: {
			langs: [
				rpgleLang,
				clLang,
				'sql',
			]
		}
	},
});
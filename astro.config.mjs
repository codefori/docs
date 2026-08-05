import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import clLang from './src/syntaxes/cl.tmLanguage.json';
import rpgleLang from './src/syntaxes/rpgle.tmLanguage.json';

// https://astro.build/config
export default defineConfig({
	site: 'https://codefori.github.io',
	base: '/docs',
	trailingSlash: 'always',
	integrations: [
		starlight({
			pagination: false,
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
			sidebar:
				[
					{
						label: 'Home',
						link: '/',
					},
					{
						label: 'Install',
						link: 'install/',
						badge: {
							text: 'Updated',
							variant: 'success'
						},
					},
					{
						label: 'Quick Start',
						link: 'quickstart/',
						badge: {
							variant: 'note',
							text: 'Start Here!'
						}
					},
					{
						label: 'Help and Support',
						link: 'help-and-support/',
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
								link: 'developing/sourcedates/',
							},
							{
								label: 'Testing',
								badge: {
									text: 'NEW',
									variant: 'tip'
								},
								collapsed: true,
								items: [
									{
										label: 'Overview',
										link: 'developing/testing/overview',
									},
									{
										label: 'Writing Tests',
										link: 'developing/testing/writing',
									},
									{
										label: 'Running Tests',
										link: 'developing/testing/running',
									},
									{
										label: 'Configuring Tests',
										link: 'developing/testing/configuring',
									},
									{
										label: 'CLI & Automated Tests',
										link: 'developing/testing/cli',
									},
									{
										label: 'Troubleshooting',
										link: 'developing/testing/troubleshooting',
									}
								]
							},
							{
								label: 'Debugging',
								badge: {
									text: 'Updated',
									variant: 'success'
								},
								collapsed: true,
								items: [
									{
										label: 'Overview',
										link: 'developing/debug/overview',
									},
									{
										label: 'Configuring',
										link: 'developing/debug/configure',
									}
								]
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
						label: 'Environment',
						items: [
							{
								label: 'Environment view',
								link: 'environment/',
							},
							{
								label: 'Actions',
								link: 'environment/actions/',
							},
							{
								label: 'Custom variables',
								link: 'environment/variables',
							},
							{
								label: 'Profiles',
								link: 'environment/profiles',
							}
						]
					},
					{
						label: 'Browsers',
						items: [
							{
								label: 'IBM i Browsers',
								link: 'browsers/',
							},
							{
								label: 'Object Browser',
								link: 'browsers/object-browser/',
							},
							{
								label: 'IFS Browser',
								link: 'browsers/ifs-browser/',
							},
							{
								label: 'User Library List',
								link: 'browsers/user-library-list/',
							},
							{
								label: 'Go To File',
								link: 'browsers/go-to-file/',
							},
							{
								label: 'IBM i FileSystem',
								autogenerate: { directory: 'extensions/ibmi-fs/' },
								collapsed: true,
								badge: {
									text: 'NEW',
									variant: 'tip'
								},
							},
						],
						collapsed: false,
					},
					{
						label: 'Languages',
						items: [
							{
								label: 'RPGLE',
								autogenerate: { directory: 'extensions/rpgle/' },
								collapsed: true,
							},
							{
								label: 'CLLE',
								link: 'extensions/clle'
							},
							{
								label: 'Renderer',
								link: 'extensions/renderer',
								badge: {
									text: 'dds',
									variant: 'default'
								},
							},
							{
								label: 'Db2 for i',
								autogenerate: { directory: 'extensions/db2i/' },
								collapsed: true,
								badge: {
									text: 'New AI',
									variant: 'default'
								},
							},
						],
						collapsed: false,
					},
					{
						label: 'Tips',
						autogenerate: { directory: 'tips/' },
						collapsed: false,
					},
					{
						label: 'Settings',
						autogenerate: { directory: 'settings/' },
						collapsed: true,
					},
					{
						label: 'Extension Development',
						autogenerate: { directory: 'dev/' },
						collapsed: true,
					}

				],
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
				// da: {
				// 	label: 'Dansk',
				// 	lang: 'da',
				// },
				// fr: {
				// 	label: 'Français',
				// 	lang: 'fr',
				// },
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
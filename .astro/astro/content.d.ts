declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"browsers/goToFile.mdx": {
	id: "browsers/goToFile.mdx";
  slug: "browsers/gotofile";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"browsers/ifs-browser.mdx": {
	id: "browsers/ifs-browser.mdx";
  slug: "browsers/ifs-browser";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"browsers/index.mdx": {
	id: "browsers/index.mdx";
  slug: "browsers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"browsers/object-browser.mdx": {
	id: "browsers/object-browser.mdx";
  slug: "browsers/object-browser";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"browsers/user-library-list.mdx": {
	id: "browsers/user-library-list.mdx";
  slug: "browsers/user-library-list";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev/api.md": {
	id: "dev/api.md";
  slug: "dev/api";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"dev/debugger.mdx": {
	id: "dev/debugger.mdx";
  slug: "dev/debugger";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev/examples.mdx": {
	id: "dev/examples.mdx";
  slug: "dev/examples";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev/getting_started.mdx": {
	id: "dev/getting_started.mdx";
  slug: "dev/getting_started";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev/scope.mdx": {
	id: "dev/scope.mdx";
  slug: "dev/scope";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev/variables.mdx": {
	id: "dev/variables.mdx";
  slug: "dev/variables";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/actions/custom-vars.mdx": {
	id: "developing/actions/custom-vars.mdx";
  slug: "developing/actions/custom-vars";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/actions/execution.mdx": {
	id: "developing/actions/execution.mdx";
  slug: "developing/actions/execution";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/actions/index.mdx": {
	id: "developing/actions/index.mdx";
  slug: "developing/actions";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/debug/index.mdx": {
	id: "developing/debug/index.mdx";
  slug: "developing/debug";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/editing-compiling.mdx": {
	id: "developing/editing-compiling.mdx";
  slug: "developing/editing-compiling";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/iledocs.mdx": {
	id: "developing/iledocs.mdx";
  slug: "developing/iledocs";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/local/actions.mdx": {
	id: "developing/local/actions.mdx";
  slug: "developing/local/actions";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/local/azure.mdx": {
	id: "developing/local/azure.mdx";
  slug: "developing/local/azure";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/local/getting-started.mdx": {
	id: "developing/local/getting-started.mdx";
  slug: "developing/local/getting-started";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/local/git.mdx": {
	id: "developing/local/git.mdx";
  slug: "developing/local/git";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/local/gitflow.mdx": {
	id: "developing/local/gitflow.mdx";
  slug: "developing/local/gitflow";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/local/migrate.mdx": {
	id: "developing/local/migrate.mdx";
  slug: "developing/local/migrate";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/local/structure.mdx": {
	id: "developing/local/structure.mdx";
  slug: "developing/local/structure";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/sourcedates.mdx": {
	id: "developing/sourcedates.mdx";
  slug: "developing/sourcedates";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/testing/configuring.mdx": {
	id: "developing/testing/configuring.mdx";
  slug: "developing/testing/configuring";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/testing/overview.mdx": {
	id: "developing/testing/overview.mdx";
  slug: "developing/testing/overview";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/testing/running.mdx": {
	id: "developing/testing/running.mdx";
  slug: "developing/testing/running";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/testing/troubleshooting.mdx": {
	id: "developing/testing/troubleshooting.mdx";
  slug: "developing/testing/troubleshooting";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"developing/testing/writing.mdx": {
	id: "developing/testing/writing.mdx";
  slug: "developing/testing/writing";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"extensions/clle/index.mdx": {
	id: "extensions/clle/index.mdx";
  slug: "extensions/clle";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"extensions/db2i/AI/Continue/Continue.mdx": {
	id: "extensions/db2i/AI/Continue/Continue.mdx";
  slug: "extensions/db2i/ai/continue/continue";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"extensions/db2i/AI/Copilot/index.mdx": {
	id: "extensions/db2i/AI/Copilot/index.mdx";
  slug: "extensions/db2i/ai/copilot";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"extensions/db2i/AI/code-assistant.mdx": {
	id: "extensions/db2i/AI/code-assistant.mdx";
  slug: "extensions/db2i/ai/code-assistant";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"extensions/db2i/AI/roadmap.mdx": {
	id: "extensions/db2i/AI/roadmap.mdx";
  slug: "extensions/db2i/ai/roadmap";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"extensions/db2i/AI/use-cases.mdx": {
	id: "extensions/db2i/AI/use-cases.mdx";
  slug: "extensions/db2i/ai/use-cases";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"extensions/db2i/index.mdx": {
	id: "extensions/db2i/index.mdx";
  slug: "extensions/db2i";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"extensions/renderer/index.mdx": {
	id: "extensions/renderer/index.mdx";
  slug: "extensions/renderer";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"extensions/rpgle/faq.mdx": {
	id: "extensions/rpgle/faq.mdx";
  slug: "extensions/rpgle/faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"extensions/rpgle/index.mdx": {
	id: "extensions/rpgle/index.mdx";
  slug: "extensions/rpgle";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"extensions/rpgle/linter.mdx": {
	id: "extensions/rpgle/linter.mdx";
  slug: "extensions/rpgle/linter";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"help-and-support.mdx": {
	id: "help-and-support.mdx";
  slug: "help-and-support";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"install.mdx": {
	id: "install.mdx";
  slug: "install";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"quickstart.mdx": {
	id: "quickstart.mdx";
  slug: "quickstart";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"settings/connection.mdx": {
	id: "settings/connection.mdx";
  slug: "settings/connection";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"settings/global.mdx": {
	id: "settings/global.mdx";
  slug: "settings/global";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"settings/profiles.mdx": {
	id: "settings/profiles.mdx";
  slug: "settings/profiles";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"settings/system.mdx": {
	id: "settings/system.mdx";
  slug: "settings/system";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"tips/asp.mdx": {
	id: "tips/asp.mdx";
  slug: "tips/asp";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"tips/bash.mdx": {
	id: "tips/bash.mdx";
  slug: "tips/bash";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"tips/ccsid.mdx": {
	id: "tips/ccsid.mdx";
  slug: "tips/ccsid";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"tips/protect.mdx": {
	id: "tips/protect.mdx";
  slug: "tips/protect";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"tips/setup.mdx": {
	id: "tips/setup.mdx";
  slug: "tips/setup";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"tips/seuColours.mdx": {
	id: "tips/seuColours.mdx";
  slug: "tips/seucolours";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"tips/terminals.mdx": {
	id: "tips/terminals.mdx";
  slug: "tips/terminals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"tips/tricks.mdx": {
	id: "tips/tricks.mdx";
  slug: "tips/tricks";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"workshop/db2i/index.mdx": {
	id: "workshop/db2i/index.mdx";
  slug: "workshop/db2i";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"workshop/git/index.mdx": {
	id: "workshop/git/index.mdx";
  slug: "workshop/git";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"workshop/index.mdx": {
	id: "workshop/index.mdx";
  slug: "workshop";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"workshop/node/index.mdx": {
	id: "workshop/node/index.mdx";
  slug: "workshop/node";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}

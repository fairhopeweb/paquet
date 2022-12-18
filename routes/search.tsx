import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import type { App, Category } from "@/types/App.ts";
import { supabase } from "@/lib/supabase.ts";
import { getCategory, searchCategory } from "@/lib/categories.ts";
import ListItem from "@/components/ListItem.tsx";
import Button from "@/components/Button.tsx";
import SlideItem from "@/components/SlideItem.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import SearchBar from "@/components/SearchBar.tsx";

type DataProps = {
	categories: Category[];
	apps: App[];
	moreApps: App[];
};

export default function Search({ data, url }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>{url.searchParams.get("q")} &middot; Paquet</title>
			</Head>
			<Navbar
				back
			/>
			<Container class="mt-16 mb-4">
				<form
					action="/search"
					method="GET"
				>
					<SearchBar
						text={url.searchParams.get("q") || ""}
					/>
				</form>
			</Container>
			{data.categories.length > 0 && (
				<SlideContainer>
					{data.categories.map((category, idx) => (
						<SlideItem
							key={category.id}
							isLast={data.categories &&
								idx === data.categories.length - 1}
						>
							<a
								href={`/category/${category.id}`}
							>
								<Button
									icon={category.icon}
								>
									{category.name}
								</Button>
							</a>
						</SlideItem>
					))}
				</SlideContainer>
			)}
			<Container
				class="mb-4"
				disableGutters
			>
				{data.apps.length
					? data.apps.map((app: App, idx: number) => (
						<a href={`/app/${app.id}`}>
							<ListItem
								button
								key={app.id}
								image={app.icon}
								title={app.name}
								subtitle={getCategory(app.category)?.name}
								divider={idx !== data.apps.length - 1}
							/>
						</a>
					))
					: <p class="text-center opacity-50">No results found</p>}
			</Container>
			<Container>
				<h2 class="text-2xl">
					More apps
				</h2>
			</Container>
			<Container disableGutters>
				{data.moreApps &&
					data.moreApps.map((app: App, idx: number) => (
						<a href={`/app/${app.id}`}>
							<ListItem
								button
								key={app.id}
								image={app.icon}
								title={app.name}
								subtitle={getCategory(app.category)?.name}
								divider={idx !== data.moreApps.length - 1}
							/>
						</a>
					))}
			</Container>
		</>
	);
}

export const handler: Handler = async (req, ctx) => {
	const searchParams = new URLSearchParams(req.url.split("?")[1]);
	const query = searchParams.get("q");

	if (!query) {
		return new Response("No query provided", {
			status: 307,
			headers: {
				Location: "/",
			},
		});
	}

	const { data: apps } = await supabase.rpc("search_app", {
		search_term: query,
	}).select("id, name, icon, category");

	const categories = searchCategory(query);

	let moreApps: App[] = [];
	if (apps && apps.length < 10) {
		const { data } = await supabase
			.from("random_apps")
			.select("id, name, category, icon")
			// Unsolved bug from supabase requires us to use this
			// method to exclude apps from the search
			// See https://github.com/supabase/supabase/discussions/2055#discussioncomment-923451
			.not("id", "in", `(${apps.map((app) => app.id).join(",")})`)
			.limit(5);

		if (data && data.length > 0) {
			moreApps = data as App[];
		}
	}

	return ctx.render({
		categories,
		apps,
		moreApps,
	});
};

import { Handler, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Card from "@/components/Card.tsx";
import ListItem from "@/components/ListItem.tsx";
import LogoutButton from "@/islands/LogoutButton.tsx";
import { APP } from "@/lib/app.ts";
import { providers } from "@/lib/authProviders.ts";
import { User } from "@/types/User.ts";

interface DataProps {
	user?: User;
}

export default function Settings(props: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>Settings &middot; Paquet</title>
			</Head>
			<Navbar back />
			<Container>
				<Stack>
					<Header icon="settings">
						Settings
					</Header>
					{props.data?.user
						? (
							<Card disableGutters>
								<ListItem
									title={props.data.user.name}
									image={props.data.user.avatar_url}
									subtitle={`${props.data.user.email}<br/>Connected with ${
										props.data.user.providers.map((val) =>
											providers.get(val)
										).join(", ")
									}`}
									divider
								/>
								<LogoutButton />
							</Card>
						)
						: (
							<Card disableGutters>
								<a href="/login">
									<ListItem
										button
										icon="login"
										title="Login"
										subtitle="Login to access more features"
									/>
								</a>
							</Card>
						)}
					<Card disableGutters>
						<a href="/docs">
							<ListItem
								button
								icon="code"
								title="Docs"
								subtitle="All things developer"
							/>
						</a>
					</Card>
					<Card disableGutters>
						<a
							href={APP.githubRepo}
							target="_blank"
							rel="noopener noreferrer"
						>
							<ListItem
								button
								divider
								icon="github"
								title="GitHub"
								subtitle="notangelmario/paquet"
							/>
						</a>
						<a
							href={APP.discordInvite}
							target="_blank"
							rel="noopener noreferrer"
						>
							<ListItem
								button
								divider
								icon="discord"
								title="Discord"
								subtitle="Join our server!"
							/>
						</a>
						<a
							href="https://buymeacoffee.com/notangelmario"
							target="_blank"
							rel="noopener noreferrer"
						>
							<ListItem
								button
								icon="coffee"
								title="Buy me a coffee"
								subtitle="Support Paquet's development"
							/>
						</a>
					</Card>
					<Card disableGutters>
						<ListItem
							icon="info"
							title="Version"
							subtitle={`${APP.version} - ${APP.codename}`}
						/>
					</Card>
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handler = (_, ctx) => {
	return ctx.render(ctx.state);
};

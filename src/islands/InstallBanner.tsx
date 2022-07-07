/**@jsx h */
/**@jsxFrag Fragment */

declare global {
	interface Window {
		// deno-lint-ignore no-explicit-any
		installPrompt: any;
	}
}

import { h } from "preact";
import { useState } from "preact/hooks";
import Button from "../components/Button.tsx";
import Card from "../components/Card.tsx";
import { tw } from "@twind";
import Stack from "../components/Stack.tsx";
import { useInstalled } from "../hooks/useInstalled.ts";
import Dialog from "./Dialog.tsx";
import { useBrowser } from "../hooks/useBrowser.ts";

type Props = {
	initialInstalled: boolean;
};

export default function InstallBanner(props: Props) {
	const clientBrowser = useBrowser();
	const installed = useInstalled(props.initialInstalled);
	const [dialogOpen, setDialogOpen] = useState(false);

	const onClickInstall = () => {
		if (window.installPrompt) {
			window.installPrompt.prompt();
		} else {
			setDialogOpen(true);
		}
	};

	const installInstructions = (props: typeof clientBrowser) => {
		if (props.isIos && props.browserName === "Safari") {
			return `
				Add Paquet by tapping
				the <span class="${tw
				`text-secondary align-text-bottom material-symbols-outlined`}">ios_share</span> button
				and tap "Add to Home Screen".
			`;
		}

		if (props.isIos && props.browserName !== "Safari") {
			return `
			Unfortunately, Paquet on iOS only works in Safari.
			Open Paquet in Safari and tap 
			the <span class="${tw
				`text-secondary align-text-bottom material-symbols-outlined`}">ios_share</span> button
			and tap "Add to Home Screen".
			`;
		}
	};

	return (
		// Div is required! The island crashes
		<div>
			{!installed && (
				<Card
					class={tw
						`!bg-gradient-to-bl from-primary to-secondary !text-white`}
				>
					<Stack>
						<h2 class={tw`text-xl`}>Install</h2>
						<p>
							It looks like Paquet isn't installed yet. You can
							install it by clicking the button below.
						</p>
						<Button
							fullWidth
							outlined
							onClick={onClickInstall}
							icon="add_to_home_screen"
						>
							Install
						</Button>
					</Stack>
					<Dialog
						title="Install Paquet"
						content={installInstructions(clientBrowser)}
						open={dialogOpen}
						setOpen={setDialogOpen}
						buttons={[
							{
								outlined: true,
								text: "OK",
								onClick: () => setDialogOpen(false),
							},
						]}
					/>
				</Card>
			)}
		</div>
	);
}
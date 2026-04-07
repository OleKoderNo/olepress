"use client";

import { useState } from "react";

// Premium toggle
// Lets the signed-in user turn demo premium access on or off

type PremiumToggleProps = {
	initialValue: boolean;
};

export function PremiumToggle({ initialValue }: PremiumToggleProps) {
	const [enabled, setEnabled] = useState(initialValue);
	const [isSaving, setIsSaving] = useState(false);

	async function handleToggle() {
		const nextValue = !enabled;
		setEnabled(nextValue);
		setIsSaving(true);

		try {
			const response = await fetch("/api/profile/premium", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ premiumEnabled: nextValue }),
			});

			if (!response.ok) {
				throw new Error("Failed to update premium setting");
			}
		} catch {
			setEnabled(!nextValue);
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
			<div className="flex items-center justify-between gap-4">
				<div>
					<h2 className="text-lg font-semibold text-white">Premium access</h2>
					<p className="mt-2 text-sm leading-7 text-neutral-300">
						This is a demo setting for OlePress. It unlocks premium articles so you can showcase
						premium functionality without charging users.
					</p>
				</div>

				<button
					type="button"
					onClick={handleToggle}
					disabled={isSaving}
					aria-pressed={enabled}
					className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
						enabled ? "bg-amber-400/70" : "bg-white/15"
					}`}
				>
					<span
						className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
							enabled ? "translate-x-8" : "translate-x-1"
						}`}
					/>
				</button>
			</div>

			<p className="mt-4 text-xs uppercase tracking-[0.18em] text-neutral-400">
				{isSaving ? "Saving..." : enabled ? "Premium enabled" : "Premium disabled"}
			</p>
		</div>
	);
}

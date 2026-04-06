// Reading time utility
// Estimates reading time from PortableText content

import { toPlainText } from "@portabletext/toolkit";
import type { PortableTextBlock } from "sanity";

export function getReadingTime(body?: PortableTextBlock[]) {
	if (!body) return null;

	const text = toPlainText(body);

	const words = text.trim().split(/\s+/).length;

	const minutes = Math.max(1, Math.ceil(words / 200));

	return `${minutes} min read`;
}

import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "./client";

// Sanity image helper
// Converts Sanity image references into usable URLs

const builder = createImageUrlBuilder(client);

export function urlFor(source: Image) {
	return builder.image(source);
}
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "./client";

// Sanity image helper
// Creates image URLs from Sanity image objects

const builder = createImageUrlBuilder(client);

export function urlFor(source: Image) {
	return builder.image(source);
}
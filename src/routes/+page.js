import { csvParse, autoType } from 'd3-dsv';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const [bookDataResponse, streamDataResponse] = await Promise.all([
		import('$lib/data/books.csv?raw'),
		import('$lib/data/stream_data.csv?raw')
	]);

	const bookData = csvParse(bookDataResponse.default, parseOriginalData);
	const streamData = csvParse(streamDataResponse.default, autoType);

	return {
		bookData,
		streamData
	};
}

function parseOriginalData(d) {
	return {
		id: +d.id,
		title: d.title,
		author: d.author,
		year: +d.year,
		date: new Date(d.date),
		genres: JSON.parse(d.genres),
		language: d.language,
		rating: +d.rating,
		numRatings: +d.numRatings,
		ratingsByStars: JSON.parse(d.ratingsByStars),
		bbeScore: +d.bbeScore,
		bbeVotes: +d.bbeVotes,
		coverImg: d.coverImg
	};
}

export const ssr = false;

export let currentPage = $state({ value: 1 });
export let windowWidth = $state({ value: 0 });
export let windowHeight = $state({ value: 0 });
export let selectedGenre = $state({ value: 'Science Fiction' });

export let genres = [
	{
		value: 'Science Fiction',
		label: 'Science Fiction',
		text: 'Mary Shelley, author of the 1818 novel <span class= "italic-serif">Frankenstein</span>, is affectionately credited as the mother of science fiction. While there are a scattering of earlier stories by other authors, none rose to popularity in the way her story did. Today, it’s consistently among the top five most popular genres of fiction.',
		year: 2012
	},
	{
		value: 'Memoir',
		label: 'Memoir',
		text: "While these books aren’t often the topic of mainstream conversation, every once in a while one will grab the public’s attention. <span class= 'italic-serif'>I’m Glad My Mom Died</span> by Jeanette McCurdy sparked weeks of debate, both online and on daytime television in 2022. And who could forget <span class= 'italic-serif'>Alexander Hamilton</span> by Ron Chernow, which inspired the 2015 hit musical <span class= 'italic-serif'>Hamilton</span>?",
		year: 2005
	},
	{
		value: 'Horror',
		label: 'Horror',
		text: 'Tales of the unnerving and eerie weave throughout ancient religious texts, folk tales and modern stories alike. Our fear of violence, the (un)dead, the unfamiliar, and the inhuman remains with us- perhaps an evolutionary leftover meant to encourage social cohesion within early tribes, or keep us away from decomposing bodies.',
		year: 2011
	},
	{
		value: 'New Adult',
		label: 'New Adult',
		text: "Young Adult fiction includes smash hits like Sara J. Maas’ <span class= 'italic-serif'>A Court of Thorns and Roses</span>- a large part of YA fiction includes romance and fantasy elements aimed at, as the name suggests, young adults.",
		year: 2013
	},
	{
		value: 'Literary Fiction',
		label: 'Literary Fiction',
		text: "The modern successors to <span class= 'italic-serif'>Little Women </span> and <span class= 'italic-serif'>Pride and Prejudice </span>. These stories are realistic, emotional, and opt for the angst of a family reunion over the drama of a battle with a dragon.",
		year: 2002
	}
];

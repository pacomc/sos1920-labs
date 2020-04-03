import App from './App.svelte';

const app = new App({
	target: document.querySelector('#SvelteApp'), // Se carga todo dentro de body del index.js
	props: {
		name: 'world'
	}
});

export default app;
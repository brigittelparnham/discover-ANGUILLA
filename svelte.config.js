import adapter from '@sveltejs/adapter-static';
import path from 'path';

const config = {
  kit: {
    // Set the base path to your GitHub repository name
    paths: {
      base: '/discover-ANGUILLA', // Replace with your actual repo name
    },
    adapter: adapter({
		fallback: 'index.html'
	}),
  }
};

export default config;

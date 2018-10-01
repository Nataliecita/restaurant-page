const cachedContent = ['/css/styles.css',
						'/data/restaurants.json',
						'/img/1.jpg',
						'/img/2.jpg',
						'/img/3.jpg',
						'/img/4.jpg',
						'/img/5.jpg',
						'/img/6.jpg',
						'/img/7.jpg',
						'/img/8.jpg',
						'/img/9.jpg',
						'/img/10.jpg',
						'/',
						'/js/dbhelper.js',
						'/js/main.js',
						'/js/restaurant_info.js'];



// install , open cache and add content to cache
// add cache items
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('version1').then(cache => {
			cache.addAll(cachedContent)
		})
	)	
})

// respond with content from cache, if there isn't fetch from network
// then add what is fetched to the cache
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			if (response) return response;

			console.log('nope');
			return fetch(event.request)
			.then(response => {
				const clonedResponse = response.clone();
				caches.open('version1').then(cache => {
					cache.put(event.request, clonedResponse);
				})
				return response;
			})
			.catch(error => {
				console.error(error);
			});	

		})
	);
})

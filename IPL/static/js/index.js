window.addEventListener('load', function () {
    // Your initialization code here
	
	let carouselInstance = null;

    function initializeCarousel() {
        const carouselHeaderElement = document.getElementById('carouselHeader');
        let carouselHeaderInstance = bootstrap.Carousel.getInstance(carouselHeaderElement);
		
		console.log('-------window.innerWidth-------'+window.innerWidth);
        // Check screen width and initialize if above breakpoint
        if (window.innerWidth >= 768) {
		    console.log('------- width > 768 -------');
			
        } else {
		   console.log('-------dispose-------'+carouselHeaderInstance);
            // Dispose of the carousel if the screen width is below the breakpoint
            if (carouselHeaderInstance) {
                carouselHeaderInstance.dispose();
                carouselHeaderInstance = null;
            }
        }
    }

    // Run initialization on page load
    initializeCarousel();
	
});

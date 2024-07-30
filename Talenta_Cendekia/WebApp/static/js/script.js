document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM fully loaded and parsed'); // Debugging

    anime({
        targets: '.container',
        translateY: [204, 0], // Move from 204px down to its original position
        easing: 'easeInOutQuad', // Smooth easing function
        duration: 2000 // Animation duration in milliseconds
    }).finished.then(() => {
        console.log('Animation finished'); // Debugging
    });
});

document.addEventListener("DOMContentLoaded", () =>{
    anime({
        targets:'.container',
        opacity: [0, 1],
        duration: 6000
    })

});
document.addEventListener('DOMContentLoaded', function() {
    anime({
        targets: '.batik-pattern',
        translate: ['120%', '100%'],
        rotate: ['-10deg', '0deg'],
        opacity : ['0.0', '1.0'],
        filter: ['blur(20px)', 'blur(0px)'],
        duration: 2000,
        easing: 'easeInOutCubic',
    });
    anime({
        targets: '#upper',
        duration: 2000,
        translateX: ['-40%', '0%'],
        opacity: ['0', '1'],
        easing: 'easeInOutCubic'
    })
    anime({
        targets: '#lower',
        duration: 2000,
        translateX: ['-60%', '0%'],
        opacity: ['0', '1'],
        easing: 'easeInOutCubic'
    })
});

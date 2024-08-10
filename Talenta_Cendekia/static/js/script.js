document.addEventListener('DOMContentLoaded', function() {
    anime({
        targets: '.batik-pattern',
        translate: ['120%', '90%'],
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
    });
    anime({
        targets: '#lower',
        duration: 2000,
        translateX: ['-60%', '0%'],
        opacity: ['0', '1'],
        easing: 'easeInOutCubic'
    });
    anime({
        targets: '#tgpattern',
        top: ['100%','75%'],
        opacity: ['0', '1'],
        duration: 2000,
        easing: 'easeInOutCubic'
    });
    anime({
        targets: '.title',
        left: ['-60px', '10px'],
        opacity: ['0', '1'],
        duration: 2000,
        easing: 'easeInOutCubic'
    });

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

    lenis.on('scroll', (e) => {
        let scrollMax = document.body.scrollHeight - window.innerHeight;
        let scrollValue = window.scrollY / scrollMax;

        anime({
            targets: batik,
            rotate: scrollValue * -150,
            opacity: 1 - (scrollValue * 2),
            translateX: scrollValue * 2000,
            filter: `blur(${scrollValue * 40}px)`,
            easing: 'easeOutCubic',
            duration: 0,
        });
        anime({
            targets: '.tagline',
            opacity: 1-(scrollValue*5.5),
            easing: 'easeOutCubic',
            duration: 0,
        })
        anime({
            targets: '#upper',
            translateX: `${scrollValue*-100}%`,
            easing: 'easeOutCubic',
            duration: 0,
        })
        anime({
            targets: '#lower',
            translateX: `${scrollValue*-50}%`,
            easing: 'easeOutCubic',
            duration: 0,
        })
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
});

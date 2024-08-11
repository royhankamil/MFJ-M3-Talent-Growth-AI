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
        console.log(window.scrollY)

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
        anime({
            targets: '#gear-1',
            rotate: `${scrollValue*600}deg`,
            easing: 'easeOutCubic',
            duration: 0,
        })
        anime({
            targets: '#gear-2',
            rotate: `${scrollValue*300}deg`,
            easing: 'easeOutCubic',
            duration: 0,
        })
        anime({
            targets: '#gear-3',
            rotate: `${scrollValue*100}deg`,
            easing: 'easeOutCubic',
            duration: 0,
        })
        anime({
            targets: '#Form',
            opacity: scrollValue*2,
            easing: 'easeOutCubic',
            duration: 0,
        })
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let impianSuggestions = [];
    let profesiSuggestions = [];
    let pendidikanSuggestions = [];

    function loadCSV(filename, suggestionsArray) {
        fetch(filename)
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                suggestionsArray.push(...lines.slice(1).map(line => line.trim())); // Remove header and trim lines
            })
            .catch(error => console.error('Error loading CSV:', error));
    }

    function showSuggestions(query = '', suggestionsArray, itemsContainer) {
        itemsContainer.innerHTML = '';
        let currentFocus = -1;

        const filteredSuggestions = suggestionsArray.filter(suggestion => 
            suggestion.toLowerCase().includes(query.toLowerCase())
        );

        filteredSuggestions.forEach((suggestion) => {
            const item = document.createElement('div');
            item.textContent = suggestion;
            item.classList.add('autocomplete-item');
            item.addEventListener('click', () => {
                itemsContainer.previousElementSibling.value = suggestion;
                itemsContainer.innerHTML = '';
                itemsContainer.style.display = 'none';
            });
            itemsContainer.appendChild(item);
        });

        if (filteredSuggestions.length > 0) {
            itemsContainer.style.display = 'block';
        } else {
            itemsContainer.style.display = 'none';
        }
    }

    function handleInputEvents(inputElement, suggestionsArray, itemsContainer, otherContainers) {
        inputElement.addEventListener('click', () => {
            showSuggestions('', suggestionsArray, itemsContainer);  // Show all suggestions when input is clicked
            otherContainers.forEach(container => container.style.display = 'none');  // Hide other suggestions
        });

        inputElement.addEventListener('input', () => {
            showSuggestions(inputElement.value, suggestionsArray, itemsContainer);
        });

        inputElement.addEventListener('pointerdown', () => {
            otherContainers.forEach(container => container.style.display = 'none');  // Hide other suggestions
        });

        inputElement.addEventListener('keydown', (e) => {
            handleArrowKeys(e, itemsContainer);
        });
    }

    function handleArrowKeys(e, itemsContainer) {
        const items = itemsContainer.getElementsByClassName('autocomplete-item');
        if (e.key === 'ArrowDown') {
            currentFocus++;
            if (currentFocus >= items.length) currentFocus = 0;
            updateActive(items);
        } else if (e.key === 'ArrowUp') {
            currentFocus--;
            if (currentFocus < 0) currentFocus = items.length - 1;
            updateActive(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFocus > -1) {
                items[currentFocus].click();
            }
        }
    }

    function updateActive(items) {
        for (let item of items) {
            item.classList.remove('active');
        }
        if (currentFocus > -1 && items.length > 0) {
            items[currentFocus].classList.add('active');
            input.value = items[currentFocus].textContent;
        }
    }

    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('autocomplete-input')) {
            document.querySelectorAll('.autocomplete-items').forEach(itemsContainer => {
                itemsContainer.style.display = 'none';
            });
        }
    });

    // Load CSVs and setup autocomplete
    loadCSV('static/js/impian.csv', impianSuggestions);
    loadCSV('static/js/profesi.csv', profesiSuggestions);
    loadCSV('static/js/pendidikan.csv', pendidikanSuggestions);
    const impianItemsContainer = document.getElementById('impian-items');
    const profesiItemsContainer = document.getElementById('profesi-items');
    const pendidikanItemsContainer = document.getElementById('pendidikan-items');

    handleInputEvents(
        document.getElementById('impian-input'), 
        impianSuggestions, 
        impianItemsContainer, 
        [profesiItemsContainer, pendidikanItemsContainer]
    );
    
    handleInputEvents(
        document.getElementById('profesi-input'), 
        profesiSuggestions, 
        profesiItemsContainer, 
        [impianItemsContainer, pendidikanItemsContainer]
    );
    
    handleInputEvents(
        document.getElementById('pendidikan-input'), 
        pendidikanSuggestions, 
        pendidikanItemsContainer, 
        [impianItemsContainer, profesiItemsContainer]
    );
});

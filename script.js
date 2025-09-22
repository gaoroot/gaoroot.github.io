// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// Add copy to clipboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create copy buttons for commands
    const commands = document.querySelectorAll('.command code');
    
    commands.forEach(command => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Копировать';
        copyBtn.title = 'Скопировать команду';
        
        command.parentElement.style.position = 'relative';
        command.parentElement.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', function() {
            const textToCopy = command.textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Скопировано!';
                copyBtn.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
                copyBtn.textContent = 'Ошибка';
                copyBtn.style.background = 'var(--accent-color)';
            });
        });
    });
    
    // Highlight current section in navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // Add active class to nav links
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            background-color: rgba(255,255,255,0.2);
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
    
    // Search functionality
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="command-search" placeholder="Поиск команд...">
        <button id="search-btn">Найти</button>
    `;
    
    const navContainer = document.querySelector('nav .container');
    navContainer.appendChild(searchContainer);
    
    // Add search styles
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        .search-container {
            display: flex;
            padding: 0.5rem;
            background: rgba(255,255,255,0.1);
            margin: 0.5rem;
            border-radius: 4px;
        }
        
        #command-search {
            flex: 1;
            padding: 0.5rem;
            border: none;
            border-radius: 3px;
        }
        
        #search-btn {
            background: var(--success-color);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            margin-left: 0.5rem;
            border-radius: 3px;
            cursor: pointer;
        }
        
        .highlight {
            background-color: yellow;
            color: black;
        }
    `;
    document.head.appendChild(searchStyle);
    
    // Search implementation
    document.getElementById('search-btn').addEventListener('click', function() {
        const searchTerm = document.getElementById('command-search').value.toLowerCase();
        
        if (searchTerm) {
            // Remove previous highlights
            document.querySelectorAll('.highlight').forEach(el => {
                el.classList.remove('highlight');
            });
            
            // Search in commands and descriptions
            const commands = document.querySelectorAll('.command');
            let found = false;
            
            commands.forEach(command => {
                const text = command.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    found = true;
                    
                    // Scroll to the command
                    command.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Highlight the command
                    command.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
                    setTimeout(() => {
                        command.style.backgroundColor = '';
                    }, 3000);
                }
            });
            
            if (!found) {
                alert('Команда не найдена');
            }
        }
    });
    
    // Allow Enter key for search
    document.getElementById('command-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('search-btn').click();
        }
    });
});

// Mobile menu toggle for smaller screens
function initMobileMenu() {
    const nav = document.querySelector('nav ul');
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '☰ Меню';
    toggleBtn.className = 'mobile-toggle';
    
    const navContainer = document.querySelector('nav .container');
    navContainer.insertBefore(toggleBtn, navContainer.firstChild);
    
    // Add mobile menu styles
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        .mobile-toggle {
            display: none;
            background: var(--dark-color);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            margin: 0.5rem;
            border-radius: 3px;
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .mobile-toggle {
                display: block;
            }
            
            nav ul {
                display: none;
                flex-direction: column;
            }
            
            nav ul.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(mobileStyle);
    
    toggleBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}
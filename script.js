const { createApp } = Vue;

createApp({
    data() {
        return {
            isMounted: false,
            // Цвета для шариков
            colors: [
                '#FF0000', // красный
                '#00FF00', // зеленый
                '#FFFF00', // желтый
                '#FF00FF', // фиолетовый
                '#00FFFF', // голубой
                '#FFA500', // оранжевый
                '#9370DB', // пурпурный
                '#7CFC00', // салатовый
                '#FF1493', // розовый
                '#00CED1'  // бирюзовый
            ],
            // Конфигурация рядов ёлки
            treeRows: [],
            starSpeed: 800
        }
    },
    methods: {
        // Создание ёлки
        createTree() {
            const rows = 8;
            this.treeRows = [];
            
            for (let i = 0; i < rows; i++) {
                const ballsCount = i + 3; // Количество шариков в ряду
                const row = [];
                
                for (let j = 0; j < ballsCount; j++) {
                    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
                    const randomSpeed = 500 + Math.random() * 1500; // Скорость мигания
                    const randomDelay = Math.random() * 1000; // Задержка анимации
                    
                    row.push({
                        color: randomColor,
                        speed: randomSpeed,
                        delay: randomDelay
                    });
                }
                
                this.treeRows.push(row);
            }
        },
        
        // Создание снежинок - безопасная версия
        createSnowflakes() {
            // Ждем пока DOM полностью загрузится
            setTimeout(() => {
                const snowContainer = document.getElementById('snowflakes-container');
                
                if (!snowContainer) {
                    console.log('Контейнер для снежинок не найден');
                    return;
                }
                
                // Очищаем старые снежинки
                snowContainer.innerHTML = '';
                
                for (let i = 0; i < 50; i++) {
                    const snowflake = document.createElement('div');
                    snowflake.className = 'snowflake';
                    snowflake.innerHTML = '❄';
                    snowflake.style.left = Math.random() * 100 + 'vw';
                    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    snowflake.style.animationDelay = Math.random() * 5 + 's';
                    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
                    snowflake.style.opacity = Math.random() * 0.5 + 0.3;
                    
                    // Добавляем снежинку в контейнер
                    snowContainer.appendChild(snowflake);
                }
            }, 100);
        },
        
        // Изменение скорости мигания звезды
        changeStarSpeed() {
            setInterval(() => {
                this.starSpeed = 400 + Math.random() * 1200;
            }, 3000);
        }
    },
    mounted() {
        this.isMounted = true;
        this.createTree();
        this.createSnowflakes();
        this.changeStarSpeed();
        
        // Периодическое обновление цветов шариков
        setInterval(() => {
            this.createTree();
        }, 10000);
        
        // Пересоздаем снежинки при изменении размера окна
        window.addEventListener('resize', () => {
            this.createSnowflakes();
        });
    }
}).mount('#app');
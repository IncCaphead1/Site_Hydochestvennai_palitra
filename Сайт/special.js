(function() {
    // Проверка, не добавлен ли уже виджет
    if (document.getElementById('sv-toggle-button')) return;

    // Создаём кнопку вызова панели
    var btn = document.createElement('div');
    btn.id = 'sv-toggle-button';
    btn.textContent = 'Версия для слабовидящих';
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-label', 'Открыть настройки версии для слабовидящих');
    btn.tabIndex = 0;

    // Создаём панель с настройками
    var panel = document.createElement('div');
    panel.id = 'sv-panel';
    panel.innerHTML = `
        <div class="sv-header">Настройки для слабовидящих</div>
        <div class="sv-row">
            <button class="sv-btn" data-action="toggle">Включить/выключить версию</button>
        </div>
        <div class="sv-row">
            <button class="sv-btn" data-action="increase">Увеличить (+)</button>
            <button class="sv-btn" data-action="decrease">Уменьшить (-)</button>
        </div>
        <div class="sv-row">
            <button class="sv-btn" data-action="grayscale">Чёрно-белый режим</button>
            <button class="sv-btn" data-action="reset">Сбросить</button>
        </div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    // Подключаем CSS для оформления панели и специальных режимов
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'special.css';
    document.head.appendChild(link);

    // Состояние настроек
    var zoomLevel = 1.0;
    var grayscaleActive = false;
    var specialVersionActive = false;

    // Загрузка из localStorage
    function loadSettings() {
        try {
            zoomLevel = parseFloat(localStorage.getItem('sv_zoom')) || 1.0;
            grayscaleActive = localStorage.getItem('sv_grayscale') === 'true';
            specialVersionActive = localStorage.getItem('sv_active') === 'true';
        } catch (e) {}
        applySettings();
    }

    function saveSettings() {
        try {
            localStorage.setItem('sv_zoom', zoomLevel);
            localStorage.setItem('sv_grayscale', grayscaleActive);
            localStorage.setItem('sv_active', specialVersionActive);
        } catch (e) {}
    }

    function applySettings() {
        // Масштабирование через zoom (поддерживается Chrome, Safari, Edge, Opera)
        document.body.style.zoom = zoomLevel;
        // Чёрно-белый режим
        document.body.classList.toggle('sv-grayscale', grayscaleActive);
        // Класс активной версии (для дополнительных стилей)
        document.body.classList.toggle('sv-active', specialVersionActive);
    }

    // Обработчики кнопок
    var actions = {
        toggle: function() {
            specialVersionActive = !specialVersionActive;
            if (specialVersionActive && zoomLevel === 1.0) zoomLevel = 1.2;
            applySettings();
            saveSettings();
        },
        increase: function() {
            zoomLevel = Math.min(zoomLevel + 0.1, 2.0);
            applySettings();
            saveSettings();
        },
        decrease: function() {
            zoomLevel = Math.max(zoomLevel - 0.1, 0.5);
            applySettings();
            saveSettings();
        },
        grayscale: function() {
            grayscaleActive = !grayscaleActive;
            applySettings();
            saveSettings();
        },
        reset: function() {
            zoomLevel = 1.0;
            grayscaleActive = false;
            specialVersionActive = false;
            applySettings();
            saveSettings();
        }
    };

    // Клик по кнопкам панели
    panel.addEventListener('click', function(e) {
        var target = e.target.closest('[data-action]');
        if (target) {
            e.stopPropagation();
            var action = target.dataset.action;
            if (actions[action]) actions[action]();
        }
    });

    // Открытие/закрытие панели по клику на кнопку
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        panel.classList.toggle('sv-visible');
    });

    // Закрытие панели при клике вне её
    document.addEventListener('click', function(e) {
        if (!panel.contains(e.target) && !btn.contains(e.target)) {
            panel.classList.remove('sv-visible');
        }
    });

    // Поддержка клавиши Enter для кнопки
    btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });

    // Инициализация
    loadSettings();
})();
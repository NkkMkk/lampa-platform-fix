(function () {
    'use strict';

    function plugin() {
        console.log('My Lampa Plugin loaded!');

        // Пример добавления уведомления
        Lampa.Noty.show('Привет, это мой плагин для Lampa!');
    }

    if (window.appready) {
        plugin();
    } else {
        // Ожидание инициализации приложения
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                plugin();
            }
        });
    }
})();

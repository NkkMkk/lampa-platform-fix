
(function () {
    'use strict';

    if (window.lampaPlatformDiagnostic) return;
    window.lampaPlatformDiagnostic = true;

    function init() {
        if (!window.Lampa) return;

        var platform = Lampa.Platform;
        var info = {
            userAgent: navigator.userAgent,
            platformType: typeof platform,
            platform: null
        };

        if (platform && typeof platform === 'object') {
            info.platform = {};

            Object.keys(platform).forEach(function (key) {
                try {
                    var value = platform[key];

                    info.platform[key] =
                        typeof value === 'function'
                            ? '[function]'
                            : value;
                } catch (e) {
                    info.platform[key] = '[error]';
                }
            });
        } else {
            info.platform = platform;
        }

        console.log('LAMPA PLATFORM:', info);

        if (Lampa.Noty && Lampa.Noty.show) {
            Lampa.Noty.show(
                'Диагностика выполнена. Проверьте консоль браузера.'
            );
        }
    }

    function wait() {
        if (!window.Lampa) {
            setTimeout(wait, 500);
            return;
        }

        if (window.appready) {
            init();
        } else if (Lampa.Listener && Lampa.Listener.follow) {
            Lampa.Listener.follow('app', function (event) {
                if (event.type === 'ready') init();
            });

            setTimeout(function () {
                if (window.appready) init();
            }, 2000);
        } else {
            init();
        }
    }

    wait();
})();

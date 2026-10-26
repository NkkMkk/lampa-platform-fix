
(function () {
    'use strict';

    if (window.lampaPlatformCheck) return;
    window.lampaPlatformCheck = true;

    function inspect() {
        var platform = window.Lampa && Lampa.Platform;
        var result = {
            userAgent: navigator.userAgent,
            platformType: typeof platform,
            platformKeys: platform ? Object.keys(platform) : [],
            platformValues: {}
        };

        if (platform) {
            Object.keys(platform).forEach(function (key) {
                var value = platform[key];

                result.platformValues[key] =
                    typeof value === 'function'
                        ? '[function]'
                        : value;
            });
        }

        alert(JSON.stringify(result, null, 2));
    }

    if (window.Lampa) inspect();
    else alert('Lampa.Platform пока недоступен');
})();

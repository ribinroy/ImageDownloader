function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

var init = function () {
    debugger;

    var allowedorNot = getCookie('RRDownloadImageCookie');
    if (allowedorNot == null || allowedorNot == '')
        setCookie('RRDownloadImageCookie', 'isAllowed', 99);

    var activated = false;
    if (getCookie('RRDownloadImageCookie') == 'isAllowed') {
        activated = true;
    }

    $('.status')
        .empty()
        .append(
            'Image Downloader is ' + activated ? 'activated' : 'decativated'
        );
    activated
        ? $('.status').addClass('active')
        : $('.status').removeClass('active');

    $('.button')
        .empty()
        .append(activated ? 'Deactivate' : 'Activate');
    activated
        ? $('.button').addClass('active')
        : $('.button').removeClass('active');

    $('.statusChange').unbind().click(statusChange);
    console.log('initialised inside');
};

var statusChange = function () {
    if (getCookie('RRDownloadImageCookie') == 'isAllowed')
        setCookie('RRDownloadImageCookie', 'notAllowed', 99);
    else setCookie('RRDownloadImageCookie', 'isAllowed', 99);

    init();
};

chrome.tabs.executeScript(null, { code: init() }, function () {
    console.log('initialised');
});
init();

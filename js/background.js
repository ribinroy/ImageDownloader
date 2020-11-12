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

function init() {
    var allowedorNot = getCookie('RRDownloadImageCookie');
    if (allowedorNot == null || allowedorNot == '') {
        setCookie('RRDownloadImageCookie', 'isAllowed', 99);
        allowedorNot = 'isAllowed';
    }

    var imgs = document.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('click', downloadFunction);
        imgs[i].className = 'downloadThisImageRR';
        imgs[i].addEventListener('mousedown', openInNewTab);
    }

    hideTheseItems();
}

function openInNewTab(e) {
    // debugger;
    if (getCookie('RRDownloadImageCookie') == 'isAllowed' && e.which === 2) {
        //open in new tab on middle click
        var imageLink = getLinkOfPicsVC(e.target.src);
        window.open(imageLink, '_blank');
    }
}

function downloadFunction(e) {
    // debugger;
    if (getCookie('RRDownloadImageCookie') == 'isAllowed') {
        var a = document.createElement('a');
        a.href = e.target.src;
        if (window.location.host == 'pics.vc') {
            a.href = getLinkOfPicsVC(e.target.src);
        }

        {
            a.download = e.target.src.split('/')[
                e.target.src.split('/').length - 1
            ];
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
}

function hideTheseItems(e) {
    var classArray = ['el_shadow transition_bs'];
    classArray.forEach((classItem) => {
        var items = document.getElementsByClassName(classItem);
        for (var i = 0; i < items.length; i++) {
            items[i].hidden = true;
        }
    });
}

function getLinkOfPicsVC(srcLink) {
    id = srcLink.split('/')[srcLink.split('/').length - 1].split('.')[0];
    sub1 = id.substr(0, 3);
    sub2 = id.substr(3, 3);
    sub3 = id.substr(6, 3);
    sub4 = id.substr(9, 3);
    xcdn = document
        .getElementsByClassName('gallery_overlay')[0]
        .getAttribute('data-cdn');
    return (
        'http://' +
        xcdn +
        '.pics.vc/pics/o/' +
        sub1 +
        '/' +
        sub2 +
        '/' +
        sub3 +
        '/' +
        sub4 +
        '/' +
        id +
        '.jpg'
    );
}
init();

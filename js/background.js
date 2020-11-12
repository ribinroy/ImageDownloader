
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

function init(){
    var allowedorNot = getCookie('RRDownloadImageCookie');
    if(allowedorNot == null || allowedorNot == ""){
        setCookie('RRDownloadImageCookie','isAllowed',99);
        allowedorNot = 'isAllowed';
    }

    var imgs = document.querySelectorAll('img');
    for(var i=0;i<imgs.length;i++){
        imgs[i].addEventListener('click', downloadFunction);
        imgs[i].className = "downloadThisImageRR";
    }
}

function downloadFunction(e){
    if(getCookie('RRDownloadImageCookie') == "isAllowed"){
        var a = document.createElement('a');
        a.href = e.target.src;
        a.download = e.target.src.split('/')[e.target.src.split('/').length - 1];
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

init();
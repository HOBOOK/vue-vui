export default {
    install(Vue) {
        Vue.config.globalProperties.$utils = {
            copy : (val, callback = null) => {
                if(val) {
                    if(navigator.clipboard) {
                        navigator.clipboard.writeText(val).then(() => {
                        
                        })
                    } else {
                    const t = document.createElement("textarea");
                    document.body.appendChild(t);
                    t.value = val;
                    t.select();
        
                    document.execCommand('copy');
                    document.body.removeChild(t);
                    }
        
                    if(callback !== null)
                    callback()
                }
            },

            openLink: (url) => {
                window.open(url)
            },
        
            scrollUp: (x, y) => {
                window.scrollTo(x, y)
            },

            setCookie(cname, cvalue, exdays) {
                const d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                let expires = "expires="+ d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
              },
          
            getCookie(cname) {
                let name = cname + "=";
                let decodedCookie = decodeURIComponent(document.cookie);
                let ca = decodedCookie.split(';');
                for(let i = 0; i <ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                    }
                }
                return "";
            },

            isMobile() {
                return  ( window.innerWidth <= 520 );
            },

            toCapitalizeText(text) {
                return text.toLowerCase().charAt(0).toUpperCase()+(text.slice(1).toLowerCase())
            }
        }
        
    }
}
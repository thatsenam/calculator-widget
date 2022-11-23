var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

var vueScript = document.createElement('script');
vueScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/vue@2.7.13');
document.head.appendChild(vueScript);

var style = document.createElement('link');
style.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.2/css/bootstrap-grid.min.css');
style.setAttribute('rel', 'stylesheet');

document.head.appendChild(style); 

var style = document.createElement('link');
style.setAttribute('href', 'style.css');
style.setAttribute('rel', 'stylesheet');

document.head.appendChild(style); 




function defer(method) {
    if (window.jQuery && window.Vue) {
        method();
    } else {
        setTimeout(function () { defer(method) }, 50);
    }
}
defer(async function () {
        let template = await fetch("calculator.html")
        template = await template.text()
        var app = new Vue({
            el: '#calculator',
            template: template,
            data: {
                message: 'Mortage Calculator Widgets!',
                num1:3,
                num2:4
            },
            computed:{
                sum: function(){
                    return parseInt(this.num1) + parseInt(this.num2)
                }
            }
        })

});

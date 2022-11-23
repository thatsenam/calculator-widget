var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

var vueScript = document.createElement('script');
vueScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/vue@2.7.13');
document.head.appendChild(vueScript);



function defer(method) {
    if (window.jQuery && window.Vue) {
        method();
    } else {
        setTimeout(function () { defer(method) }, 50);
    }
}
defer(function () {
    $(document).ready(function () {

        var app = new Vue({
            el: '#calculator',
            template: `
            <div id="app-4" style="padding:20px;border:1px solid gray;width:500px">
            <h2>{{ message }}</h2>
            <input type="number" v-model="num1" placeholder="Number 1"/> + <input type="number" v-model="num2" placeholder="Number 2"/> = {{ sum }}
            
          </div>`,
            data: {
                message: 'Mortage Calculator Widgets!',
                num1:3,
                num2:4
            },
            computed:{
                sum: function(){
                    return this.num1 + this.num2
                }
            }
        })

    })
});

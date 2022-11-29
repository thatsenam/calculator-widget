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
style.setAttribute('href', 'https://raw.githack.com/thatsenam/calculator-widget/main/style.css');
// style.setAttribute('href', 'style.css');

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
    let template = await fetch("https://raw.githack.com/thatsenam/calculator-widget/main/calculator.html")
    // let template = await fetch("calculator.html")

    template = await template.text()
    var app = new Vue({
        el: '#calculator',
        template: template,
        data: {
            message: 'DRMC Buydown Calculator',
            loanAmount: 300000,
            interestRateAnnual: 7.00,
            loanPeriodInYears: 30,
            twoOneOfPayment1: 12,
            twoOneOfPayment2: 12,
            zeroOneOfPayment2: 12,


        },
        computed: {
            monthlyPayment: function () {
                return -this.PMT((parseFloat(this.interestRateAnnual) / 100) / 12, this.totalPayment, this.loanAmount)
            },
            totalPayment: function () {
                return parseFloat(this.loanPeriodInYears) * 12
            },


            twoOneInterestRate1: function () {
                return parseFloat(this.interestRateAnnual) - 2
            },
            twoOneInterestRate2: function () {
                return parseFloat(this.interestRateAnnual) - 1
            },
            zeroOneInterestRate2: function () {
                return parseFloat(this.interestRateAnnual) - 1
            },

            twoOneMonthlyPayment1: function () {
                return -this.PMT((parseFloat(this.twoOneInterestRate1) / 100) / 12, this.totalPayment, this.loanAmount)
            },
            twoOneMonthlyPayment2: function () {
                return -this.PMT((parseFloat(this.twoOneInterestRate2) / 100) / 12, this.totalPayment, this.loanAmount)
            },
            zeroOneMonthlyPayment2: function () {
                return -this.PMT((parseFloat(this.zeroOneInterestRate2) / 100) / 12, this.totalPayment, this.loanAmount)
            },



            twoOneMonthlyPaymentReduction1: function () {
                return (parseFloat(this.monthlyPayment) - parseFloat(this.twoOneMonthlyPayment1)).toFixed(2)
            },
            twoOneMonthlyPaymentReduction2: function () {
                return (parseFloat(this.monthlyPayment) - parseFloat(this.twoOneMonthlyPayment2)).toFixed(2)
            },
            zeroOneMonthlyPaymentReduction2: function () {
                return (parseFloat(this.monthlyPayment) - parseFloat(this.zeroOneMonthlyPayment2)).toFixed(2)
            },


            twoOneAnnualPaymentRed1: function () {
                return (this.twoOneMonthlyPaymentReduction1 * this.twoOneOfPayment1).toFixed(2)
            },
            twoOneAnnualPaymentRed2: function () {
                return (this.twoOneMonthlyPaymentReduction2 * this.twoOneOfPayment2).toFixed(2)
            },
            zeroOneAnnualPaymentRed2: function () {
                return (this.zeroOneMonthlyPaymentReduction2 * this.zeroOneOfPayment2).toFixed(2)
            },


            twoOneTotalPaymentRed: function () {
                return (parseFloat(this.twoOneAnnualPaymentRed1) + parseFloat(this.twoOneAnnualPaymentRed2)).toFixed(2)
            },
            twoOneBuyDownPricing: function () {
                return ((parseFloat(this.twoOneTotalPaymentRed) / parseFloat(this.loanAmount)) * 100).toFixed(3)
            },



            zeroOneTotalPaymentRed: function () {
                return (parseFloat(this.zeroOneAnnualPaymentRed2)).toFixed(2)
            },
            zeroOneBuyDownPricing: function () {
                return ((parseFloat(this.zeroOneTotalPaymentRed) / parseFloat(this.loanAmount)) * 100).toFixed(3)
            },



        },
        methods: {
            PMT(ir, np, pv, fv, type) {
                /*
                 * ir   - interest rate per month
                 * np   - number of periods (months)
                 * pv   - present value
                 * fv   - future value
                 * type - when the payments are due:
                 *        0: end of the period, e.g. end of month (default)
                 *        1: beginning of period
                 */
                var pmt, pvif;

                fv || (fv = 0);
                type || (type = 0);

                if (ir === 0)
                    return -(pv + fv) / np;

                pvif = Math.pow(1 + ir, np);
                pmt = - ir * (pv * pvif + fv) / (pvif - 1);

                if (type === 1)
                    pmt /= (1 + ir);

                return pmt.toFixed(2);
            }
        }
    })

});

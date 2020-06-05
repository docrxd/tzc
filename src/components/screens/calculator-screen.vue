<template>
    <div class="calculator-screen-outer">
        <div class="calculator-screen-inner">
            <div class="container">
                <div class="sum-parts-outer panel">
                    <div class="sum-parts-inner">
                        <div class="sum-parts-equation">
                            <calculator-sum-part v-for="field, index in sumParts" :field="field" :index="index" :dropfn="dropElementAction" :allowDrop="allowDropSumParts"></calculator-sum-part>
                        </div>
                        <div class="sum-parts-result">
                            <div class="sum-parts-eq-symbol">
                                =
                            </div>
                            <div class="sum-parts-result-string" v-html="calculationResult.isValid ? (calculationResult.everythingBlank ? '?' : calculationResult.value) : calculationResult.value"></div>
                        </div>
                    </div>
                    <div class="divider-sm"></div>
                    <div>
                        <button class="btn btn-primary" @click="addElementAction()" :disabled="!allowAddSumParts">добавить дробь</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<style lang="scss">
    .calculator-screen-outer {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .calculator-screen-inner {

    }
    .sum-parts-equation {
        display: flex;

    }
    .sum-parts-result {
        display: flex;
        align-items: center;
        padding-top: 26px;
    }
    .sum-parts-eq-symbol {
        width: 60px;
        text-align: center;
        font-size: 40px;
    }
    .sum-parts-result-string {
        font-size: 40px;
    }
    .sum-parts-inner {
        display: flex;
        align-items:center;
    }
</style>
<script>
    export default {
        data() {
            return {
                sumParts: [this.getDefaultSumPart(), this.getDefaultSumPart()]
            }

        },
        computed: {
            allowAddSumParts() {
                return this.sumParts.length < 5;
            },
            allowDropSumParts() {
                return this.sumParts.length > 2;
            },
            calculationResult() {
                let result = { value: 0, isValid: true, everythingBlank: true };
                for(let i = 0; i < this.sumParts.length; i++) {
                    let sp = this.sumParts[i];
                    if(!sp.int.isBlank || !sp.decimal.isBlank) { result.everythingBlank = false; }

                    if(result.isValid) {
                        if((sp.int.validated && !sp.int.valid) || (sp.decimal.validated && !sp.decimal.valid)) {
                            result.isValid = false;
                            result.value = 'Заполните все поля корректно';
                        } else {
                            result.value += parseFloat(sp.int.mathValue+'.'+sp.decimal.mathValue);
                        }

                    }

                }
                if(result.isValid) {
                    result.value = this.toFixedValue(result.value, 2);
                }
                return result;
            }
        },
        methods: {
            toFixedValue(a,b) {
                let c = a.toString().split('.');
                if(!c[1]) { return a; }
                if(c[1].toString().length < b) { return a; }
                return parseFloat(c[0]+'.'+(c[1].substr(0, 2)));
            },
            getDefaultSumPart() {
                return {
                    int: { value: '', valid: true, validated: false, mathValue: 0, isBlank: true },
                    decimal: { value: '', valid: true, validated: false, mathValue: 0, isBlank: true }
                }
            },
            addElementAction() {
                if(!this.allowAddSumParts) { return; }
                this.sumParts.push(this.getDefaultSumPart());
            },
            dropElementAction(index) {
                if(!this.allowDropSumParts) { return; }
                this.sumParts.splice(index, 1);
            }
        }
    }
</script>
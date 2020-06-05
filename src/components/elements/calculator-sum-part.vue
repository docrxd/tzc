<template>
    <div class="calculator-sum-part-outer">
        <div :class="['calculator-sum-part-drop', allowDrop ? '' : 'disabled']" @click="dropAction()" >удалить</div>
        <div class="calculator-sum-part-inner">
            <div class="calculator-sum-part-field">
                <input type="text" :class="['form-control', field.int.validated ? (field.int.valid ? '' : 'error') : '']" @keyup="revalidateKey('int')" v-model="field.int.value" @keypress="handleKeypress($event)" placeholder="..." maxlength="2">
            </div>
            <div class="calculator-sum-part-delimeter"></div>
            <div class="calculator-sum-part-field">
                <input type="text" :class="['form-control', field.decimal.validated ? (field.decimal.valid ? '' : 'error') : '']" @keyup="revalidateKey('decimal')" v-model="field.decimal.value" @keypress="handleKeypress($event)" placeholder="..." maxlength="2">
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .calculator-sum-part-delimeter {
        border-bottom: 1px solid #eeeef4;
        margin: 10px 0;
    }
    .calculator-sum-part-drop {
        color: #e63312;
        opacity: 0;
        cursor: pointer;
        font-size: 12px;
        padding-bottom: 12px;
        text-align: center;
        &.disabled {
            opacity: 0 !important;
            cursor: default;
        }
    }
    .calculator-sum-part-outer {
        padding-right: 60px;
        position: relative;
        &::after {
            content: "+";
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(-20px, -50%);
            font-size: 40px;
        }
        &:last-child {
            padding-right: 0;
            &::after {
                display: none;
            }
        }
        &:hover {
            .calculator-sum-part-drop {
                opacity: 1;
            }
        }
    }
</style>
<script>
    export default {
        props: ['field', 'dropfn', 'index', 'allowDrop'],
        data() {
            return {
               

            }
        },
        watch: {
            'field.int.value'() {
                this.recalculateMathValue('int');
            },
            'field.decimal.value'() {
                this.recalculateMathValue('decimal');
            }
        },
        methods: {
            recalculateMathValue(k) {
                let target = this.field[k];
                let val;
                try {
                    val = target.value.toString().trim();
                } catch(e) {
                    val = '';
                }
                if(target.value === '') {
                    target.mathValue = 0;
                    target.isBlank = true;
                } else {
                    target.mathValue = isNaN(val) ? 0 : val;
                    target.isBlank = false;
                }
            },

            revalidateKey(k) {
                let target = this.field[k];
                let valid = this.isValueValid(target.value);
                target.valid = valid;
                target.validated = true;
            },
            isValueValid(val) {
                val  = val.trim();
                if(val === '') { return 1; }
                if(isNaN(val)) { return 0; }
                return (val > 0 || val < 99);
            },
            validateIntegerInput($event) {
                return $event.charCode >= 48 && $event.charCode <= 57;
            },
            handleKeypress($event) {
                let valid = this.validateIntegerInput($event);
                if(!valid) { $event.preventDefault(); }
                return valid;
            },
            dropAction() {
                if(!this.allowDrop) { return; }
                this.dropfn(this.index);
            }
        }
    }
</script>
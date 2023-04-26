<template>
      <div class="mb-3">
        <input v-bind="$attrs" @input="updateVal" :value="inputRef.val" @blur="validateInput" class="form-control" :class="{'is-invalid': inputRef.error}" aria-describedby="emailHelp">
        <div class="form-text invalid-feedback" v-if="inputRef.error">{{ inputRef.message }}</div>
      </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
// 正则表达式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RangeProp {
  message: string,
  length: number
}
interface RuleProp {
  type: 'required' | 'email' | 'range', // 字面量
  message?: string,
  min?: RangeProp,
  max?: RangeProp
}
export type RulesProp = RuleProp[]
export default defineComponent({
  inheritAttrs: false,
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String as PropType<string>

  },
  setup (props, context) {
    console.log(context.attrs)
    const inputRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const updateVal = (e: Event) => {
      const targetVal = (e.target as HTMLInputElement).value
      inputRef.val = targetVal
      context.emit('update:modelValue', targetVal)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          if (rule.message) inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'range':
              // 最小数
              if (rule.min && (inputRef.val.length < rule.min.length)) {
                inputRef.message = rule.min.message
                passed = false
              } else if (rule.max && (inputRef.val.length > rule.max.length)) {
                inputRef.message = rule.max.message
                passed = false
              } else {
                passed = true
              }
              break
            default:
              passed = true
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
    }
    return {
      validateInput,
      updateVal,
      inputRef
    }
  }
})
</script>

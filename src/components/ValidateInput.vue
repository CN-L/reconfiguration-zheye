<template>
      <div class="mb-3">
        <input @input="updateVal" :value="inputRef.val" @blur="validateInput" type="email" class="form-control" :class="{'is-invalid': inputRef.error}" id="validationCustomUsername" aria-describedby="emailHelp">
        <div class="form-text invalid-feedback" v-if="inputRef.error">{{ inputRef.message }}</div>
      </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
// 正则表达式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
  type: 'required' | 'email',
  message: string
}
export type RulesProp = RuleProp[]
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String as PropType<string>

  },
  setup (props, context) {
    const inputRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const updateVal = (e: KeyboardEvent) => {
      const targetVal = (e.target as HTMLInputElement).value
      inputRef.val = targetVal
      context.emit('update:modelValue', targetVal)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            default:
              passed = true
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        console.log(inputRef.error)
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

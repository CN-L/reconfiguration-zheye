<template>
      <div class="mb-3">
        <input v-if="tag !== 'textarea'" v-bind="$attrs" v-model="inputRef.val" @blur="validateInput" class="form-control" :class="{'is-invalid': inputRef.error}" aria-describedby="emailHelp">
        <textarea v-else v-model="inputRef.val" :class="{'is-invalid': inputRef.error, 'form-control': true}" @blur="validateInput" cols="30" rows="5" v-bind="$attrs" aria-describedby="emailHelp"></textarea>
        <div class="form-text invalid-feedback" v-if="inputRef.error">{{ inputRef.message }}</div>
      </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, watch, computed } from 'vue'
import { emitter } from '@/components/ValidateForm.vue'
// 正则表达式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RangeProp {
  message: string,
  length: number
}
export type TagType = 'input' | 'textarea'

interface RuleProp {
  type: 'required' | 'email' | 'range' | 'custom', // 字面量
  message?: string,
  min?: RangeProp,
  max?: RangeProp,
  validator?: () => boolean
}
export type RulesProp = RuleProp[]
export default defineComponent({
  inheritAttrs: false,
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String as PropType<string>,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  setup (props, context) {
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
      emitter.emit('form-item-clear', clearItemInput)
    })
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || '',
        set: (newVal) => {
          context.emit('update:modelValue', newVal)
        }
      }),
      error: false,
      message: ''
    })
    const clearItemInput = () => {
      inputRef.val = ''
      inputRef.error = false
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
            case 'custom':
              passed = rule.validator ? rule.validator() : true
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
      } else {
        return true
      }
    }
    return {
      validateInput,
      inputRef
    }
  }
})
</script>

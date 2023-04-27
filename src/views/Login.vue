<template>
  <ValidateForm @form-submit="onFormSubmit" @clear-inputs="onClear">
      <div class="mb-3">
        <label class="form-label">电子邮箱</label>
        <ValidateInput placeholder="请输入邮箱地址" v-model="emailVal" :rules="emailRules"></ValidateInput>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInput placeholder="请输入密码" v-model="passWord" :rules="passwordRules"></ValidateInput>
      </div>
      <!-- 等同于v-slot:submit -->
      <template #submit>
        <span class="btn btn-danger">submit</span>
      </template>
    </ValidateForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
export default defineComponent({
  name: 'loginView',
  setup () {
    const emailVal = ref('123456@163.com')
    const passWord = ref('123456789l')

    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'range', min: { message: '你的密码至少包括六位，不能含有空格', length: 6 }, max: { message: '你的密码至不能超过二十位，不能含有空格', length: 20 } }
    ]

    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const onClear = () => {
      console.log('清空input')
    }
    const onFormSubmit = (result: boolean) => {
      if (result) {
        onClear()
      }
    }
    return {
      emailVal,
      passWord,
      passwordRules,
      emailRules,
      onFormSubmit,
      onClear
    }
  },
  components: {
    ValidateInput,
    ValidateForm
  }
})
</script>

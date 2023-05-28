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
import { useRouter } from 'vue-router'
import store from '@/store/store'
export default defineComponent({
  name: 'loginView',
  setup () {
    const router = useRouter()
    const emailVal = ref('111@test.com')
    const passWord = ref('111111')

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
      if (!result) return // 验证不通过返回
      const form = {
        email: emailVal.value,
        password: passWord.value
      }
      store.dispatch('loginAndFetch', form).then(res => {
        onClear()
        router.push({ path: '/' })
      }).catch(error => console.log(error))
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

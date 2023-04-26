<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <!-- <ColumnList :list="testData"></ColumnList> -->
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">电子邮箱</label>
        {{ emailVal }}
        <ValidateInput placeholder="请输入邮箱地址" v-model="emailVal" :rules="emailRules"></ValidateInput>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        {{ emailVal }}
        <ValidateInput placeholder="请输入密码" v-model="passWord" :rules="passwordRules"></ValidateInput>
      </div>
      <!-- 等同于v-slot:submit -->
      <template #submit>
        <span class="btn btn-danger">submit</span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
export default defineComponent({
  name: 'App',
  setup () {
    const emailVal = ref('123456@163.com')
    const passWord = ref('123456789l')
    const testData: ColumnProps[] = [
      {
        id: 1,
        title: 'test1的专栏',
        description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 2,
        title: 'test2的专栏',
        description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧'
        // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 3,
        title: 'test1的专栏',
        description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 4,
        title: 'test2的专栏',
        description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 5,
        title: 'test1的专栏',
        description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 6,
        title: 'test2的专栏',
        description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      }
    ]

    const currentUser: UserProps = {
      id: 1,
      name: 'viking',
      isLogin: true
    }
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'range', min: { message: '你的密码至少包括六位，不能含有空格', length: 6 }, max: { message: '你的密码至不能超过二十位，不能含有空格', length: 20 } }
    ]

    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const onFormSubmit = (result: boolean) => {
      console.log(result)
    }
    return {
      testData,
      currentUser,
      passwordRules,
      emailRules,
      emailVal,
      passWord,
      onFormSubmit
    }
  },
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  }
})
</script>

<style>
</style>

# reconfiguration-zheye

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目中遇到的问题以及需要注意的地方


# Vue 3 + TypeScript + Vite

## render Fuction 和 vnode

- ### 认知vitrulalDom

定义： 一种虚拟的，<u>保存在内存中的结构数据，用来代表ui的表现</u>，和真实dom字节保持同步。VitrulalDom（虚拟dom）是由一系列的Vnode组成的

```typescript
// 模拟一个简单的Vnode
cont vNode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* more vnodes */
  ]
}
```

- ### Render Pipeline（即template编译）

```vue
1. Compile, vue组件的Template会被编译为render function(特殊的function，即一个返回Virtual Dom树的函数)

2. Mount， 执行render function， 遍历虚拟dom树。生成真正的dom节点

3. Path， 当组件中响应式对象（依赖）发生变化。执行更新操作。生成新的虚拟Dom节点数，vue内部会遍历新的虚拟节点树，和旧的做对比，执行必要的更新
```



### 对比template和render function的写法区别：

```vue
1. template比render function更接近html，更好懂，更容易修改
2. template更容易做静态优化，Vue的complier在编译过程中可做很多自动的性能优化
3. 实践中，template适应大多数的情况，只有在极少数情况下，还需要学习使用render function。因为它本身是javascript语法，要灵活多变。vue提供对应的api乐意不使用template，而是直接使用render funcition
```



### 虚拟Dom的优点

```html
使用更方便的方式，供开发者操作ui的状态和结构，不必跟真实dom节点打交道

更新效率高，计算需要的最小化操作，并完成更新
```



### 关于监听子组件的生命周期

vue3.0中

```vue
 <!-- 在 Vue 3 中，事件名附带的是 vnode- 前缀： -->
<template>
  <child-component @vnode-updated="onUpdated">
</template>
<!-- 或者在驼峰命名法的情况下附带前缀 vnode： -->
<template>
  <child-component @vnodeUpdated="onUpdated">
</template>
```

vue2.0中

```vue
<template>
  <child-component @hook:updated="onUpdated">
</template>
```

创建虚拟dom: h函数

```typescript
h('h1', props.msg + count.value), h('div', count.value)
<!--也可以返回个数组-->
return () => [h('h1', props.msg + count.value), h('div', count.value)]
```

jsx是h函数的语法糖，可以将这种类似于html写法转为h函数

```jsx
// 创建vnode
const vnode = <div>hello</div>
//使用变量
const vnode = <div id={dynamicId}>hello, {username}</div>
```

关于render函数：可用于虚拟dom挂载到指定真实dom节点上

```tsx
<!-- 如果想使用mout进行挂载 那是createdApp创建出来的虚拟dom才能行-->
render(messageVnode, mountNode) <!--messageVnode 挂在到moutNode-->
```

关于退出登陆的功能

```html
目中使用isLogin记录当前状态，一旦刷新为false，但app.vue中调用了当前用户信息的请求 处理请求时重新设为了true， 退出登陆应该是清本地存储,提交mutations手动改isLogin状态和token
```

关于图片上传组件 请求主体类型是'Content-Type': 'multipart/form-data'

```vue
<!-- 首先一个button触发事件，点击事件触发隐藏的input的click事件即可 -->
const fileInput = ref<HTMLInputElement | null>(null)
const triggerUpload = () => {
   if(fileInput.value) {
      fileInput.value.click()
    }
}
<!--上传状态是由axios的几个方法实现的 catch then finally-->
<!--  上传前的检查通过props传过来的function -->
```

如果想根据某个值是否存在而返回布尔值：那么可以下面这么做

```typescript
const isEditMode = !!route.query.id // 是否为编辑模式
```

关于wath监听props上的属性或者reactive上的属性

```typescript
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)
```

关于优化input组件：编辑修改时触发watch，和@input两个事件

```typescript
1.原本子组件props接收父组件v-model的值，通过@input触发父组件方法更新input
2.watch函数监听父组件props的值，并及时更新，但这样会触发watch和@input
<!--优化办法： computed方法，在set中调用父组件Function,原本@input触发emit方法就可以删除，但是还是需要展示value以及@input时候做绑定，那么刚好v-model等同于他们
const iptRef = reactive({
      val: computed({
        get: () => props.emailVal || '',
        set: val => {
          emit('update:emailVal', val)
        }
      }),
      error: false,
      message: ''
    })
```

关于函数式组件

```vue
函数式组件适用于在代码逻辑中使用的组件
```

注意：如果script使用组合式函数setup语法，想暴露组件的方法和属性（访问实例属性和方法

```vue
可使用defineExpose进行导出（参考Editor组件）
```

关于开发环境和生产环境

```vue
开发版本包含完整的警告和调试模式
生产版本删除了警告，更加稳定
```

vite为何比vue-cli快（主要说的是开发环境）

```vue
vue-cli：采用基于webpack打包工具,生产环境和开发环境差不多
vite：生产环境采用的是Rollup，开发环境基于ES模块和原生浏览器支持
```


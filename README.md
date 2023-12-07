### 介绍

## 一个基于@antv/g2 的 chart webComponent 组件

g2-render 使用 json 配置,在父组件写渲染逻辑有几个好处:

1. 直接使用 g2 的链式语法,可以拷贝 g2 的 demo 立即使用,
2. 渲染逻辑在父组件控制,避免封装通用组件
3. 支持 json 系列化, 对于低代码项目友好

缺点:
因为 webComponent 隔绝了 dom, 所以需要指定宽高, 元芳有什么好办法吗?

# Install

```js
pnpm add g2-render

import '@/assets/g2-render.es'
// or
import { parser } from '@/assets/g2-render.es'
```

### vue

demo: [stackblitz](https://stackblitz.com/edit/vitejs-vite-vnfz8k?file=src/App.vue)

因为 webComponent 隔绝了 dom, 所以需要指定宽高

```js
<template>
  <g2-render
    :json.prop="json"
    :data.prop="data"
    :scope.prop="scope"
    :init-config.prop="{
      height: 300,
      width: 300,
    }"
    debug="true"
  ></g2-render>
</template>

// 记得使用.prop 绑定变量 https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue
<script setup>

const render = ({  chart, x, y, data }) => {

 //...
  chart.data(data).line().position(`${x}*${y}`);
  chart.render()
}
// 注意 stringify 接受一个对象, 具有值为函数的render属性
const json = parser.stringify({
  render
})

const data =[]
const scope = {x='x',y='y'}
</script>


// vite.config.js
defineConfig({
  plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => /^g2-render/.test(tag),
          },
        },
      }),
  ]
})

```

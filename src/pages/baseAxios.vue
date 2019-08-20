<template>
    <div>
        {{message}}
    </div>
</template>
<script>
    /**
     * 组件中name的作用：
     *      1，当项目中使用keep-alive的时候，可以搭配组件的name进行组件过滤
     *          组件过滤的方式
     *              1，使用activated()钩子
     *              2，使用keep-alive中的过滤 ：
     *                  <keep-alive exclude="baseAxios"><router-view /></keep-alive>（include属性：  包含）
     *                  activated （进入页面时调用）deactivated（离开页面时调用）这两个生命周期函数一定是要在使用了keep-alive组件后才会有的，否则则不存在
     *      2，2.DOM做递归组件时  比如说detail.vue组件里有个list.vue子组件，递归迭代时需要调用自身name
     * 
     * 路由中name的作用：
     *      1，通过name属性，为一个页面中不同的router-view渲染不同的组件  
     *          <div id="app">
     *              <router-view></router-view>
     *              <router-view  name="Hello"></router-view> //将渲染Hello组件
     *              <router-view  name="text"></router-view>   //将渲染text组件
     *          </div>
     *      2，通过name传值：在页面中通过this.$name获取name的值
     *      3，在router-link通过params传参:to={name="",params:{}}传值的时候需要name。
     */
    import axios from 'axios'
    export default {
        name:'baseAxios', 
        data(){
            return {
               message:'use base axios' 
            }
        },
        mounted(){
            //使用mock数据https://www.easy-mock.com/login
            // axios.get("https://www.easy-mock.com/mock/5d5a1b370ed8b12d3151215e/testAxios/getTest",{params:{id:12,querykey:'sanxin'}}).then((res)=>{
            //     console.log(res)
            // })
            axios({
                method:'get',
                url:'https://www.easy-mock.com/mock/5d5a1b370ed8b12d3151215e/testAxios/getTest',
                params:{
                    id:13,
                    key:'dsda'
                }
            }).then(res=>{
                console.log(res);
            })
        }
    }
</script>
<style scoped>

</style>
<template>
    <div class="home">
        <van-contact-list
            :list="list"
            @add="onAdd"
            @edit="onEdit"
        />
        <!-- 联系人编辑 -->
        <van-popup v-model="showEdit" position="bottom">
            <van-contact-edit
                :contact-info="editingContact"
                :is-edit="isEdit"
                @save="onSave"
                @delete="onDelete"
            />
        </van-popup>    
    </div>
</template>
<script>
import { ContactList,ContactEdit,Toast,Popup } from 'vant'
import axios from 'axios'
export default {
    name:'contactList',
    data(){
        return {
            // {
            //     id:1,
            //     name:'',
            //     tel:''
            // }
            list:[],
            showEdit:false,//编辑弹窗的显示隐藏
            editingContact:{},//正在编辑的联系人数据
            isEdit:false, //是否编辑还是新建（false）
            instance:null //axios实例
        }
    },
    methods:{
        //获取联系人列表
        async getList(){
            let res = await this.$Http.getContactList()
            this.list=res.data;
            // this.instance.get('/contactList')
            // .then(res=>{
            //     console.log(res.data.data)
            //     this.list=res.data.data;
            // })
            // .catch(err=>{
            //     Toast('请求失败，稍后再试');
            // })
        },
        //新建联系人
        onAdd(){
            this.showEdit = true
            this.isEdit = false
        },
        //编辑联系人
        onEdit(info){
            this.showEdit = true
            this.isEdit = true
            this.editingContact = info
        },
        //保存联系人
        async onSave(info){
            if(this.isEdit){
                //编辑保存
                let res = await this.$Http.editContact(info)
                console.log(res);
                if(res.code === 200 ){
                    this.showEdit = false
                    await this.getList()
                    Toast("保存成功")
                    // setTimeout(()=>{
                    //     Toast("保存成功")
                    // },300)
                    
                }
                // this.instance.put('/contact/edit',info)
                // .then(res=>{
                //     console.log(res.data)
                //     if(res.data.code === 200){
                //         Toast("保存成功")
                //         this.showEdit = false
                //         this.getList()
                //     }
                // })
                // .catch(()=>{
                //     Toast("请求失败，稍后重试123")
                // })
            }else{
                //新建保存
                let res=await this.$Http.newContactForm(info,true)
                console.log(res);
                if(res.code === 200){
                    this.showEdit = false
                    await this.getList()
                    Toast("保存成功")
                }

                
                // this.instance.post('/contact/new/json',info)
                // .then(res=>{
                //     console.log(res)
                //     if( res.data.code === 200 ){
                //         Toast("保存成功")
                //         this.showEdit = false
                //         this.getList()
                //     }
                // })
                // .catch(()=>{
                //     Toast("请求失败，稍后重试")
                // })
            }
        },
        //删除联系人
        async onDelete(info){
            console.log(info.id)
            let res = await this.$Http.delContact({id:info.id});
            if(res.code === 200){
                this.showEdit = false
                await this.getList()
                Toast("删除成功")
            }
            // this.instance.delete('/contact',{params:{id:info.id}})
            // .then(res=>{
            //     if(res.data.code === 200){
            //         Toast("删除成功")
            //         this.showEdit = false
            //         this.getList()
            //     }
            // })
            // .catch(()=>{
            //      Toast("删除失败，请稍后重试")
            // })
        }
    },
    mounted(){
        console.log("页面加载了");
        //创建axios实例
        this.instance = axios.create({
            baseURL:'http://localhost:9000/api',
            timeout:3000
        });
        this.getList()
    },
    components:{//组件注册是需要在template中使用的才注册。比如Toast就不需要
        [ContactList.name]:ContactList,
        // [Toast.name]:Toast
        [ContactEdit.name]:ContactEdit,
        [ Popup.name]:Popup
    }
}
</script>
<style scoped>
    .van-popup{
        height: 60%;
    }
    .van-contanct-list__add{
        z-index: 0;
    }
</style>
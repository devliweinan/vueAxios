const COUTACT_API = {
    //获取联系人列表
    getContactList:{
        method:'get',
        url:'/contactList'
    },
    //新建联系人 form-data请求数据格式
    newContactForm:{
        method:'post',
        url:'/contact/new/form'
    },
    //新建联系人 application/json请求数据格式
    newContactJson:{
        method:'post',
        url:'/contact/new/json' 
    },
    //编辑联系人
    editContact:{
        method:'put',
        url:'/contact/edit'
    },
    //删除联系人
    delContact:{
        method:'delete',
        url:'/contact'
    }
}

//导出对象
export default COUTACT_API;
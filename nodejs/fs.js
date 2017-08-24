/**
 * Created by sun on 2017/3/23.
 */
const fs = require('fs');

//fs.readFile()文件名，同&异步操作--回调函数
//fs.writeFile()  文件名  内容  回调函数

fs.readFile('aaa.text',function(err,data){
    if(err){
        console.log('文件读取失败')
    }else{
        console.log(data.toString());
    }
})

fs.writeFile('bbb.txt','afdfafsfsad',function(err){
    console.log(err)
})
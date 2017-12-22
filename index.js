Vue.component('gambar',{
    props : ['data'],
    template : ` 
            <div class="form-group">
                <div class="col-md-12">
                    <img :src="data" style="width:100%;"/>
                </div>
            </div>`
})

Vue.component('translate',{
    props : ['bill'],
    template : 
    `<div class="form-group" style="color:white;">
                <div class="col-md-12">
                    <p>{{ bill }}</p>
                </div>
            </div>`
})

const app = new Vue({
    el : '#app',
    data : {
        image : '',
        text : null
    },
    created(){

    },
    methods:{
        uploadFile : function(){
            if(document.getElementById('file').files.length){
                this.getFile()
            }else{
                this.getUrl()
            }                
        },
        getUrl : function(){
            axios.post('http://localhost:3000/api/photo/url',{
                url : document.getElementById('url').value,
                from : document.getElementById('from').value
            })
            .then((result)=>{
                
                this.image = document.getElementById('url').value
                this.text = result.data.data;
                document.getElementById('url').value = '';
                // localStorage.setItem('img',result.data.data);
            })
            .catch(err => {
                console.log(err)
            })
        },
        getFile : function(){
            
            const data = new FormData();
            data.append('image',document.getElementById('file').files[0]);
            data.append('from',document.getElementById('from').value);                
            axios.post('http://localhost:3000/api/photo', data)
            .then((result)=>{
                this.image = result.data.image;
                this.text = result.data.data;
                document.getElementById('file').files = '';  
                console.log(result);                  
                // localStorage.setItem('img',result.data.data.filename);
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})
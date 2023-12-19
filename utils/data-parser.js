module.exports = async (request) =>{
    return new Promise((resolve, reject) =>{
        try{
            let body = '';
            request.on('data',(chunk)=>{
                body += chunk;
            })
            request.on('end',()=>{
                resolve(body)
            })
        }catch (err){
         console.log(err);
         reject(err);
        }
    })
}
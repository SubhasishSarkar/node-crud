var ObjectID = require('mongodb').ObjectID

module.exports=function(app,db){
    app.post('/notes',(req,res)=>{
        const note = {text: req.body.body, title:req.body.title}
        db.collection('notes').insert(note,(err,results)=>{
            if(err){
                console.log(err);
                res.send({'error':"An error"});
            }else{
                res.send(results.ops[0])
            }
        });
    });
    app.delete('/notes/:id',(req,res)=>{
        const id = req.params.id;
        const details = {'_id':new ObjectID(id)};
        db.collection('notes').remove(details,(err,results)=>{
            if(err){
                console.log(err);
                res.send({'error':"An error"});
            }else{
                res.send(results.ops[0])
            }
        });
    });
    app.put('/notes/:id',(req,res)=>{
        const id = req.params.id;
        const details = {'_id':new ObjectID(id)};
        const note = {text: req.body.body, title:req.body.title}
        db.collection('notes').fupdate(details,note,(err,results)=>{
            if(err){
                res.send({'error':"An error"});
            }else{
                res.send(results)
            }
        });
    });
    app.get('/notes/:id',(req,res)=>{
        const id = req.params.id;
        const details = {'_id':new ObjectID(id)};
        db.collection('notes').findOne(details,(err,results)=>{
            if(err){
                res.send({'error':"An error"});
            }else{
                res.send(results)
            }
        });
    });
}
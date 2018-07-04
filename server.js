const express = require('express')
const app = express()



app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/conv',function(req,res){
    res.sendFile(__dirname+'/conv.html');
});

app.get('/game',function(req,res){
    res.sendFile(__dirname+'/game.html');
});


app.use('/css',express.static(__dirname + '/src/css'));
app.use('/js',express.static(__dirname + '/src/js'));
app.use('/images',express.static(__dirname + '/src/images'));
app.use('/game_content',express.static(__dirname + '/src/game_content'));



const port = 3333;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
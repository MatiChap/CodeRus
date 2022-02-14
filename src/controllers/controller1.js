const path = require('path');

const controlador = 
{
index: (req, res) => {	
        res.render('home');
},

dev: (req, res) => {
    let devs = [
        {
                id:0, 
                name:'Jonas Johnson Jones', 
                price:' $25/hr',
                desc: 'Hi, my name is Jonas Johnson Jones. I was born in Iran in 1992. Since 2010 I have been developing projects and websites on various platforms. I am also an experienced programmer in Blockchain, Python and NodeJS.',
                pp: '/img/pp.jpg',
                rate:'57.1%',
                completed:4,
                total:7
        },
        {
                id:1, 
                name:'Naomi Cheng',
                price:' $35/hr',
                desc: 'Hello, I am Naomi Cheng. Born in Taiwan in 1990, I dedicated to back-end programming since 2008 and am very experienced with almost every language. Programming is my passion! ',
                pp: '/img/pp2.jpg',
                rate:'70%',
                completed:7,
                total:10
         }
   ];
    res.render('dev',{data: devs});
},
deletedev: function(req,res){
        let devs = [
                {
                        id:0, 
                        name:'Jonas Johnson Jones', 
                        price:' $25/hr',
                        desc: 'Hi, my name is Jonas Johnson Jones. I was born in Iran in 1992. Since 2010 I have been developing projects and websites on various platforms. I am also an experienced programmer in Blockchain, Python and NodeJS.',
                        pp: '/img/pp.jpg',
                        rate:'57.1%',
                        completed:4,
                        total:7
                },
                {
                        id:1, 
                        name:'Naomi Cheng',
                        price:' $35/hr',
                        desc: 'Hello, I am Naomi Cheng. Born in Taiwan in 1990, I dedicated to back-end programming since 2008 and am very experienced with almost every language. Programming is my passion! ',
                        pp: '/img/pp2.jpg',
                        rate:'70%',
                        completed:7,
                        total:10
                 }
           ];
           let list = devs.filter((dev) => dev.id != req.params.id);
           devs = list
           res.render('dev',{data:devs});
        
        
},
edit: (req,res) => {
        
        let idUser=req.params.id;
        let devs = [
                {
                        id:0, 
                        name:'Jonas Johnson Jones', 
                        price:' $25/hr',
                        desc: 'Hi, my name is Jonas Johnson Jones. I was born in Iran in 1992. Since 2010 I have been developing projects and websites on various platforms. I am also an experienced programmer in Blockchain, Python and NodeJS.',
                        pp: '/img/pp.jpg',
                        rate:'57.1%',
                        completed:4,
                        total:7
                },
                {
                        id:1, 
                        name:'Naomi Cheng',
                        price:' $35/hr',
                        desc: 'Hello, I am Naomi Cheng. Born in Taiwan in 1990, I dedicated to back-end programming since 2008 and am very experienced with almost every language. Programming is my passion! ',
                        pp: '/img/pp2.jpg',
                        rate:'70%',
                        completed:7,
                        total:10
                 }
           ];

           let userToEdit = devs[idUser];

           res.render('edit', {userToEdit: userToEdit})
           
},

edited:function (req,res) {
        let devs = [
                {
                        id:0, 
                        name:'Jonas Johnson Jones', 
                        price:' $25/hr',
                        desc: 'Hi, my name is Jonas Johnson Jones. I was born in Iran in 1992. Since 2010 I have been developing projects and websites on various platforms. I am also an experienced programmer in Blockchain, Python and NodeJS.',
                        pp: '/img/pp.jpg',
                        rate:'57.1%',
                        completed:4,
                        total:7
                },
                {
                        id:1, 
                        name:'Naomi Cheng',
                        price:' $35/hr',
                        desc: 'Hello, I am Naomi Cheng. Born in Taiwan in 1990, I dedicated to back-end programming since 2008 and am very experienced with almost every language. Programming is my passion! ',
                        pp: '/img/pp2.jpg',
                        rate:'70%',
                        completed:7,
                        total:10
                 }
           ];
        for(let i=0;i<devs.length;i++){
             if(devs[i].id == req.params.id){
                 devs[i] = req.body
             }
         }
         res.render('edit',{userToEdit:req.body})
        },

        



cart: (req, res) => {
    let devs = [
        {
                id:1, 
                name:'Jonas Johnson Jones', 
                price:' $25/hr',
                desc: 'Hi, my name is Jonas Johnson Jones. I was born in Iran in 1992. Since 2010 I have been developing projects and websites on various platforms. I am also an experienced programmer in Blockchain, Python and NodeJS.',
                pp: '/img/pp.jpg',
                rate:'57.1%',
                completed:4,
                total:7
        },
        {
                id:2, 
                name:'Naomi Cheng',
                price:' $35/hr',
                desc: 'Hello, I am Naomi Cheng. Born in Taiwan in 1990, I dedicated to back-end programming since 2008 and am very experienced with almost every language. Programming is my passion! ',
                pp: '/img/pp2.jpg',
                rate:'70%',
                completed:7,
                total:10
         }
        ];
    res.render('cart',{data:devs});

}
}

module.exports = controlador;
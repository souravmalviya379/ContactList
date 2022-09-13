const express = require('express');
const path = require('path');
const port = 8000;

// const db = require('./config/mongoose');
const Contact = require('./models/contact');        //this is the schema of which we will make instances

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

/*
//middleware 1      //middleware can manipulate the req.body data
app.use(function(req, res, next){
    console.log('name in middleware 1 before manipulation', req.body.name);
    req.body.name = 'Sourav';
    console.log('name in middleware 1 after manipulation', req.body.name);
    next();     //without using next no next code in this file will be executed
})
*/

var contactList = [
    {
        name: 'Anurag',
        phone: '9977998800'
    },
    {
        name: 'Arjun',
        phone: '9933203302'
    },
    {
        name: 'Unknown',
        phone: '8899334422'
    }
]

app.get('/', function (req, res) {
    /*
    return res.render('home', {
        title: 'My Contact List',
        contact_list: contactList
    });
    */
   Contact.find({}, function(err, contacts){
    if(err){
        console.log('error in fetching contacts from db');
        return;
    }

    return res.render('home', {
        title: 'My Contact List', 
        contact_list: contacts
    });

   });
});

app.post('/create-contact', (req, res) => {
    /*
    // console.log(req.body);
    //contactList.push(req.body);
    contactList.push({
        name: req.body.name,
        phone: req.body.phone
    })
    // res.redirect('/');
    res.redirect('back');       //when we don't remember from where we arrived to the 
                            //current page, so this shortcut can be used to go one step back
    */

    //using database

    Contact.create({                //this is how we create new contact and add into database
        name: req.body.name,
        phone: req.body.phone
    }, 
    function(err, newContact){          //newContact will contain the contact object we are 
                                        //adding to the database
        if(err){
            console.log('Error in creating contact');
            return;
        }else{
            console.log(newContact);
            return res.redirect('back');
        }
    })
})


app.get('/delete-contact/', function(req, res){

    /*
    // console.log(req.query);
    //get the query from url
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');

    */

    let id = req.query.id;
    console.log(id)
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting contact from database')
            return;
        }
        return res.redirect('back');
    })
});

app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server : ' + err);
    }
    console.log('Yup! My express server is running on port : ' + port);
})
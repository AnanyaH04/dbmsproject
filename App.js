const express=require("express");
const app=express();
const port=3007;
const mysql=require("./connection").con;
//configuration 
app.set("view engine","hbs");
app.set("views","./view");
app.use(express.static(__dirname+"/public"));

//app.use(express.urlencoded())
//app.use(express.json())

//routing
app.get("/",(req,res) => {
    res.render("starter") 
});
app.get("/index",(req,res) => {
    res.render("index") 
});
app.get("/home",(req,res) => {
    res.render("home") 
});
app.get("/add",(req,res) => {
    res.render("add") 
});
app.get("/search",(req,res) => {
    res.render("search") 
});
app.get("/update",(req,res) => {
    res.render("update") 
});
app.get("/delete",(req,res) => {
    res.render("delete") 
});
app.get("/view", (req, res) => {
    let qry = "select * from test ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("view", { data: results });
        }

    });

});

//TEACHER

app.get("/index2",(req,res) => {
    res.render("index2") 
});

app.get("/addteacher",(req,res) => {
    res.render("addteacher") 
});

app.get("/searchteacher",(req,res) => {
    res.render("searchteacher") 
});

app.get("/updateteacher",(req,res) => {
    res.render("updateteacher") 
});

app.get("/deleteteacher",(req,res) => {
    res.render("deleteteacher") 
});

app.get("/viewteacher", (req, res) => {
    let qry = "select * from teacher ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("viewteacher", { data: results });
        }

    });

});



//STUDENT

app.get("/index3",(req,res) => {
    res.render("index3") 
});


app.get("/addstudent",(req,res) => {
    res.render("addstudent") 
});

app.get("/deletestudent",(req,res) => {
    res.render("deletestudent") 
});

app.get("/searchstudent",(req,res) => {
    res.render("searchstudent") 
});

app.get("/updatestudent",(req,res) => {
    res.render("updatestudent") 
});

app.get("/viewstudent", (req, res) => {
    let qry = "select * from student ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("viewstudent", { data: results });
        }

    });

});

//class
app.get("/index4",(req,res)=>{
    res.render("index4");
})

app.get("/addclass",(req,res)=>{
    res.render("addclass")
})

app.get("/deleteclass",(req,res) => {
    res.render("deleteclass") 
});

app.get("/searchclass",(req,res) => {
    res.render("searchclass") 
});

app.get("/updateclass",(req,res) => {
    res.render("updateclass") 
});



app.get("/viewclass", (req, res) => {
    let qry = "select * from class";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("viewclass", { data: results });
        }
    });
});

//COURSES
 app.get("/addcourse",(req,res) =>{
    //fetching data from
    const {name,cid,desc,duration}=req.query

    let qry="select * from test where description=? or cid=?";
    mysql.query(qry,[desc,cid],(err,results)=>{
            if(err) throw err
            else{
                if(results.length >0 ){
                    res.render("add",{checkmesg:true})

                }
                else{
                    //insert query 
                    let qry2="insert into test values(?,?,?,?)";
                    mysql.query(qry2,[name,cid,desc,duration],(err,results)=>{
                        if(results.affectedRows >0)
                            res.render("add",{mesg:true})
                    })
                }
            }
    })
});


app.get("/searchcourse",(req,res)=>{
    //fetch data from form
    const {cid}=req.query;
    let qry="select * from test where cid=?";
    mysql.query(qry,[cid],(err,results)=>{
        if(err) throw err
        else{
            if(results.length>0){
                res.render("search",{msg1:true,msg2:false})
            }
            else{
                res.render("search",{msg1:false,msg2:true})
            }
        }
    });
})

app.get("/updatesearch", (req, res) => {

    const {cid} = req.query;

    let qry = "select * from test where cid=?";
    mysql.query(qry, [cid], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false,data:results })
            } else {

                res.render("update", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.get("/updatecourse",(req, res) => {

    //fetch data
    const{cid,name,duration}=req.query;
    let qry="update test set name=?,duration=? where cid=?" ;
    mysql.query(qry,[name,duration,cid],(err,results)=>{
        if(err) throw err
        else{
            if(results.affectedRows>0){
                res.render("update",{umesg:true})
            }
        }
    })
});

app.get("/removecourse", (req, res) => {

    // fetch data from the form


    const { cid } = req.query;

    let qry = "delete from test where cid=?";
    mysql.query(qry, [cid], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {

                res.render("delete", { mesg1: false, mesg2: true })

            }

        }
    });
});



//TEACHER

app.get("/addingteacher",(req,res) =>{
    //fetching data from
    const {name,phone,email,id,cid,salary,joindate}=req.query

    //Sanitization XSS...
    let qry1="select * from teacher where email=? or id=?";
    mysql.query(qry1,[email,id],(err,results)=>{
            if(err) throw err
            else{
                if(results.length >0 ){
                    res.render("addteacher",{checkmesg2:true})

                }
                else{
                    //insert query 
                    let qry2="insert into teacher values(?,?,?,?,?,?,?)";
                    mysql.query(qry2,[name,phone,email,id,cid,salary,joindate],(err,results)=>{
                        if(results.affectedRows >0)
                            res.render("addteacher",{mesgt:true})
                    })
                }
            }
    })
});

app.get("/searchingteacher",(req,res)=>{
    //fetch data from form
    const {id}=req.query;
    let qry="select * from teacher where id=?";
    mysql.query(qry,[id],(err,results)=>{
        if(err) throw err
        else{
            if(results.length>0){
                res.render("searchteacher",{msg1:true,msg2:false})
            }
            else{
                res.render("searchteacher",{msg1:false,msg2:true})
            }
        }
    });
})

app.get("/updatingsearch", (req, res) => {

    const {id} = req.query;

    let qry = "select * from teacher where id=?";
    mysql.query(qry, [id], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("updateteacher", { mesg1: true, mesg2: false,data:results })
            } else {

                res.render("updateteacher", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.get("/updatingteacher",(req, res) => {

    //fetch data
    const{name,id,email}=req.query;
    let qry="update teacher set name=?,email=? where id=?" ;
    mysql.query(qry,[name,email,id],(err,results)=>{
        if(err) throw err
        else{
            if(results.affectedRows>0){
                res.render("updateteacher",{umesg:true})
            }
        }
    })
});

app.get("/removingteacher", (req, res) => {

    // fetch data from the form


    const { id } = req.query;

    let qry = "delete from teacher where id=?";
    mysql.query(qry, [id], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("deleteteacher", { mesg1: true, mesg2: false })
            } else {

                res.render("deleteteacher", { mesg1: false, mesg2: true })

            }

        }
    });
});


app.get("/viewteacher", (req, res) => {
    let qry = "select * from teacher";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("viewteacher", { data: results });
        }

    });

});


//STUDENT

app.get("/addingstudent",(req,res) =>{
    //fetching data from
    //res.send(req.query);
    const {name,phno,email,sid,cid,date}=req.query

    //Sanitization XSS...
    let qry1="select * from student where email=? or sid=?";
    mysql.query(qry1,[email,sid],(err,results)=>{
            if(err) throw err
            else{
                if(results.length >0 ){
                    res.render("addstudent",{checkmesg2:true})

                }
                else{
                    //insert query 
                    let qry2="insert into student values(?,?,?,?,?,?)";
                    mysql.query(qry2,[name,phno,email,sid,cid,date],(err,results)=>{
                        if(results.affectedRows >0)
                            res.render("addstudent",{mesgt:true})
                    })
                }
            }
    })
});

app.get("/searchingstudent",(req,res)=>{
    //fetch data from form
    const {sid}=req.query;
    let qry="select * from student where sid=?";
    mysql.query(qry,[sid],(err,results)=>{
        if(err) throw err
        else{
            if(results.length>0){
                res.render("searchstudent",{msg1:true,msg2:false})
            }
            else{
                res.render("searchstudent",{msg1:false,msg2:true})
            }
        }
    });
})

app.get("/updatingsearchstudent", (req, res) => {

    const {sid} = req.query;

    let qry = "select * from student where sid=?";
    mysql.query(qry, [sid], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("updatestudent", { mesg1: true, mesg2: false,data:results })
            } else {

                res.render("updatestudent", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.get("/updatingstudent",(req, res) => {

    //fetch data
    const{name,sid,email}=req.query;
    let qry="update student set name=?,email=? where sid=?" ;
    mysql.query(qry,[name,email,sid],(err,results)=>{
        if(err) throw err
        else{
            if(results.affectedRows>0){
                res.render("updatestudent",{umesg:true})
            }
        }
    })
});

app.get("/removestudent", (req, res) => {

    // fetch data from the form


    const { sid } = req.query;

    let qry = "delete from student where sid=?";
    mysql.query(qry, [sid], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("deletestudent", { mesg1: true, mesg2: false })
            } else {

                res.render("deletestudent", { mesg1: false, mesg2: true })

            }

        }
    });
});
app.get("/viewstudent", (req, res) => {
    let qry = "select * from student";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("viewstudent", { data: results });
        }

    });

});

//CLASS



app.get("/addingclass",(req,res) =>{
    //fetching data from
    const {roomno,id,cid}=req.query

    //Sanitization XSS...
    let qry1="select * from class where roomno=?";
    mysql.query(qry1,[roomno],(err,results)=>{
            if(err) throw err
            else{
                if(results.length >0 ){
                    res.render("addclass",{checkmesgc:true})

                }
                else{
                    //insert query 
                    let qry2=`CALL insertclass(?,?,?)`;
                    mysql.query(qry2,[roomno,id,cid],(err,results)=>{
                        if(results.affectedRows >0)
                            res.render("addclass",{mesgc:true})
                    })
                }
            }
    })
});


app.get("/searchingclass",(req,res)=>{
    //fetch data from form
    const {roomno}=req.query;
    let qry="select * from class where roomno=?";
    mysql.query(qry,[roomno],(err,results)=>{
        if(err) throw err
        else{
            if(results.length>0){
                res.render("searchclass",{msg1:true,mesg2:false})
            }
            else{
                res.render("searchclass",{msg1:false,mesg2:true})
            }
        }
    });
})

app.get("/updatingsearchclass", (req, res) => {

    const {roomno} = req.query;

    let qry = "select * from class where roomno=?";
    mysql.query(qry, [roomno], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("updateclass", { mesg1: true, mesg2: false,data:results })
            } else {

                res.render("updateclass", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.get("/updatingclass",(req, res) => {

    //fetch data
    const{roomno,id,cid}=req.query;
    let qry="update class set id=?,cid=? where roomno=?" ;
    mysql.query(qry,[roomno,id,cid],(err,results)=>{
        if(err) throw err
        else{
            if(results.affectedRows>0){
                res.render("updateclass",{umesg:true})
            }
        }
    })
});

app.get("/removeclass", (req, res) => {

    // fetch data from the form


    const { roomno } = req.query;

    let qry = "delete from class where roomno=?";
    mysql.query(qry, [roomno], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("deleteclass", { mesg1: true, mesg2: false })
            } else {

                res.render("deleteclass", { mesg1: false, mesg2: true })

            }

        }
    });
});



//create server
app.listen(port,(err)=>{
    if(err)
        throw err
    else 
        console.log("Server is running at port %d:",port);
});
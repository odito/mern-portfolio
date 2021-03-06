import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';




const AboutAdmin = () => {


const [about, setAbout] = useState('');
const [aboutData, setAboutData] = useState([]);
const [message, setMessage] = useState('');
const [messageCond,setMessageCond] = useState(false);



useEffect(()=>{

// fetching data
const fetchData= async()=>{

    try {
    
 const res = await axios.get(`/about`);
//  console.log(res.data);
setAboutData(res.data);
        
  } catch (err) {
            
 }

}

fetchData();

},[])





// onchange
const onchangeAbout = (e)=>{
 setAbout(e.target.value);
 console.log(about);
}


// submit about
const handleSubmit = (e)=>{
e.preventDefault();

const postAbout = {
    about
}


setAbout('');
axios.post(`/about`, postAbout)
.then(res=>{

})
.catch(err=>console.log(err))



}


// delete about
const deleteAbout=(id)=>{

axios.delete(`/about/${id}`)
.then(res=>{
    setMessageCond(true);
    setMessage(`${res.data.msg}`);
 
   const timeout= setTimeout(()=>{
       setMessage('');
        setMessageCond(false);

    },2000)

    return ()=>clearTimeout(timeout);


}).catch(err=>console.log(err))



// delete fro ui
const aboutFilterDel = aboutData.filter(item=>item._id !==id)

setAboutData(aboutFilterDel);


}















    return (
        <div className='same-component'>
           <div className="same-form">
               <form onSubmit={handleSubmit}>
                   <h4>About component</h4>
                   <label htmlFor="text">About</label>
                   <textarea
                   value={about}
                   onChange={onchangeAbout}
                    name="textarea" 
                    cols="30"
                     rows="3"
                      />
                   <button type="submit">Add item</button>

               </form>
           </div>

      <div className="same-item">


       
            {aboutData.map((item)=>(
                <div className="about-info" key={item._id}>
                    <div className="icons">
                        <Link to={`/edit/${item._id}`}><i className="fas fa-edit"></i></Link>
                        <i className="fas fa-trash"
                        onClick={()=>deleteAbout(item._id)}
                        
                        ></i>
                    </div>
      
            <p>{item.about}</p>
                </div>
            ))}

            <h3 className={messageCond?"new-delete item-delete-tab":"item-delete-tab"}>{message}</h3>
      </div>


          
 



        </div>
    )
}

export default AboutAdmin

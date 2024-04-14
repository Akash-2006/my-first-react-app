import { useEffect } from 'react';
import one from './chat (1).png';
import supabase from './component/supabase';
import './style.css'
import { useState } from 'react';
import two from'./likeu.png'
import three from'./explosion.png'
import four from './block.png'
function App(){
    const catagories=[{"name":"Techonology","color":"blue"},
    {"name":"science","color":"green"},
    {"name":"Finance","color":"red"},
    {"name":"Society","color":"darkmagenta"},
    {"name":"Entertiament","color":"orangered"},
    {"name":"News","color":"yellow"},
]

const [pending,Ispending]=useState(false)
const [facts,setFacts]=useState([])
const [mind,setmind]=useState(0)
const [like,setlike]=useState(0)
const [False,setfalse]=useState(0)

const [catagoreytype,setcatagoreytype]=useState("all")
    useEffect(function(){
        Ispending(true)
        async function getfacts(){
            let { data: facts, error } = await supabase
  .from('facts')
  .select('*')
  .order('name',{ascending:true})
  if (error) {
    alert("error", error);
  }
  else{
    setFacts(facts);
  
 
if(catagoreytype!=="all"){

    const filteredfacts=facts.filter((fact)=>fact.catagorey===catagoreytype)
    console.log(facts.catagorey)
    setFacts(filteredfacts)
}

Ispending(false)
}
        } getfacts()
    },[catagoreytype])
    return(
        <div>
            <div className='container'>

            <div className='logodiv'>
<img src={one} width={"70px"} className='logo'/>
</div>
<h1 className='title'>Today i had learned</h1>
<Form catagories={catagories} setFacts={setFacts} facts={facts}/>
</div>

<div className='forfacts'>
<div className='catageorieslist'>
    <button className='button adjust' onClick={()=>setcatagoreytype("all")}>All</button>
    {catagories.map((cat) =>
    <button className='list adjust' style={{ backgroundColor: `${cat.color}`}} id='cat' onClick={()=>setcatagoreytype(cat.name)}>{cat.name}</button>
)}

</div>
<div className='facts'>
{pending && <p>Loading...</p>} 
    <ul>
    {facts.map((facts)=>
      
<Printfact facts={facts} setFacts={setFacts} setmind={setmind} setfalse={setfalse} setlike={setlike} like={like} False={False} mind={mind}/>
)}
</ul>
</div>
</div>
</div>
    )
}
function Printfact({ facts,setFacts, setmind, setfalse, setlike, like, False, mind }) {
    const catagories = [
        {"name":"Techonology","color":"blue"},
        {"name":"science","color":"green"},
        {"name":"Finance","color":"red"},
        {"name":"Society","color":"darkmagenta"},
        {"name":"Entertiament","color":"orangered"},
        {"name":"News","color":"yellow"}
    ];
    const catagoricolor = catagories.find((c) => c.name === facts.catagorey).color;
   

    
    async function handleLike() {
        
        const { data:updatedfact, error } = await supabase
        .from('facts')
        .update({ like: facts.like+1 })
        .eq('id', facts.id)
        
        .select()
      
        setFacts((facts)=>facts.map((f)=>
    (f.id===updatedfact[0].id ? updatedfact[0]:f)))
    
    }
    async function handleflasevotes() {
        
        const { data:updatedfact, error } = await supabase
        .from('facts')
        .update({ falsevotes: facts.falsevotes+1 })
        .eq('id', facts.id)
       
        .select()
      
        setFacts((facts)=>facts.map((f)=>
    (f.id===updatedfact[0].id ? updatedfact[0]:f)))
    
    }
    async function handlemindblowing() {
        
        const { data:updatedfact, error } = await supabase
        .from('facts')
        .update({ mindblowing: facts.mindblowing+1 })
        .eq('id', facts.id)
        
        .select()
      
        setFacts((facts)=>facts.map((f)=>
    (f.id===updatedfact[0].id ? updatedfact[0]:f)))
    
    }

    return (
        <li className='lists' key={facts.name}>
            <p className='para'>{facts.name} {<a href={facts.source} style={{marginLeft:"15px"}}>source</a>}</p>
            <div className='link' style={{backgroundColor:catagoricolor}}>
                {facts.catagorey}
            </div>
            <button className='img' onClick={()=>handleLike(facts.id)}>
                <img src={two} width={"20px"} height={"20px"}/><span>{facts.like}</span>
            </button>
            <button className='img' onClick={()=>handlemindblowing(facts.id)}>
                <img src={three} width={"20px"} height={"20px"}/><span>{facts.mindblowing}</span>
            </button>
            <button className='img imglast' onClick={()=>handleflasevotes(facts.id)}>
                <img src={four} width={"20px"} height={"20px"}/><span>{facts.falsevotes}</span>
            </button>
        </li>
    );
}

function Form({catagories,setFacts,facts}){
    const [showform,setshowform]=useState(false)
    const [name,setname]=useState("")
    const [source,setsource]=useState("")
    const [catagory,setcatagory]=useState("")
    async function submithandle(e){
        e.preventDefault()
        const checkurl=isValidHttpUrl(source)
        if (name.length === 0 || checkurl === false || catagory.length === 0) {
            alert("vaild details")
        } else {
            const { data:insetfact, error } = await supabase
  .from('facts')
  .insert([
    { name: name, source: source,catagorey:catagory },
  ])
  .select()
  if(error){
    console.log(catagory)
    console.log(error)
  }
setFacts((facts)=>[insetfact,...facts])
  setname("")
  setsource("")
  setcatagory("")
  setshowform(false)
     }
        
    }
    function isValidHttpUrl(string) {
        let url;
        
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
      
        return url.protocol === "http:" || url.protocol === "https:";
      }
    function show(){
     
        return(
            <>
                
                <button className='share button' onClick={()=>setshowform(!showform)}>close fact</button>
            
                <form onSubmit={submithandle}>
                <h1 className='h1'>share your fact</h1>
                    <input placeholder='name' className='name'onChange={(e)=>setname(e.target.value)}/>
                    <input placeholder='source'onChange={(e)=>setsource(e.target.value)}/>
                    <select onChange={(e)=>setcatagory(e.target.value)}>
                        {catagories.map((cat)=><option value={cat.name}>{cat.name}</option>)}
                    </select>
                    <button className='button post'>post</button>
                </form>
            </>
    )
    }
    function noshow(){
  
        return(
<button className='share button' onClick={()=>setshowform(!showform)}>Share fact</button>
    )
    }

    return(
     <div className='formcont'>
       {showform?show():noshow()}
       </div>
    )
}
export default App;
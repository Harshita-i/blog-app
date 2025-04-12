import { useState,useEffect } from "react"
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import { useAuth } from "@clerk/clerk-react"

function Articles() {

  const [articles,setArticles]= useState([])
  const [error,setError]=useState('')
  const navigate=useNavigate()
  const [category,setCategory]=useState('all')
   const {getToken} =useAuth()
  //const location=useLocation()
  
  //get all articles
  async function getArticles(selectedCategory='all'){
    //get jwt token
    const token=await getToken()
    const url=selectedCategory==='all'
    ? 'http://localhost:3000/author-api/articles'
    : `http://localhost:3000/author-api/articles?category=${encodeURIComponent(selectedCategory)}`
    try{
      const res=await axios.get(url,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(res.data.message==='articles'){
        setArticles(res.data.payload)
        setError('')
      }else{
        setError(res.data.message)
      }
    }catch(err){
      setError('Failed to load articles')
    }
 }
//handle category change
function handleCategoryChange(e){
 // const selectedCategory = e.target.value.trim();
   // console.log("Selected Category:", selectedCategory);
  setCategory(e.target.value)
  getArticles(e.target.value)
}

//go to specific article
function gotoArticleById(articleObj){
     navigate(`../${articleObj.articleId}`,{state:articleObj})
}

// function gotoArticleById(articleObj){
//   const isAuthorProfile = location.pathname.includes("author-profile");
//     const basePath = isAuthorProfile ? "author-profile" : "user-profile";
//     navigate(`/${basePath}/${articleObj.authorData.email}/${articleObj.articleId}`, {
//       state: articleObj,
//     });
// }

  useEffect(()=>{
   getArticles()
  },[])
 // console.log(articles)
  //console.log(articles)
  return (
    <div className="container">
      {/* category filter dropdown */}
      <div className="mb-4">
       <label htmlFor="categoryFilter" className="form-label">Filter by Category:</label>
       <select className="form-select" id="categoryFilter" value={category} onChange={handleCategoryChange}>
        <option value="all">All</option>
        <option value="programming">Programming</option>
        <option value="AI&ML">AI&ML</option>
        <option value="database">Database</option>
       </select>
      </div>
      <div>
        {error.length!==0 && <p className="display-4 text-center mt-5 text-danger">{error}</p>}
      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mb-3">
        {
          articles.map((articleObj)=><div className="col" key={articleObj.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <div className="author-datails text-end">
                  <img src={articleObj.authorData.profileImageUrl} width="40px" className="rounded-circle" alt="" />
                  <p>
                    <small className="text-secondary">
                      {articleObj.authorData.nameOfAuthor}
                    </small>
                  </p>
                </div>
                <h5 className="card-title">{articleObj.title}</h5>
                <p className="card-text">
                  {articleObj.content.substring(0,80)+"...."}
                </p>
                <button className="custom-btn btn-4" onClick={()=>gotoArticleById(articleObj)}>
                  Read more
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  last updated on {articleObj.dateOfModification}
                </small>
              </div>
            </div>
          </div>)
        }
      </div>
      </div>
    </div>
  )
}

export default Articles
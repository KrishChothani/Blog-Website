import React,{useState, useEffect} from 'react'
import { Container, PostCard } from '../Components'
import  appwriteService from '../Appwrite/configue'


function AllPost() {
    const [posts , setPost] =useState([])
    useEffect(()=>{

    })
    appwriteService.getPosts([]).then((posts) =>{
        if(posts){
             setPost(posts.documents);
        }
    })
  return (
    <div className='w-full py-8'>
        <Container >
           <div className='flex flex-wrap'>
                {posts.map(post =>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post={post} />
                    </div>
                ))}
           </div>
        </Container>
      
    </div>
  )
}

export default AllPost

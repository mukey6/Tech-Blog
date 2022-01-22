async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      
    const deletedPost = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      });
  if(deletedPost.ok){
    document.location.replace('/dashboard/')
  }else {
    alert(response.statusText);
  }
  }
  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
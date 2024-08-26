import useValue from '../hooks/customeHooks'

const BlogForm = ({ createNew }) => {

  const { reset : titleReset,...title } = useValue('text')
  const { reset : authorReset,...author } = useValue('text')
  const { reset : urlReset,...url } = useValue('text')

  const handleCreateNew = (event) => {
    event.preventDefault()
    const newObject = {
      title : title.value,
      author : author.value,
      url : url.value
    }
    createNew(newObject)
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <form onSubmit={handleCreateNew}>
        <div>
            title :
          <input id='title' placeholder='Title' value={title} {...title}/>
        </div>
        <div>
            author :
          <input id='author' placeholder='Author' value={author} {...author}/>
        </div>
        <div>
            url :
          <input id='url' placeholder='Url' value={url} {...url}/>
        </div>
        <button id='create-button' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
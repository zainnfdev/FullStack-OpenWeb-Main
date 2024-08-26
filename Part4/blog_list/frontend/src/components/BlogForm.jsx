/* eslint-disable react/prop-types */

const BlogForm = ({ blogListItem,setBlogListItem,handelSubmit }) => {

    return (
        <div className="mt-5 pl-5 max-w-fit h-auto">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Adding new blog list </h3>
                <form onSubmit={handelSubmit}>
                    <div className="border-b border-black-900/10 pb-6">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900"> Title </label>
                                    <div className="mt-2">
                                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="title" value={blogListItem.title} onChange={(event) => {setBlogListItem({...blogListItem, title : event.target.value})}} />
                                    </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900"> Author </label>
                                    <div className="mt-2">
                                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="author" value={blogListItem.author} onChange={(event) => {setBlogListItem({...blogListItem, author : event.target.value})}}/>
                                    </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label  className="block text-sm font-medium leading-6 text-gray-900"> URL </label>
                                    <div className="mt-2">
                                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="url" value={blogListItem.url} onChange={(event) => {setBlogListItem({...blogListItem, url : event.target.value})}} />
                                    </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900"> Likes </label>
                                    <div className="mt-2">
                                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="likes" value={blogListItem.likes} onChange={(event) => {setBlogListItem({...blogListItem, likes : event.target.value})}} />
                                    </div>
                            </div>
                        </div>
                        <div>
                        <button type="submit" className="mt-3 rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>
                    </div>
                    
                </form>
        </div>
    )
}

export default BlogForm
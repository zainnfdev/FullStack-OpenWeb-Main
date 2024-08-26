/* eslint-disable react/prop-types */
const BlogDisplay = ({ list,deleteRecord,updateRecord }) => {
    return (
        <>
        <div className="pl-5 max-w-max h-auto">
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Saved blog list</h3>
            </div>
            {list.map((record) => 
            <div key={record.id} className="mt-2 border-t border-black-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.title}</dd>
                        <dt className="text-sm font-medium leading-6 text-gray-900">Author</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.author}</dd>
                        <dt className="text-sm font-medium leading-6 text-gray-900">URL</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.url}</dd>
                        <dt className="text-sm font-medium leading-6 text-gray-900">Likes</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.likes}</dd>
                    </div>
                    <button onClick={() => updateRecord(record) } className="mt-3 rounded-md bg-gray-800 mr-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
                    <button onClick={() => deleteRecord(record) } className="mt-3 rounded-md bg-gray-800 ml-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Delete</button>
                </dl>
            </div>)
            }
        </div>
        </>
    )
}

export default BlogDisplay
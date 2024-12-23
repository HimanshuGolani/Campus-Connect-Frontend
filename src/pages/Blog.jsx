import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { motion } from 'framer-motion';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    companyTags: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState('title');
  const [companyTags, setCompanyTags] = useState([]);

  const { userId, universityId, userType, userName } = useContext(ApplicationContext);

  // Fetch company tags from backend
  const getCompanyTags = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/post/getAllCompanyTags');
      const sortedTags = response.data.sort((a, b) => a.localeCompare(b));
      setCompanyTags(sortedTags || []);
    } catch (error) {
      console.error('Error fetching company tags:', error);
    }
  };

  // Fetch posts from backend with pagination
  const fetchPosts = async () => {
    try {
      let ID_TO_SEND = userType === 'university' ? userId : universityId;
      const response = await axios.get(
        `http://localhost:8080/api/v1/post/getAllUniversityPosts/${ID_TO_SEND}/${currentPage}/${postsPerPage}`
      );

      const fetchedBlogs = response.data || [];
      setBlogs(fetchedBlogs);
      setFilteredBlogs(fetchedBlogs);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    getCompanyTags();    
  }, [currentPage]);

  // Handle adding new blog
  const handleAddBlog = async () => {
    if (newBlog.title && newBlog.content && newBlog.companyTags.length > 0) {
      setLoading(true);
      const companySpecificName_TAG = newBlog.companyTags.length === 1 ? newBlog.companyTags[0] : '';
      const companySpecificName_TAGS_List = newBlog.companyTags;

      const CREATE_POST_URL = "http://localhost:8080/api/v1/university/createPost"

      if(userType === 'user'){
        try {
          await axios.post(`http://localhost:8080/api/v1/post/create/${userId}`, {
            title: newBlog.title,
            userName,
            content: newBlog.content,
            companySpecificName_TAG,
            companySpecificName_TAGS_List,
          });
          setNewBlog({ title: '', content: '', companyTags: [] });
          setIsModalOpen(false);
          fetchPosts();
        } catch (error) {
          console.error('Error posting blog:', error);
        } finally {
          setLoading(false);
        }
      }
      else {
        try {
          console.log(universityId);
          
          await axios.post(`${CREATE_POST_URL}/${userId}`, {
            title: newBlog.title,
            content: newBlog.content,
            companySpecificName_TAG,
            companySpecificName_TAGS_List,
          });
          setNewBlog({ title: '', content: '', companyTags: [] });
          setIsModalOpen(false);
          fetchPosts();
        } catch (error) {
          console.error('Error posting blog:', error);
        } finally {
          setLoading(false);
        }
      }
      
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = blogs.filter((blog) => {
      const fieldValue = Array.isArray(blog[searchField])
        ? blog[searchField].join(', ').toLowerCase()
        : blog[searchField]?.toLowerCase() || '';
      return fieldValue.includes(searchQuery.toLowerCase());
    });
    setFilteredBlogs(filtered);
  }, [searchQuery, searchField, blogs]);

  const handleTagSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewBlog({ ...newBlog, companyTags: selectedOptions });
  };

  const handleTagRemove = (tag) => {
    setNewBlog((prev) => ({
      ...prev,
      companyTags: prev.companyTags.filter((selectedTag) => selectedTag !== tag),
    }));
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage) + 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
      {/* Floating + Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-110"
      >
        +
      </button>

      {/* Modal for Creating a Blog Post */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-semibold text-blue-600 mb-4">Create Blog</h3>

            <div className="mb-4">
              <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                placeholder="Enter blog title"
                className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block text-lg font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                placeholder="Enter blog content"
                className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows="5"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="companyTags" className="block text-lg font-medium text-gray-700">
                Select Related Companies
              </label>
              <select
                id="companyTags"
                name="companyTags"
                multiple
                value={newBlog.companyTags}
                onChange={handleTagSelection}
                className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {companyTags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700">Selected Companies:</p>
                <ul className="list-disc ml-6">
                  {newBlog.companyTags.map((tag, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center justify-between">
                      {tag}
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="ml-2 text-red-600"
                      >
                        &#10005;
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBlog}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Blog Search and Filter Options */}
      <div className="max-w-lg w-full mb-8 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search blogs"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div className="flex gap-4">
          <label htmlFor="searchField" className="text-lg text-gray-700">
            Filter by:
          </label>
          <select
            id="searchField"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="content">Content</option>
            <option value="companyTags">Company Tags</option>
          </select>
        </div>
      </div>

      {/* Blog List with Animation */}
      <div className="w-full max-w-lg">
        {filteredBlogs.length === 0 ? (
          <p className="text-xl text-gray-500">No blogs found</p>
        ) : (
          filteredBlogs.map((blog, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 mb-4 shadow-lg rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-blue-500">{blog.title}</h3>
              <p className="text-sm text-gray-500">
                {blog.userName} - {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">{blog.content}</p>
              <p className="text-sm text-gray-600 mt-2">Tags: {blog.companySpecificName_TAGS_List?.join(', ') || 'N/A'}</p>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-4">
        {/* Previous Page Button */}
        <button
          onClick={() => {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
            fetchPosts(); // Fetch posts when page changes
          }}
          className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-600' : 'bg-white text-blue-600'} hover:bg-blue-200`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => {
              setCurrentPage(index + 1);
              fetchPosts(); // Fetch posts when page changes
            }}
            className={`px-4 py-2 border rounded-lg ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} hover:bg-blue-200`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Page Button */}
        <button
          onClick={() => {
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            fetchPosts();
          }}
          className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-600' : 'bg-white text-blue-600'} hover:bg-blue-200`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blog;

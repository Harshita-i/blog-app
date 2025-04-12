import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [articles, setArticles] = useState([]);
    const [users, setUsers] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedUsersAuthors, setSelectedUsersAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            const articlesRes = await axios.get('http://localhost:3000/admin-api/articles');
            setArticles(articlesRes.data.payload);
            const usersAuthorsRes = await axios.get('http://localhost:3000/admin-api/users-authors');
            const users = usersAuthorsRes.data.payload.filter(ua => ua.role === 'user');
            const authors = usersAuthorsRes.data.payload.filter(ua => ua.role === 'author');
            setUsers(users);
            setAuthors(authors);
        };
        fetchAdminData();
    }, []);

    const handleUserAuthorSelection = (email) => {
        if (selectedUsersAuthors.includes(email)) {
            setSelectedUsersAuthors(selectedUsersAuthors.filter((e) => e !== email));
        } else {
            setSelectedUsersAuthors([...selectedUsersAuthors, email]);
        }
    };

    const toggleSelectedUsersAuthors = async (isActive) => {
        await axios.put('http://localhost:3000/admin-api/users-authors/toggle', { emails: selectedUsersAuthors, isActive });
        // Refresh users/authors
        const usersAuthorsRes = await axios.get('http://localhost:3000/admin-api/users-authors');
        const users = usersAuthorsRes.data.payload.filter(ua => ua.role === 'user');
        const authors = usersAuthorsRes.data.payload.filter(ua => ua.role === 'author');
        setUsers(users);
        setAuthors(authors);
        setSelectedUsersAuthors([]); // Clear selections
    };

    const gotoArticleById = (articleObj) => {
        navigate(`/author-profile/articles/${articleObj.articleId}`, { state: articleObj });
    };

    return (
        <div className="container">
            <h2 className='text-center mb-3'>List of Articles</h2>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3'>
                {articles.map((articleObj) => (
                    <div className='col mb-3' key={articleObj._id}>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <div className='author-details text-end'>
                                    <img src={articleObj.authorData.profileImageUrl} width='40px' className='rounded-circle' alt="" />
                                    <p><small className='text-secondary'>{articleObj.authorData.nameOfAuthor}</small></p>
                                </div>
                                <h5 className='card-title'>{articleObj.title}</h5>
                                <p className='card-text'>{articleObj.content.substring(0, 80) + "...."}</p>
                                <button className='custom-btn btn-4' onClick={() => gotoArticleById(articleObj)}>Read More</button>
                            </div>
                            <div className='card-footer'>
                                <small className='text-body-secondary'>Last updated on {articleObj.dateOfModification}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <h2 className='mt-4 text-center'>List of users and authors</h2>
            <h3 className='mt-4 text-secondary'>Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <input
                            type="checkbox"
                            checked={selectedUsersAuthors.includes(user.email)}
                            onChange={() => handleUserAuthorSelection(user.email)}
                        />
                        {user.firstName} {user.lastName} ({user.email}) - {user.isActive ? 'Active' : 'Blocked'}
                    </li>
                ))}
            </ul>

            <h3 className='text-secondary'>Authors</h3>
            <ul>
                {authors.map((author) => (
                    <li key={author._id}>
                        <input
                            type="checkbox"
                            checked={selectedUsersAuthors.includes(author.email)}
                            onChange={() => handleUserAuthorSelection(author.email)}
                        />
                        {author.firstName} {author.lastName} ({author.email}) - {author.isActive ? 'Active' : 'Blocked'}
                    </li>
                ))}
            </ul>
            {selectedUsersAuthors.length > 0 && (
                <div className='mb-4 ms-3'>
                    <button  className='btn btn-danger ms-2' onClick={() => toggleSelectedUsersAuthors(false)}>Block</button>
                    <button className='btn btn-success ms-3' onClick={() => toggleSelectedUsersAuthors(true)}>Unblock</button>
                </div>
            )} */}
            <h2 className="mt-4 text-center">List of Users and Authors</h2>

<h3 className="mt-4 text-secondary">Users</h3>
<div className="list-group mb-4">
  {users.map((user) => (
    <div key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          checked={selectedUsersAuthors.includes(user.email)}
          onChange={() => handleUserAuthorSelection(user.email)}
          className="me-2"
        />
        <span className="fw-bold">{user.firstName} {user.lastName}</span> ({user.email}) - 
        <span className={`ms-2 ${user.isActive ? "text-success" : "text-danger"}`}>
          {user.isActive ? "Active" : "Blocked"}
        </span>
      </div>
    </div>
  ))}
</div>

<h3 className="text-secondary">Authors</h3>
<div className="list-group mb-4">
  {authors.map((author) => (
    <div key={author._id} className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          checked={selectedUsersAuthors.includes(author.email)}
          onChange={() => handleUserAuthorSelection(author.email)}
          className="me-2"
        />
        <span className="fw-bold">{author.firstName} {author.lastName}</span> ({author.email}) - 
        <span className={`ms-2 ${author.isActive ? "text-success" : "text-danger"}`}>
          {author.isActive ? "Active" : "Blocked"}
        </span>
      </div>
    </div>
  ))}
</div>

{/* Buttons for Block/Unblock Actions */}
{selectedUsersAuthors.length > 0 && (
  <div className="mt-3 text-center">
    <button className="btn btn-danger mx-2" onClick={() => toggleSelectedUsersAuthors(false)}>Block</button>
    <button className="btn btn-success mx-2" onClick={() => toggleSelectedUsersAuthors(true)}>Unblock</button>
  </div>
)}

        </div>
    );
}

export default AdminDashboard;
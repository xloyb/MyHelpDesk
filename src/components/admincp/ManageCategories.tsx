// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTrash } from 'react-icons/fa';

// type Category = {
//   id: number;
//   name: string;
// };

// const ManageCategories: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [newCategoryName, setNewCategoryName] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get<Category[]>('/api/categories');
//         setCategories(response.data);
//       } catch (error) {
//         setError('Failed to fetch categories');
//         console.error('Failed to fetch categories:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCreateCategory = async () => {
//     if (!newCategoryName.trim()) {
//       return setError('Category name is required');
//     }

//     try {
//       const response = await axios.post('/api/categories', { name: newCategoryName });
//       setCategories([...categories, response.data]);
//       setNewCategoryName('');
//     } catch (error) {
//       setError('Failed to create category');
//       console.error('Failed to create category:', error);
//     }
//   };

//   const handleDeleteCategory = async (id: number) => {
//     try {
//       // Check if the category has any associated services
//       const { data: serviceCount } = await axios.get<{ count: number }>(`/api/services/count?categoryId=${id}`);
//       if (serviceCount.count > 0) {
//         setError('Category cannot be deleted because it has associated services');
//         return;
//       }

//       await axios.delete('/api/categories', { data: { id } });
//       setCategories(categories.filter(category => category.id !== id));
//     } catch (error) {
//       setError('Failed to delete category');
//       console.error('Failed to delete category:', error);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewCategoryName(e.target.value);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (categories.length === 0) return <div>No categories available</div>;

//   return (
//     <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
//       <div className="text-xl font-semibold inline-block">Manage Categories</div>
//       <div className="divider mt-2"></div>

//       <div className="mb-4">
//         <input
//           type="text"
//           value={newCategoryName}
//           onChange={handleChange}
//           placeholder="New category name"
//           className="input input-bordered w-full mb-2"
//         />
//         <button onClick={handleCreateCategory} className="btn btn-primary">Add Category</button>
//       </div>

//       <div>
//         {categories.map(category => (
//           <div
//             key={category.id}
//             className="mb-4 p-4 grid grid-cols-1 gap-4 mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100"
//           >
//             <div className="text-lg font-medium">{category.name}</div>
//             <div className="flex items-center justify-end md:justify-start">
//               <button onClick={() => handleDeleteCategory(category.id)} className="btn btn-error">
//                 <FaTrash className="mr-2" /> Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageCategories;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

type Category = {
  id: number;
  name: string;
};

const ManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('/api/categories');
        setCategories(response.data);
      } catch (error) {
        setError('Failed to fetch categories');
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      const response = await axios.post('/api/categories', { name: newCategoryName });
      setCategories(prevCategories => [...prevCategories, response.data]);
      setNewCategoryName('');
      setError(null); // Clear any existing errors
    } catch (error) {
      setError('Failed to create category');
      console.error('Failed to create category:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      // Check if the category has any associated services
      const { data: serviceCount } = await axios.get<{ count: number }>(`/api/services?categoryId=${id}`);
      if (serviceCount.count > 0) {
        setError('Category cannot be deleted because it has associated services');
        return;
      }
  
      // Perform the deletion
      await axios.delete('/api/categories', { data: { id } });
      setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
      setError(null); // Clear any existing errors
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError('Failed to delete category: ' + error.message);
      } else if (error instanceof Error) {
        setError('Failed to delete category: ' + error.message);
      } else {
        setError('Failed to delete category');
      }
      console.error('Failed to delete category:', error);
    }
  };
  

  const handleUpdateCategory = async () => {
    if (editCategoryId === null || !editCategoryName.trim()) {
      setError('Category ID and name are required');
      return;
    }

    try {
      const response = await axios.put('/api/categories', { id: editCategoryId, name: editCategoryName });
      setCategories(prevCategories => 
        prevCategories.map(category => 
          category.id === editCategoryId ? response.data : category
        )
      );
      setEditCategoryId(null);
      setEditCategoryName('');
      setError(null); // Clear any existing errors
    } catch (error) {
      setError('Failed to update category');
      console.error('Failed to update category:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCategoryName(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (categories.length === 0) return <div>No categories available</div>;

  return (
    <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="text-xl font-semibold inline-block">Manage Categories</div>
      <div className="divider mt-2"></div>

      <div className="mb-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={handleChange}
          placeholder="New category name"
          className="input input-bordered w-full mb-2"
        />
        <button onClick={handleCreateCategory} className="btn btn-primary">Add Category</button>
      </div>

      {editCategoryId !== null && (
        <div className="mb-4">
          <input
            type="text"
            value={editCategoryName}
            onChange={handleEditChange}
            placeholder="Edit category name"
            className="input input-bordered w-full mb-2"
          />
          <button onClick={handleUpdateCategory} className="btn btn-primary">Update Category</button>
        </div>
      )}

      <div>
        {categories.map(category => (
          <div
            key={category.id}
            className="mb-4 p-4 grid grid-cols-1 gap-4 mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100"
          >
            <div className="text-lg font-medium">{category.name}</div>
            <div className="flex items-center justify-end md:justify-start">
              <button onClick={() => {
                setEditCategoryId(category.id);
                setEditCategoryName(category.name);
              }} className="btn btn-warning mr-2">
                <FaEdit className="mr-2" /> Edit
              </button>
              <button onClick={() => handleDeleteCategory(category.id)} className="btn btn-error">
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;

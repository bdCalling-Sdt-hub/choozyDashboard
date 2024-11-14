import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Buttons from '../component/share/Buttons';
import Tags from '../component/share/Tags';
import { useAllCategoriesQuery } from '../redux/features/getAllCategoriesApi';
import { useDeleteCategoryMutation } from '../redux/features/deleteCategoryApi';

interface Props {}

const CategoryManagement: React.FC<Props> = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const { data, isLoading, isError } = useAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    if (data?.data?.data) {
      const fetchTags = data.data.data.map((category: any) => category.category_name);
      setTags(fetchTags);
    }
  }, [data]);

  // Handle tag close (removal)
  const handleClose = async (removedTag: string) => {
    const categoryToDelete = data?.data?.data.find(
      (category: any) => category.category_name === removedTag
    );
    const tagId = categoryToDelete?.id; // Get the category ID based on the name
console.log("tagId", tagId)
    if (tagId) {
      try {
        await deleteCategory(tagId); // Pass the ID to the mutation
        console.log(`Category deleted: ${removedTag} with ID: ${tagId}`);

        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags); // Update the state after deletion
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    } else {
      console.warn("No ID found for category:", removedTag);
    }
  };

  // Handle adding new category (tag)
  const handleAddNewCategory = (newCategory: string) => {
    if (newCategory && !tags.includes(newCategory.trim())) {
      setTags([...tags, newCategory.trim()]); // Add the new tag if it's not already in the list
    }
  };

  // Toggle the visibility of the input field in Tags component
  const triggerTagInput = () => {
    setInputVisible(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Available Categories</h1>
        <Buttons
          onClick={triggerTagInput}
          className="flex items-center bg-[#5E7FD3] hover:bg-[#5E7FD3] text-white px-4 py-2 rounded-2xl"
        >
          <Plus className="mr-2" /> Add New Category
        </Buttons>
      </div>
      <div className="w-1/3">
        <Tags
          tags={tags}
          handleAddNewCategory={handleAddNewCategory}
          handleClose={handleClose}
          inputVisible={inputVisible}
          setInputVisible={setInputVisible}
        />
      </div>
    </div>
  );
};

export default CategoryManagement;

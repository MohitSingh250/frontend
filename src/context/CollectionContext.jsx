import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingList, setEditingList] = useState(null);

  const fetchCollections = async () => {
    if (!user) return;
    try {
      const res = await api.get("/collections");
      setCollections(res.data);
    } catch (err) {
      console.error("Error fetching collections:", err);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [user]);

  const createCollection = async (data) => {
    try {
      if (editingList) {
        await api.put(`/collections/${editingList._id}`, data);
        toast.success("List updated");
      } else {
        await api.post("/collections", data);
        toast.success("List created");
      }
      fetchCollections();
      setIsCreateModalOpen(false);
      setEditingList(null);
    } catch (err) {
      toast.error("Operation failed");
      throw err;
    }
  };

  const deleteCollection = async (id) => {
    try {
      await api.delete(`/collections/${id}`);
      toast.success("List deleted");
      fetchCollections();
    } catch (err) {
      toast.error("Failed to delete list");
    }
  };

  const openCreateModal = (list = null) => {
    setEditingList(list);
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setEditingList(null);
  };

  return (
    <CollectionContext.Provider value={{
      collections,
      loading,
      fetchCollections,
      createCollection,
      deleteCollection,
      isCreateModalOpen,
      openCreateModal,
      closeCreateModal,
      editingList
    }}>
      {children}
    </CollectionContext.Provider>
  );
};

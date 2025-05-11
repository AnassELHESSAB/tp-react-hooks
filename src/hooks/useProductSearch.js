import { useState, useEffect } from 'react';

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Réinitialise la pagination quand la recherche change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}&limit=10&skip=${(currentPage - 1) * 10}`,
          { signal: abortController.signal }
        );
        
        if (!response.ok) throw new Error('Erreur de chargement');
        
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 10));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm || currentPage > 1) {
      fetchProducts();
    }

    return () => abortController.abort();
  }, [searchTerm, currentPage, reloadTrigger]);

  const reload = () => setReloadTrigger(prev => prev + 1);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const previousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return {
    products,
    loading,
    error,
    reload,
    currentPage,
    totalPages,
    nextPage,
    previousPage
  };
};

export default useProductSearch;
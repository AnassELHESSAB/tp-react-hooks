import React, { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  
  const { 
    products, 
    loading, 
    error,
    reload,
    currentPage,
    totalPages,
    nextPage,
    previousPage
  } = useProductSearch();

  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">
          {language === 'fr' ? 'Chargement...' : 'Loading...'}
        </span>
      </div>
    </div>
  );

  if (error) return (
    <div className={`alert alert-danger ${isDarkTheme ? 'bg-dark text-danger' : ''}`} role="alert">
      {language === 'fr' ? 'Erreur : ' : 'Error: '}{error}
    </div>
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className={`m-0 ${isDarkTheme ? 'text-light' : ''}`}>
          {products.length} {language === 'fr' ? 'résultats' : 'results'}
        </h3>
        <button 
          onClick={reload}
          className={`btn ${isDarkTheme ? 'btn-outline-light' : 'btn-outline-dark'}`}
        >
          {language === 'fr' ? 'Recharger' : 'Reload'}
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-secondary text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{language === 'fr' ? 'Prix: ' : 'Price: '}</strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length > 0 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className={`page-link ${isDarkTheme ? 'bg-dark text-light border-light' : ''}`}
                onClick={previousPage}
              >
                {language === 'fr' ? 'Précédent' : 'Previous'}
              </button>
            </li>
            
            <li className="page-item">
              <span className={`page-link ${isDarkTheme ? 'bg-dark text-light border-light' : ''}`}>
                {language === 'fr' 
                  ? `Page ${currentPage} sur ${totalPages}` 
                  : `Page ${currentPage} of ${totalPages}`}
              </span>
            </li>

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className={`page-link ${isDarkTheme ? 'bg-dark text-light border-light' : ''}`}
                onClick={nextPage}
              >
                {language === 'fr' ? 'Suivant' : 'Next'}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductList;
import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Database, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const ForceProductSync: React.FC = () => {
  const { forceInitialProductsToSupabase } = useProducts();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSync = async () => {
    if (window.confirm('This will replace ALL products in the database with the initial product set. Continue?')) {
      setIsLoading(true);
      setResult(null);
      
      try {
        const success = await forceInitialProductsToSupabase();
        
        if (success) {
          setResult({
            success: true,
            message: 'All products have been successfully pushed to Supabase!'
          });
        } else {
          setResult({
            success: false,
            message: 'Failed to push products to Supabase. Check console for details.'
          });
        }
      } catch (error) {
        console.error('Error during force sync:', error);
        setResult({
          success: false,
          message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="my-4 p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex items-center mb-3">
        <Database className="h-5 w-5 text-yellow-500 mr-2" />
        <h4 className="text-lg font-semibold text-gray-800">Database Management</h4>
      </div>
      
      <p className="text-gray-600 mb-4">
        Use this button to reset the Supabase database with the initial product set.
        This will <strong className="text-red-600">delete all existing products</strong> and replace them with the default products.
      </p>
      
      <button 
        onClick={handleSync} 
        disabled={isLoading}
        className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 mb-4 ${isLoading 
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
          : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Database className="h-4 w-4 mr-2" />
            Reset Database with Initial Products
          </>
        )}
      </button>
      
      {result && (
        <div className={`p-4 rounded-lg ${result.success 
          ? 'bg-green-50 border border-green-200 text-green-700' 
          : 'bg-red-50 border border-red-200 text-red-700'}`}
        >
          <div className="flex items-start">
            {result.success ? (
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            )}
            <p>{result.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForceProductSync;
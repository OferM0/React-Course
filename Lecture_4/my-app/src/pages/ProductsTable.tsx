import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { fetchProducts } from "../api/productsApi";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export function ProductsTablePage() {
  const { t } = useTranslation(["products", "common"]);
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const imageBodyTemplate = (product: Product) => {
    return (
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-12 h-12 object-contain shadow-sm border-round" 
      />
    );
  };

  const priceBodyTemplate = (product: Product) => {
    return `$${product.price.toFixed(2)}`;
  };

  const actionBodyTemplate = (product: Product) => {
    return (
      <button
        onClick={() => navigate(`/products/${product.id}`)}
        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        {t('products:detail.viewDetails', { defaultValue: 'View Details' })}
      </button>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">{t('products:list.title')}</h1>
        <span className="p-input-icon-left">
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={t('products:list.search', { defaultValue: 'Search...' })}
            className="p-inputtext-sm"
          />
        </span>
      </div>
    );
  };

  if (isLoading) return <div className="p-8">{t('products:list.loading')}</div>;
  if (error) return <div className="p-8 text-red-500">{t('products:list.error')}</div>;

  return (
    <div className="card shadow-sm border-round bg-white p-4">
      <DataTable
        value={products}
        header={renderHeader()}
        globalFilter={globalFilter}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        sortMode="multiple"
        removableSort
        emptyMessage={t('products:list.empty')}
        tableStyle={{ minWidth: "50rem" }}
        className="p-datatable-sm"
      >
        <Column header={t('products:list.image', { defaultValue: 'Image' })} body={imageBodyTemplate} />
        <Column field="title" header={t('products:list.title')} sortable />
        <Column field="category" header={t('products:list.category', { defaultValue: 'Category' })} sortable className="capitalize" />
        <Column field="price" header={t('products:list.price', { defaultValue: 'Price' })} body={priceBodyTemplate} sortable />
        <Column header={t('products:list.action', { defaultValue: 'Action' })} body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
}
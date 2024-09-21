import React from 'react';

const DisplayProductData = ({ products }) => {
  if (!products.length) {
    return <div>No products to display</div>;
  }

  return (
    <div className="mt-4 w-full">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300">S/N</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Product Name</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Product Code</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Raw Materials</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Address</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">QR Hash</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{product.product_name}</td>
              <td className="py-2 px-4 border-b">{product.product_code}</td>
              <td className="py-2 px-4 border-b">{product.raw_materials}</td>
              <td className="py-2 px-4 border-b">{product.address}</td>
              <td className="py-2 px-4 border-b">{product.qr_hash}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayProductData;

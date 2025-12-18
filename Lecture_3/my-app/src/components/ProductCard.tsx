interface ProductCardProps {
  name: string;
  price: string;
  imageUrl: string;
}

export function ProductCard({ name, price, imageUrl }: ProductCardProps) {
  return (
    <div className="group text-left w-full transition-transform duration-200 hover:scale-[1.02]">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Image Container with 4:3 Aspect Ratio */}
        <div
          className="relative w-full bg-gray-100"
          style={{ paddingBottom: "75%" }}
        >
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="text-gray-900 mb-2 font-semibold">{name}</h3>
          <p className="text-gray-700">{price}</p>
        </div>
      </div>
    </div>
  );
}

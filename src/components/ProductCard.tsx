import Link from "next/link";
import { Product, formatPrice } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/templates/${product.slug}`} className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.title} loading="lazy" />
        <div className="product-card-overlay" />
        {product.badge && (
          <span className="product-card-badge">{product.badge}</span>
        )}
      </div>
      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-card-category">{product.category}</span>
          <span className="product-card-price">
            {product.originalPrice && (
              <span className="original-price">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {formatPrice(product.price)}
          </span>
        </div>
        <h3>{product.title}</h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-footer">
          <span>Lihat detail</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

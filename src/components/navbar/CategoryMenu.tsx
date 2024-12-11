import { Link } from "react-router-dom";

interface Category {
  name: string;
  path: string;
}

interface CategoryMenuProps {
  categories: Category[];
  isMobile?: boolean;
}

export const CategoryMenu = ({ categories, isMobile = false }: CategoryMenuProps) => {
  if (isMobile) {
    return (
      <div className="pt-2 border-t">
        {categories.map((category) => (
          <Link 
            key={category.name}
            to={category.path}
            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            {category.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-8 py-4 overflow-x-auto">
      {categories.map((category) => (
        <Link 
          key={category.name}
          to={category.path}
          className="text-sm font-medium hover:text-primary whitespace-nowrap transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};
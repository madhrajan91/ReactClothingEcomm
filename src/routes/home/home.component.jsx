
import './../../App.css';

import CategoryItem from './../../components/category-item/category-item.component';
import Categories from './../../components/categories/categories.component';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <Categories />
    </div>
  );
}

export default Home;

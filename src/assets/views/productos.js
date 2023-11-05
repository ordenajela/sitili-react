import PrimarySearchAppBar from "../components/navbar2";
import CarouselCategories from "../components/carousel-categories";
import FilterTags from "../components/filter-tags";
import ResponsiveGridWithPagination from "../components/products";

function Productos() {
    return (
      <div>
        <PrimarySearchAppBar />
        {/* <CarouselCategories /> */}
        <FilterTags />
        <ResponsiveGridWithPagination />
        <h1>Vista Principal Brito ya aqui que se vea los productos o como lo quieras llevar</h1>
      </div>
    );
  }
  
  export default Productos;
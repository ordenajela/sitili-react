import PrimarySearchAppBar from "../../../components/navbar2";
import CarouselCategories from "../../../components/carousel-categories";
import FilterTags from "../../../components/filter-tags";
import ResponsiveGridWithPagination from "../../../components/products";
import StickyFooter from "../../../components/footer";

function UserProductos() {
    return (
      <div>
        <PrimarySearchAppBar />
        {/* <CarouselCategories /> */}
        <FilterTags />
        <ResponsiveGridWithPagination />
        <StickyFooter />
      </div>
    );
  }
  
  export default UserProductos;
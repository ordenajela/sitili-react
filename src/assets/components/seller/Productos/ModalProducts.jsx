import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {styled,Box,TextField,Select,MenuItem,Button,} from '@mui/material';
import { Modal as BaseModal } from '@mui/base/Modal';
import InputLabel from '@mui/material/InputLabel';

export default function ModalProducts() {
  const [open, setOpen] = useState(false);
  const [userType] = useState('');
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productTypeN, setProductTypeN] = useState('');


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const handleFileChange = (event) => {
    const files = event.target.files;
    const newSelectedFiles = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size <= 5 * 1024 * 1024) {
        newSelectedFiles.push(file);
      } else {
        console.log(`El archivo ${file.name} excede el límite de tamaño (5 MB) y no será agregado.`);
      }
    }
  
    setSelectedFiles(newSelectedFiles);
  };

  const handleAddProduct = async () => {

    const priceDoubleValue = parseFloat(price).toFixed(2);
    console.log('Nombre:', name);
    console.log('Stock:', stock);
    console.log('Detalles:', features);
    console.log("ProductTypeN",productTypeN);
    console.log('Imagenes:', selectedFiles);
    console.log('Precio:', priceDoubleValue);
    

    if (name === '' || stock === '' || price === '' || features === '' || productTypeN === '') {
      console.log('Todos los campos son obligatorios');
      return;
    }
    console.log("UserType",userType);
    console.log("ProductTypeN",productTypeN);

    try {
      const formData = new FormData();
      const productData = {
        name: name,
        stock: parseInt(stock),
        price: (priceDoubleValue).toString(), //Revisar
        features: features,
        category_id: parseInt(productTypeN),
      };
      formData.append('productData', new Blob([JSON.stringify(productData)], 
      { type: 'application/json' }));

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }
      
      const response = await fetch('http://localhost:8090/product/save', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      }
      );
    
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        console.log('Producto guardado exitosamente');
      } else {
        console.log('Error al guardar el producto');
      }
    } catch (error) {
      console.error(error);
    }

    handleClose();
  };

  const getCategories = async () => {
    try {
      const response = await fetch('http://localhost:8090/categories/listAll');

      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const categoriesData = await response.json();
      console.log('Categorías:', categoriesData);
      console.log("Numero de Id de categorias", categoriesData[0].id);
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div>
        <TriggerButton type="button" onClick={handleOpen}>
          Agregar Producto
        </TriggerButton>
        
        <Modal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={handleClose}
          slots={{ backdrop: StyledBackdrop }}
        >
          <ModalContent sx={style}>
            <h3 id="unstyled-modal-title" className="modal-title">
              Crear Producto
            </h3>
            <p id="unstyled-modal-description" className="modal-description">
              Complete los datos del producto a crear:
            </p>

            <form>
              <TextField
                label="Nombre"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: '16px' }}
                fullWidth
              />
              <TextField
                label="Cantidad en Stock"
                variant="outlined"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                sx={{ marginBottom: '16px' }}
                fullWidth
              />
              <TextField
                label="Precio"
                variant="outlined"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={{ marginBottom: '16px' }}
                fullWidth
              />
              <TextField
                label="Detalles"
                variant="outlined"
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                sx={{ marginBottom: '16px' }}
                fullWidth
              />
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Categoría"
                variant="outlined"
                value={productTypeN}
                onChange={(e) => setProductTypeN(e.target.value)}
                sx={{ marginBottom: '16px' }}
                fullWidth
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                sx={{ marginBottom: '16px' }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
                fullWidth
              >
                Agregar Producto
              </Button>
            </form>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
};

const ModalContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#FFF"};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.20)"
  };
  padding: 1rem;
  color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;


  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
  }
  `
);

const TriggerButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }
`
);

import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function FilterTags() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8090/categories/listAll');
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                const fetchedCategories = data.map(category => ({
                    id: category.id,
                    title: category.name
                }));
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
    
        fetchCategories();
    }, []);
    

    return (
        <div style={{ display: 'flex' }}>
            <Autocomplete
                multiple
                limitTags={3}
                id="multiple-limit-tags"
                size="small"
                options={categories}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                    <TextField {...params} label="Categorías" placeholder="Elige una categoría" />
                )}
                sx={{ width: '400px' }}
                style={{ margin: '1%' }}
            />
            <Autocomplete
                multiple
                limitTags={3}
                id="multiple-limit-tags-2"
                size="small"
                options={stores}
                getOptionLabel={(option) => option.company}
                renderInput={(params) => (
                    <TextField {...params} label="Tiendas" placeholder="Elige una tienda" />
                )}
                sx={{ width: '400px' }}
                style={{ margin: '1%' }}
            />
            {/* <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
            /> */}
        </div>
    );
}

const stores = [
    { id: 1, company: 'Apple' },
    { id: 2, company: 'AOC' },
    { id: 3, company: 'Standhome' },
    { id: 4, company: 'Vans' },
    { id: 5, company: 'Adidas' },
];
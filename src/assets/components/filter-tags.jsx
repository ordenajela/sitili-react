import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function FilterTags() {
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

const categories = [
    { id: 1, title: 'Tecnología' },
    { id: 2, title: 'Deportes' },
    { id: 3, title: 'Hogar' },
    { id: 4, title: 'Oficina' },
    { id: 5, title: 'Ropa' },
];

const stores = [
    { id: 1, company: 'Apple' },
    { id: 2, company: 'AOC' },
    { id: 3, company: 'Standhome' },
    { id: 4, company: 'Vans' },
    { id: 5, company: 'Adidas' },
];

// function valuetext(value) {
//     return `${value}°C`;
// }

// const minDistance = 10;

// const [value1, setValue1] = React.useState([20, 37]);

// const handleChange1 = (event, newValue, activeThumb) => {
//     if (!Array.isArray(newValue)) {
//         return;
//     }

//     if (activeThumb === 0) {
//         setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
//     } else {
//         setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
//     }
// };
import React from 'react'
import {  Controller } from 'react-hook-form';
import Select from 'react-select';

const CustomSelect = ({ className, name, control, options, placeholder }) => {
  return (
    <Controller
    name={name}
    control={control}
    render={({ field }) => (
        <Select
            {...field}
            className={className}
            options={options}
            isSearchable={true}
            placeholder={placeholder}
        />
    )}
/>
  )
}

export default CustomSelect

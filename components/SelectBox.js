import React from 'react';

import Select, {components} from 'react-select';

const SelectBox = (props) => {

	const options = props.options;
	const [selectedOption, setSelectedOption] = React.useState(props.selectedOption ?? null);

	const handleChange = (value) => {
		setSelectedOption(value)
    props.setSelectedOption(value)
	};

	const DropdownIndicator = (props) => {
		return (
			<components.DropdownIndicator {...props}>
				<ArrowDropDownIcon />
			</components.DropdownIndicator>
		);
	};

	return (
		<Select
			instanceId={props.id}
			isMulti={props.isMulti ? true : false}
			value={selectedOption}
			onChange={handleChange}
			options={options}
      placeholder={props.placeholder??"Select options..."}
			// className={classes.root}
			// components={{ DropdownIndicator }}
			styles={{
				option: (provided, state) => ({
					// ...provided,
					width: 'auto',
					height: 40,
					backgroundColor: state.isSelected ? '#f0f2f5' : state.isFocused ? '#f5f8fa' : null,
					color: '#656565',
					marginLeft: 5,
					marginRight: 5,
					marginTop: 3,
					marginBottom: 3,
					paddingLeft: 10,
					display: 'flex',
					alignItems: 'center',
					border: '1px solid #e5e5e5',
					borderRadius: 4
				}),
				control: () => ({
					// none of react-select's styles are passed to <Control />
					height: props.height??45,
					display: 'flex',
					alignItems: 'center',
					borderRadius: 4,
					backgroundColor: props.backColor === 'primary' ? '#f26522' : props.backColor === 'secondary' ? '#282a2f' : 'transparent',
					border: `1px solid ${props.backColor === 'transparent' ? '#656565' : ''}`,
				}),
				indicatorSeparator: () => ({}),
				dropdownIndicator: (provided) => ({
					...provided,
					color: props.backColor === 'transparent' ? '#656565 !important' : 'white !important'
				}),
				singleValue: (provided, state) => {
					const opacity = state.isDisabled ? 0.5 : 1;
					const transition = 'opacity 300ms';
					const color = props.backColor === 'transparent' ? '#656565' : 'white';
					const fontSize = 16;
					const fontWeight = 400;
					return { ...provided, opacity, transition, color, fontSize, fontWeight };
				}
			}}
		/>
	)	
}

export default SelectBox
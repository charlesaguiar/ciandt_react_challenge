import React, { forwardRef } from 'react';
import { MdErrorOutline } from 'react-icons/md';

const Input = forwardRef(
	({ id, label, startIcon = null, className, error, ...rest }, ref) => {
		return (
			<div className="flex flex-col">
				{label ? (
					<label className="text-sm text-inherit" htmlFor={id}>
						{label}
					</label>
				) : null}
				<div className="input-container flex items-center gap-3 border border-gray-400 border-solid rounded p-4">
					{startIcon}
					<input
						{...rest}
						id={id}
						ref={ref}
						className={`border-none outline-none ${className}`}
					/>
				</div>
				{error ? (
					<div className="flex gap-2 mt-1 items-center text-red-500">
						<MdErrorOutline size={16} />
						<span className="text-sm ">{error}</span>
					</div>
				) : null}
			</div>
		);
	}
);

export default Input;

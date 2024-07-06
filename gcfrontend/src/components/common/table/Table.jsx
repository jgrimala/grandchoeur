/**
 * table.jsx
 * components\common\table\table.jsx
 */

import React from "react";

const Table = ({ data, columns }) => {
	return (
		<table>
			<thead>
				<tr>
					{columns.map((column, index) => (
						<th key={index}>{column}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => (
					<tr key={index}>
						{columns.map((column, index) => (
							<td key={index}>{row[column]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;

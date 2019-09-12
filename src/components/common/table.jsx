import React from "react";
import TableBody from "./tableHeader";
import TableHeader from "./tableHeader";

const TableComponent = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default TableComponent;

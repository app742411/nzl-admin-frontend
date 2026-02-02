import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

export const TableShimmer = ({ rows = 5, columns = 6 }) => {
    return (
        <Table>
            <TableHeader className="bg-gray-100 dark:bg-gray-800 py-3">
                <TableRow>
                    {Array.from({ length: columns }).map((_, i) => (
                        <TableCell key={i} isHeader className="px-5 py-3">
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableCell>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <TableCell key={colIndex} className="px-4 py-4">
                                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export const FormShimmer = () => {
    return (
        <div className="w-full rounded-3xl bg-white dark:bg-gray-900 p-5 animate-pulse space-y-6">
            {/* Title */}
            <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />

            {/* Inputs */}
            <div className="space-y-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
            </div>

            {/* Selects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            {/* Editor */}
            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded" />

            {/* Images */}
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />

            {/* Footer buttons */}
            <div className="flex justify-end gap-3">
                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
        </div>
    );
};

export default { TableShimmer, FormShimmer };

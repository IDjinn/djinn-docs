'use client';

import { ChevronDown } from 'lucide-react';
import { type ComponentProps, type ReactNode, useEffect, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'fumadocs-ui/components/ui/collapsible';
import { cn } from '@/lib/cn';

export interface TableColumn {
    header: string;
    /** Tailwind width class, e.g. "w-1/4" */
    width?: string;
    /** Hide this column on small screens */
    hideOnSmall?: boolean;
}

export interface TableRow {
    /** Cell contents, one per column */
    cells: ReactNode[];
    /** Expandable detail content shown when the row is opened */
    details?: ReactNode;
}

export function Table({
    id,
    columns,
    rows,
    className,
    ...props
}: {
    columns: TableColumn[];
    rows: TableRow[];
} & ComponentProps<'div'>) {
    return (
        <div
            id={id}
            className={cn(
                '@container flex flex-col p-1 bg-fd-card text-fd-card-foreground rounded-2xl border my-6 text-sm overflow-hidden',
                className,
            )}
            {...props}
        >
            <div className="flex font-medium items-center px-3 py-1 not-prose text-fd-muted-foreground">
                {columns.map((col, i) => (
                    <p
                        key={i}
                        className={cn(
                            col.width,
                            col.hideOnSmall && '@max-xl:hidden',
                            !col.width && 'flex-1',
                        )}
                    >
                        {col.header}
                    </p>
                ))}
            </div>
            {rows.map((row, i) => (
                <Row key={i} parentId={id} index={i} columns={columns} row={row} />
            ))}
        </div>
    );
}

function Row({
    parentId,
    index,
    columns,
    row,
}: {
    parentId?: string;
    index: number;
    columns: TableColumn[];
    row: TableRow;
}) {
    const [open, setOpen] = useState(false);
    const id = parentId ? `${parentId}-${index}` : undefined;
    const hasDetails = !!row.details;

    useEffect(() => {
        const hash = window.location.hash;
        if (!id || !hash) return;
        if (`#${id}` === hash) setOpen(true);
    }, [id]);

    if (!hasDetails) {
        return (
            <div
                id={id}
                className="flex flex-row items-center w-full px-3 py-2 not-prose rounded-xl"
            >
                {columns.map((col, i) => (
                    <span
                        key={i}
                        className={cn(
                            col.width,
                            col.hideOnSmall && '@max-xl:hidden',
                            !col.width && 'flex-1',
                            i === 0 && 'text-fd-primary font-medium pe-2',
                        )}
                    >
                        {row.cells[i]}
                    </span>
                ))}
            </div>
        );
    }

    return (
        <Collapsible
            id={id}
            open={open}
            onOpenChange={(v) => {
                if (v && id) {
                    window.history.replaceState(null, '', `#${id}`);
                }
                setOpen(v);
            }}
            className={cn(
                'rounded-xl border overflow-hidden scroll-m-20 transition-all',
                open ? 'shadow-sm bg-fd-background not-last:mb-2' : 'border-transparent',
            )}
        >
            <CollapsibleTrigger className="relative flex flex-row items-center w-full group text-start px-3 py-2 not-prose hover:bg-fd-accent">
                {columns.map((col, i) => (
                    <span
                        key={i}
                        className={cn(
                            col.width,
                            col.hideOnSmall && '@max-xl:hidden',
                            !col.width && 'flex-1',
                            i === 0 && 'text-fd-primary font-medium pe-2',
                        )}
                    >
                        {row.cells[i]}
                    </span>
                ))}
                <ChevronDown className="absolute end-2 size-4 text-fd-muted-foreground transition-transform group-data-[open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="text-sm p-3 overflow-auto fd-scroll-container border-t prose prose-no-margin">
                    {row.details}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}

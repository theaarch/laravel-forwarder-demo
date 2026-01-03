'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';

export interface ForwardedNotification {
    id: number;
    from: string;
    content: string;
    created_at: string;
}

function ActionsCell({ notification }: { notification: ForwardedNotification }) {
    const [showViewDialog, setShowViewDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = () => {
        router.delete(`/forwarded/notifications/${notification.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteDialog(false);
            },
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowViewDialog(true)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Notification Details</DialogTitle>
                        <DialogDescription>
                            From: {notification.from}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                                Message Content
                            </h4>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {notification.content}
                            </p>
                        </div>
                        {notification.created_at && (
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                    Received At
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(
                                        notification.created_at,
                                    ).toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Notification</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this notification
                            from {notification.from}? This action cannot be
                            undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export const columns: ColumnDef<ForwardedNotification>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'from',
        header: 'From',
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue('from')}</div>
        ),
    },
    {
        accessorKey: 'content',
        header: 'Message',
        cell: ({ row }) => (
            <div className="max-w-md truncate" title={row.getValue('content')}>
                {row.getValue('content')}
            </div>
        ),
    },
    {
        accessorKey: 'created_at',
        header: 'Received At',
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.created_at
                        ? new Date(row.original.created_at).toLocaleString()
                        : '-'}
                </div>
            );
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => <ActionsCell notification={row.original} />,
    },
];

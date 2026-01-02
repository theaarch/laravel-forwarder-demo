import { DataTable } from '@/components/data-table';
import { Pagination } from '@/components/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { columns, ForwardedNotification } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forwarded Notifications',
        href: '/forwarded/notifications',
    },
];

interface PaginatedData<T> {
    data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Filters {
    search: string;
}

export default function ForwardedNotifications({
    notifications,
    filters,
}: {
    notifications: PaginatedData<ForwardedNotification>;
    filters: Filters;
}) {
    const [search, setSearch] = useState(filters.search);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search !== filters.search) {
                router.get(
                    '/forwarded/notifications',
                    { search: search || undefined },
                    { preserveState: true, replace: true },
                );
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, filters.search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forwarded Notifications" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable
                    columns={columns}
                    data={notifications.data}
                    filterValue={search}
                    onFilterChange={setSearch}
                    filterPlaceholder="Filter notifications..."
                />
                <Pagination links={notifications.links} />
            </div>
        </AppLayout>
    );
}

<?php

namespace App\Policies;

use App\Models\ForwardedNotification;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ForwardedNotificationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ForwardedNotification $forwardedNotification): bool
    {
        return $user->id === $forwardedNotification->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ForwardedNotification $forwardedNotification): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ForwardedNotification $forwardedNotification): bool
    {
        return $user->id === $forwardedNotification->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, ForwardedNotification $forwardedNotification): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, ForwardedNotification $forwardedNotification): bool
    {
        return false;
    }
}

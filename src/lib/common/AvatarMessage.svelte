<script lang="ts">
    import type { ActionAlert_, Alert_, NotificationAlert_ } from '$lib/types/AlertTypes';
    import { Toast, Avatar, Button } from 'flowbite-svelte';
    import { CloseCircleSolid } from 'flowbite-svelte-icons';

    export let alert: Alert_ | NotificationAlert_ | ActionAlert_;
	export let open:boolean = false;
</script>

{#if alert.alerttype == 'alert'}
    <!-- Info Alert -->
    <Toast position={alert.position} color={alert.type} bind:open={open}>
        <svelte:fragment slot="icon">
            <CloseCircleSolid class="w-5 h-5" />
            {#if alert.type === 'red'}
                <!-- Ensure alert.type is not undefined before rendering -->
                <span class="sr-only">Error icon</span>
            {/if}
        </svelte:fragment>
        {alert.message}
    </Toast>
{:else if alert.alerttype == 'noti'}
    <!-- Notification Alert -->
    <Toast position={alert.position} align={false} bind:open={open}>
        <span class="font-semibold text-gray-900 dark:text-white">New notification</span>
        <div class="flex items-center mt-3">
            <Avatar src={alert.avatar.avatar_img} />
            <div class="ml-3">
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
                    {alert.avatar.avatar_name}
                </h4>
                <div class="text-sm font-normal">commented on your photo</div>
                <span class="text-xs font-medium text-primary-600 dark:text-primary-500">
                    {alert.someInfo}
                </span>
            </div>
        </div>
    </Toast>
{:else}
    <!-- Action Alert -->
    <Toast position={alert.position} align={false} color="none" defaultIconClass="" bind:open={open}>
        <Avatar slot="icon" src={alert.avatar.avatar_img} />
        <div class="ml-3 text-sm font-normal">
            <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                {alert.avatar.avatar_name}
            </span>
            <div class="mb-2 text-sm font-normal">
                {alert.message} <!-- Assuming you want to display the message here -->
            </div>
            <Button size="xs" on:click={alert.action}>Reply</Button>
        </div>
    </Toast>
{/if}

<?php
/*
 * This file is part of reflar/koseki.
 *
 * Copyright (c) ReFlar.
 *
 * http://reflar.io
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

namespace Reflar\Koseki\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Core\User;
use Flarum\Event\ConfigureApiController;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Illuminate\Contracts\Events\Dispatcher;

class AddRelationships
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetModelRelationship::class, [$this, 'getModelRelationship']);
        $events->listen(GetApiRelationship::class, [$this, 'getApiRelationship']);
        $events->listen(ConfigureApiController::class, [$this, 'includeRelationship']);
        $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
    }

    /**
     * @param GetModelRelationship $event
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getModelRelationship(GetModelRelationship $event)
    {
    }

    /**
     * @param GetApiRelationship $event
     *
     * @return \Tobscure\JsonApi\Relationship
     */
    public function getApiRelationship(GetApiRelationship $event)
    {
    }

    /**
     * @param PrepareApiAttributes $event
     */
    public function prepareApiAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(TagSerializer::class)) {
            $lastDiscussion = $event->model->lastDiscussion;
            $user = isset($lastDiscussion->last_user_id) ? User::find($lastDiscussion->last_user_id) : null;

            $event->attributes['hasChild'] = $event->model->where('parent_id', $event->model->id)->count() >= 1 ? true : false;
            $event->attributes['discussionsCount'] = count($event->model->discussions);
            $event->attributes['commentsCount'] = max($event->model->discussions->max('comments_count') - 1, 0);
            $event->attributes['icon'] = $event->model->icon;

            if ($user) {
                $groups = $user->groups()->get()->all();

                $event->attributes['lastUser'] = [
                    'username'  => $user->username,
                    'avatarUrl' => $user->avatarUrl,
                    'color'     => isset($groups[0]) ? $groups[0]['color'] : '',
                ];
            }
        }

        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['kosekiTagsView'] = $this->settings->get('koseki.tags_view');
        }
    }

    /**
     * @param ConfigureApiController $event
     */
    public function includeRelationship(ConfigureApiController $event)
    {
    }
}

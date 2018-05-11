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

use Flarum\Api\Controller;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Flarum\Core\Post;
use Flarum\Core\User;
use Flarum\Event\ConfigureApiController;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;

class AddRelationships
{

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
        if ($event->isRelationship(Tag::class, 'Poll')) {
            return $event->model->hasOne(Question::class, 'discussion_id', 'id', null, 'end_date', 'Poll');
        }
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
            $user = User::find($event->model->lastDiscussion->last_user_id);

            $event->attributes['commentsCount'] = max($event->model->discussions->max('comments_count') - 1, 0);

            if ($user) {
                $groups =  $user->groups()->get()->all();

                $event->attributes['lastUser'] = array(
                    'username' => $user->username,
                    'avatar_path' => $user->avatar_path,
                    'color' => isset($groups[0]) ? $groups[0]['color'] : ''
                );
            }
        }
    }

    /**
     * @param ConfigureApiController $event
     */
    public function includeRelationship(ConfigureApiController $event)
    {

    }
}

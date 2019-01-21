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

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Flarum\User\User;
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
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    /**
     * @param Serializing $event
     */
    public function prepareApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(TagSerializer::class)) {
            $event->attributes['hasChild'] = $event->model->where('parent_id', $event->model->id)->count() >= 1 ? true : false;
            $event->attributes['discussionsCount'] = $event->model->discussions->count();
            $event->attributes['commentsCount'] = $event->model->discussions->sum('comment_count') - $event->attributes['discussionsCount'];
            $event->attributes['icon'] = $event->model->icon;

//            $user = ($id = $event->model->last_posted_user_id) != null ? User::find($id) : null;
//
//            if ($user) {
//                $group = $user->groups->first();
//
//                $event->attributes['lastUser'] = [
//                    'username'  => $user->username,
//                    'avatarUrl' => $user->avatarUrl,
//                    'color'     => $group != null ? $group->color : '',
//                ];
//            }
        }

        if ($event->isSerializer(ForumSerializer::class)) {
            $lastUser = User::orderBy('joined_at', 'DESC')->limit(1)->first();

            $event->attributes['discussionsCount'] = Discussion::count();
            $event->attributes['postsCount'] = Post::count();
            $event->attributes['usersCount'] = User::count();
            $event->attributes['lastUser'] = $lastUser != null ? $lastUser->username : null;
            $event->attributes['kosekiTagsView'] = $this->settings->get('koseki.tags_view');
            $event->attributes['kosekiStatistics'] = $this->settings->get('koseki.statistics_widget');
        }
    }
}

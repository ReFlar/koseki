<?php
/*
 * This file is part of reflar/polls.
 *
 * Copyright (c) ReFlar.
 *
 * http://reflar.io
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

namespace Reflar\Koseki\Listeners;

use Flarum\Tags\Event\TagWillBeSaved;
use Illuminate\Contracts\Events\Dispatcher;

class SaveIconToDatabase
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(TagWillBeSaved::class, [$this, 'whenTagWillBeSaved']);
    }

    public function whenTagWillBeSaved(TagWillBeSaved $event)
    {
        if (isset($event->data['attributes']['icon'])) {
            $event->tag->icon = $event->data['attributes']['icon'];
        }
    }
}

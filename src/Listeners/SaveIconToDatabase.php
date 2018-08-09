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

use Flarum\Core\Access\AssertPermissionTrait;
use Flarum\Tags\Event\TagWillBeSaved;
use Illuminate\Contracts\Events\Dispatcher;

class SaveIconToDatabase
{
    use AssertPermissionTrait;
    /**
     * @var AnswerValidator
     */
    protected $validator;
    /**
     * SavePollToDatabase constructor.
     *
     * @param AnswerValidator $validator
     */

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(TagWillBeSaved::class, [$this, 'whenTagWillBeSaved']);
    }
    /**
     * @param TagWillBeSaved $event
     *
     * @throws \Flarum\Core\Exception\PermissionDeniedException
     */
    public function whenTagWillBeSaved(TagWillBeSaved $event)
    {
        $event->tag->icon = $event->data['attributes']['icon'];
    }
}

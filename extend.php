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

namespace Reflar\Koseki;

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->route('/koseki', 'koseki'),

    function (Dispatcher $events) {
        $events->subscribe(Listeners\AddClientAssets::class);
        $events->subscribe(Listeners\AddRelationships::class);
        $events->subscribe(Listeners\SaveIconToDatabase::class);
    }
];

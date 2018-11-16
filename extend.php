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
        ->css(__DIR__.'/resources/less/categories.less')
        ->css(__DIR__.'/resources/css/bootstrap.css')
        ->route('/koseki', 'koseki'),
    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/resources/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),
    (new Extend\Locales(__DIR__.'/resources/locale')),

    function (Dispatcher $events) {
        $events->subscribe(Listeners\AddRelationships::class);
        $events->subscribe(Listeners\SaveIconToDatabase::class);
    },
];

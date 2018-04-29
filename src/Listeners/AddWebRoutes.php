<?php

namespace Flagrow\Koseki\Listeners;

use Flagrow\Koseki\Http\Controllers\ViewCategoriesController;
use Flarum\Event\ConfigureForumRoutes;
use Illuminate\Contracts\Events\Dispatcher;

class AddWebRoutes
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureForumRoutes::class, [$this, 'routes']);
    }

    /**
     * @param ConfigureForumRoutes $routes
     */
    public function routes(ConfigureForumRoutes $routes)
    {
        $routes->get(
            '/koseki',
            'koseki.categories',
            ViewCategoriesController::class
        );
    }
}

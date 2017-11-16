<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function viewMainPage()
    {

        return view('main.index', [
            'title' => 'IoT Restaurant',
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Day;

class CommentController extends Controller
{

    public function store(Request $request)
    {

        if (empty($request->get('vardas'))) {
            return view('error');
        } else {
            $day = Day::find($request->get('day'));

            if (strtolower($day->name_lt) == strtolower($request->vardas)) {
                return view('ok');
            } else {
                return view('error');
            }
        }

    }

}
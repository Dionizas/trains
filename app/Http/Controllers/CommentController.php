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

        $error = false;
        App::setLocale($request->get('lang'));

        if (empty($request->get('g-recaptcha-response'))) {
            $error = __('reCapcha is not valid.');
        } else {
            $captcha = $request->get('g-recaptcha-response');
        }
        if (empty($request->get('komentaras'))) {
            $error = __('Comment cannot be empty.');
        }
        if (empty($request->get('vardas'))) {
            $error = __('Name cannot be empty.');
        }


        if (!$error) {
            $secretKey = '6LcpbEcjAAAAAHx_D3ZCQTV-fb_bIHyQutLJ29cv';
        
            $url = 'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($secretKey) .  '&response=' . urlencode($captcha);
            $response = file_get_contents($url);
            $responseKeys = json_decode($response, true);
        
            if(!$responseKeys['success']) {
                $error = __('Is it possible that you are not a human?');
            }
        }


        if (!$error) {
            $comment = new Comment([
                'name' => strip_tags($request->get('vardas')),
                'comment' => strip_tags($request->get('komentaras')),
                'day_id' => $request->get('day')
            ]);

            $comment->save();
        }

        $day = Day::find($request->get('day'));

        return view('add-comment', compact('day', 'error'));

    }


    public function destroy($id)
    {
        $comment = Comment::find($id);
        $comment->delete();

        return view('comment-destroy', compact('id'));
    }

}
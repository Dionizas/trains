<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DayController;
use App\Http\Controllers\CommentController;
use App\Models\Comment;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;
use App\Models\Day;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    App::setLocale('lt');
    $days = DayController::list();
    return view('welcome', compact('days'));
});

Route::get('/lt/{day:slug}', function (Day $day) {
    App::setLocale('lt');
    return view('day', compact('day'));
});


Route::post('/comment', [CommentController::class, 'store']);


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DayController::class, 'index'])->name('dashboard');
    Route::get('/comment/{id}/delete', [CommentController::class, 'destroy']);
    Route::resource('/days', DayController::class);
});

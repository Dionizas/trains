<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
    use HasFactory;

    protected $fillable = ['name_lt', 'name_en', 'text_lt', 'text_en', 'show_from', 'image'];




    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}

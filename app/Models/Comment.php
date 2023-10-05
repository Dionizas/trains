<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;



    protected $fillable = [
        'day_id',
        'name',
        'comment',
    ];



    public function day()
    {
        return $this->belongsTo(Day::class);
    }

    public function getInitialsAttribute(){
        $name = explode(' ', $this->name);
        $initials = '';
        foreach ($name as $n) {
            $initials .= mb_substr($n, 0, 1, 'UTF-8');
        }
        return strtoupper($initials);
    }
    

}
